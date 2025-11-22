"use client";

import { Form, message } from "antd";
import PayInfo from "./components/PayInfo";
import TransferInfo from "./components/TranferInfo";
import CartInfo from "./components/CartInfo";
import { checkOrderInfo } from "@/api/order";
import useCart from "@/hooks/useCart";
import usePayment from "./store";

export default function PayScreen() {
  const [form] = Form.useForm();
  const { cartItems } = useCart();
  const updateAmount = usePayment((state) => state.updateAmount);
  const getShipFee = async (address: string) => {
    const orderItems =
      cartItems?.map((item) => ({
        productId: item?.product?.id || undefined,
        variantId: item?.variant?.id || undefined,
        quantity: item?.quantity,
      })) || [];
    try {
      const response = await checkOrderInfo({
        orderItems,
        address,
      });
      const { shipAmount, totalAmountFinal, totalProductAmount } =
        response.data.result;
      updateAmount({ shipAmount, totalAmountFinal, totalProductAmount });
    } catch (error) {
      message.error(error.error);
    }
  };
  return (
    <div className="flex gap-4 py-4">
      <Form
        form={form}
        layout="vertical"
        className="flex flex-1 flex-col gap-4"
      >
        <PayInfo getShipFee={getShipFee} />
        <TransferInfo />
      </Form>
      <CartInfo form={form} getShipFee={getShipFee} />
    </div>
  );
}
