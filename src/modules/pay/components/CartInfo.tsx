"use client";

import useCart from "@/hooks/useCart";
import { Button, Divider, FormInstance, message } from "antd";
import PayItems from "./PayItems";
import { convertToVnd } from "@/utils";
import { useState } from "react";
import usePayment from "../store";
import { createOrder } from "@/api/order";
import QRmodal from "./QRmodal";

const ERROR_STATUS = [
  "PRICE_CHANGED",
  "SHIPPING_FEE_CHANGED",
  "TOTAL_AMOUNT_NOT_MATCH",
];

export default function CartInfo({
  form,
  getShipFee,
}: {
  form: FormInstance;
  getShipFee: (address: string) => void;
}) {
  const { cartItems, isFetching, totalAmount } = useCart();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    visible: false,
    qrUrl: "",
    transferCode: "",
    orderId: "",
  });
  const amount = usePayment((state) => state.amount);

  const handlePay = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const params = {
        ...values,
        orderItems: cartItems?.map((item) => ({
          productId: item?.product?.id || undefined,
          variantId: item?.variant?.id || undefined,
          quantity: item?.quantity,
        })),
        ...amount,
      };
      const response = await createOrder(params);
      const result = response?.data?.result;
      if (values.paymentMethod === "COD") {
        window.location.href = `/pay-success/${response?.data?.result?.id}`;
        return;
      }
      if (ERROR_STATUS.includes(result.status)) {
        message.error(
          "Có thay đổi về giá sản phẩm hoặc phí vận chuyển. Vui lòng kiểm tra lại giỏ hàng."
        );
        getShipFee(values.address);
        setLoading(false);
        return;
      }
      const qrUrl = result?.qrCodeUrl;
      const transferCode = result?.payment?.transferCode;
      setModal({
        visible: true,
        qrUrl,
        transferCode,
        orderId: result?.id,
      });
    } catch (error) {
      message.error("Có lỗi xảy ra khi kiểm tra thông tin đơn hàng.");
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded w-96">
      <div className="px-4 py-3">
        <h3 className="font-bold">Danh sách sản phẩm</h3>
      </div>
      <Divider className="m-0" />
      <PayItems cartItems={cartItems} loading={isFetching} />
      <Divider className="m-0" />
      <div className="px-4 py-3 flex flex-col gap-2">
        <div>
          <span>Tạm tính:</span>
          <span className="float-right font-bold">
            {convertToVnd(totalAmount)}
          </span>
        </div>
        <div>
          <span>Phí vận chuyển:</span>
          <span className="float-right font-bold">
            {convertToVnd(amount.shipAmount)}
          </span>
        </div>
        <div>
          <span>Tổng cộng:</span>
          <span className="float-right font-bold text-red-600">
            {convertToVnd(totalAmount + amount.shipAmount)}
          </span>
        </div>
        <Button
          type="primary"
          size="large"
          className="bg-red-600"
          loading={loading}
          onClick={handlePay}
        >
          Thanh toán
        </Button>
      </div>
      <QRmodal
        onClose={() =>
          setModal({
            visible: false,
            qrUrl: "",
            transferCode: "",
            orderId: "",
          })
        }
        visible={modal.visible}
        qrCodeUrl={modal.qrUrl}
        transferCode={modal.transferCode}
        orderId={modal.orderId}
      />
    </div>
  );
}
