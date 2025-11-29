"use client";

import { Modal, Button, message, Progress } from "antd";
import { CopyOutlined, ClockCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getOrderDetail } from "@/api/order";

interface QRModalProps {
  visible: boolean;
  onClose: () => void;
  qrCodeUrl?: string;
  transferCode?: string;
  orderId: string;
}

const TIMEOUT_SECONDS = 15 * 60; // 15 minutes
const CHECK_INTERVAL = 10 * 1000; // 10 seconds

export default function QRModal({
  visible,
  onClose,
  qrCodeUrl,
  transferCode,
  orderId,
}: QRModalProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(TIMEOUT_SECONDS);
  const [isChecking, setIsChecking] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    message.success(`Đã sao chép ${label}`);
  };

  useEffect(() => {
    if (!visible) {
      setTimeLeft(TIMEOUT_SECONDS);
      setIsConfirmed(false);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
          message.error("Hết hạn thanh toán. Vui lòng thực hiện lại.");
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [visible, onClose]);

  const checkPaymentStatus = async () => {
    try {
      const response = await getOrderDetail(orderId);
      if (response?.data?.result) {
        const order = response.data.result;
        const paymentStatus = order.payment.status;

        if (paymentStatus === "COMPLETED") {
          if (timerRef.current) clearInterval(timerRef.current);
          if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
          setIsChecking(false);
          message.success("Thanh toán thành công!");
          setTimeLeft(0);
          setTimeout(() => {
            onClose();
            router.push(`/pay-success/${orderId}`);
          }, 500);
        } else if (paymentStatus === "FAILED") {
          if (timerRef.current) clearInterval(timerRef.current);
          if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
          setIsChecking(false);
          message.error("Thanh toán thất bại. Vui lòng thử lại.");
          setIsConfirmed(false);
        }
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      setIsChecking(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (isConfirmed) {
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
      setIsConfirmed(false);
      return;
    }

    setIsConfirmed(true);
    setIsChecking(true);

    await checkPaymentStatus();

    checkIntervalRef.current = setInterval(async () => {
      await checkPaymentStatus();
    }, CHECK_INTERVAL);
  };

  const progressPercent = Math.round((timeLeft / TIMEOUT_SECONDS) * 100);
  const minutesLeft = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft % 60;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
    };
  }, []);

  return (
    <Modal
      title="Thanh toán"
      open={visible}
      onCancel={() => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
        setIsConfirmed(false);
        setIsChecking(false);
        onClose();
      }}
      closable={!isConfirmed}
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
              Hết hạn: {minutesLeft}:{secondsLeft.toString().padStart(2, "0")}
            </span>
          </div>
          <Progress
            percent={progressPercent}
            strokeColor={progressPercent > 20 ? "#faad14" : "#ff4d4f"}
            showInfo={false}
            size="small"
          />
        </div>

        {qrCodeUrl && (
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 bg-gray-100 rounded overflow-hidden mb-2">
              <Image
                src={qrCodeUrl}
                alt="QR Code"
                fill
                className="object-contain"
                priority
                onError={() => {
                  message.error("Không thể tải QR code");
                }}
              />
            </div>
            <span className="text-xs text-gray-600 font-medium">Hoặc</span>
          </div>
        )}

        {transferCode && (
          <div className="bg-blue-50 rounded p-3 space-y-2">
            <h4 className="text-xs font-bold text-gray-900 mb-2">
              Chuyển khoản
            </h4>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">TK:</span>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">0973245766 (MB)</span>
                  <Button
                    type="text"
                    size="small"
                    className="p-0 h-auto"
                    icon={<CopyOutlined className="text-xs" />}
                    onClick={() => handleCopy("0973245766", "số tài khoản")}
                  />
                </div>
              </div>
              <div className="flex justify-between items-start text-xs gap-1">
                <span className="text-gray-600">Nội dung:</span>
                <div className="flex items-start gap-1">
                  <span className="font-semibold text-right break-all flex-1">
                    {transferCode}
                  </span>
                  <Button
                    type="text"
                    size="small"
                    className="p-0 h-auto flex-shrink-0"
                    icon={<CopyOutlined className="text-xs" />}
                    onClick={() => handleCopy(transferCode, "nội dung chuyển")}
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-600 bg-white p-1.5 rounded text-center">
              ⚠️ Nhập đúng nội dung để xác nhận tự động
            </p>
          </div>
        )}

        <div className="pt-2 flex gap-2">
          <Button
            block
            onClick={() => {
              if (timerRef.current) clearInterval(timerRef.current);
              if (checkIntervalRef.current)
                clearInterval(checkIntervalRef.current);
              setIsConfirmed(false);
              setIsChecking(false);
              onClose();
            }}
            disabled={isConfirmed}
          >
            Hủy
          </Button>
          <Button
            type="primary"
            block
            onClick={handleConfirmPayment}
            loading={isChecking && isConfirmed}
            danger={isConfirmed}
            disabled={isChecking && !isConfirmed}
          >
            {isConfirmed
              ? `Kiểm tra (${minutesLeft}:${secondsLeft
                  .toString()
                  .padStart(2, "0")})`
              : "Đã thanh toán"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
