"use client";

import { Modal, Button, message, Progress } from "antd";
import { CopyOutlined, ClockCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { getOrderDetail } from "@/api/order";

interface QRModalProps {
  visible: boolean;
  qrCodeUrl?: string;
  transferCode?: string;
  orderId: string;
  expiresAt?: string;
  onPaid: () => void;
  onTerminal: () => void;
  onCancelOrder: () => Promise<void>;
  onSwitchToCod: () => Promise<void>;
}

const TIMEOUT_SECONDS = 15 * 60;
const CHECK_INTERVAL = 10 * 1000;

export default function QRModal({
  visible,
  qrCodeUrl,
  transferCode,
  orderId,
  expiresAt,
  onPaid,
  onTerminal,
  onCancelOrder,
  onSwitchToCod,
}: QRModalProps) {
  const [timeLeft, setTimeLeft] = useState(TIMEOUT_SECONDS);
  const [isChecking, setIsChecking] = useState(false);
  const [action, setAction] = useState<"cancel" | "cod" | null>(null);
  const completedRef = useRef(false);
  const onPaidRef = useRef(onPaid);
  const onTerminalRef = useRef(onTerminal);
  onPaidRef.current = onPaid;
  onTerminalRef.current = onTerminal;

  useEffect(() => {
    if (!visible) return;
    const expiresAtMs = expiresAt ? new Date(expiresAt).getTime() : Date.now() + TIMEOUT_SECONDS * 1000;
    const refresh = () => setTimeLeft(Math.max(0, Math.ceil((expiresAtMs - Date.now()) / 1000)));
    refresh();
    const timer = setInterval(refresh, 1000);
    return () => clearInterval(timer);
  }, [visible, expiresAt]);

  useEffect(() => {
    if (!visible || !orderId) return;
    completedRef.current = false;
    let active = true;
    setIsChecking(true);
    const checkPaymentStatus = async () => {
      if (completedRef.current) return;
      try {
        const response = await getOrderDetail(orderId);
        if (!active || completedRef.current) return;
        const order = response?.data?.result;
        if (!order) return;
        if (order.status === "CANCELED" || order.status === "EXPIRED") {
          completedRef.current = true;
          setIsChecking(false);
          message.warning(order.payment?.status === "COMPLETED"
            ? "Tiền đến sau khi đơn đã hủy. Vui lòng liên hệ cửa hàng để đối soát."
            : "Đơn chuyển khoản đã hủy hoặc hết hạn.");
          onTerminalRef.current();
        } else if (order.payment?.status === "COMPLETED") {
          completedRef.current = true;
          setIsChecking(false);
          message.success("Thanh toán thành công!");
          onPaidRef.current();
        }
      } catch {
        // A temporary network failure should not end payment polling.
      }
    };
    void checkPaymentStatus();
    const interval = setInterval(checkPaymentStatus, CHECK_INTERVAL);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [visible, orderId]);

  const runAction = async (kind: "cancel" | "cod") => {
    setAction(kind);
    try {
      if (kind === "cancel") await onCancelOrder();
      else await onSwitchToCod();
    } catch (error: any) {
      message.error(error?.error || "Không thể cập nhật đơn hàng. Vui lòng thử lại.");
      throw error;
    } finally {
      setAction(null);
    }
  };

  const confirmCancel = () => {
    Modal.confirm({
      title: "Hủy đơn chuyển khoản?",
      content: "Đơn sẽ được hủy và hàng đã giữ sẽ được hoàn lại. Nếu bạn chỉ đóng trình duyệt, đơn sẽ tự hết hạn sau 15 phút.",
      okText: "Hủy đơn",
      okButtonProps: { danger: true },
      cancelText: "Tiếp tục thanh toán",
      onOk: () => runAction("cancel"),
    });
  };

  const confirmCod = () => {
    Modal.confirm({
      title: "Đổi đơn này sang COD?",
      content: "Đơn hiện tại sẽ được giữ nguyên, không tạo thêm đơn mới. Nếu đã chuyển tiền, vui lòng chờ hệ thống xác nhận.",
      okText: "Đổi sang COD",
      cancelText: "Tiếp tục thanh toán",
      onOk: () => runAction("cod"),
    });
  };

  const copy = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value);
    message.success(`Đã sao chép ${label}`);
  };

  const progressPercent = Math.round((timeLeft / TIMEOUT_SECONDS) * 100);
  const minutesLeft = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft % 60;

  return (
    <Modal
      title={`Thanh toán đơn #${orderId}`}
      open={visible}
      onCancel={confirmCancel}
      closable={!action}
      footer={null}
      centered
      width={420}
      maskClosable={false}
    >
      <div className="space-y-3">
        <div className="bg-yellow-50 rounded p-2">
          <div className="flex items-center gap-2 mb-1">
            <ClockCircleOutlined className="text-yellow-600 text-sm" />
            <span className="text-xs font-semibold text-gray-900">
              {timeLeft > 0
                ? `Hết hạn: ${minutesLeft}:${secondsLeft.toString().padStart(2, "0")}`
                : "Đã hết hạn, đang kiểm tra trạng thái đơn"}
            </span>
          </div>
          <Progress percent={progressPercent} strokeColor={progressPercent > 20 ? "#faad14" : "#ff4d4f"} showInfo={false} size="small" />
        </div>

        {qrCodeUrl && timeLeft > 0 && (
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 bg-gray-100 rounded overflow-hidden mb-2">
              <Image src={qrCodeUrl} alt="QR Code" fill className="object-contain" priority
                onError={() => message.error("Không thể tải QR code")} />
            </div>
            <span className="text-xs text-gray-600 font-medium">Hoặc</span>
          </div>
        )}

        {transferCode && timeLeft > 0 && (
          <div className="bg-blue-50 rounded p-3 space-y-2">
            <h4 className="text-xs font-bold text-gray-900">Chuyển khoản</h4>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">TK:</span>
              <span className="font-semibold">0973245766 (MB)</span>
              <Button type="text" size="small" icon={<CopyOutlined />}
                onClick={() => void copy("0973245766", "số tài khoản")} />
            </div>
            <div className="flex justify-between items-center text-xs gap-1">
              <span className="text-gray-600">Nội dung:</span>
              <span className="font-semibold break-all">{transferCode}</span>
              <Button type="text" size="small" icon={<CopyOutlined />}
                onClick={() => void copy(transferCode, "nội dung chuyển")} />
            </div>
            <p className="text-xs text-gray-600 bg-white p-1.5 rounded text-center">
              Nhập đúng nội dung để xác nhận tự động.
            </p>
          </div>
        )}

        {isChecking && (
          <div className="text-center text-blue-600 text-sm flex items-center justify-center gap-2">
            <LoadingOutlined spin /> Đang kiểm tra thanh toán...
          </div>
        )}
        <div className="flex gap-2">
          <Button block danger loading={action === "cancel"} disabled={action === "cod"} onClick={confirmCancel}>
            Hủy đơn
          </Button>
          <Button block loading={action === "cod"} disabled={action === "cancel" || timeLeft === 0}
            onClick={confirmCod}>
            Đổi sang COD
          </Button>
        </div>
      </div>
    </Modal>
  );
}
