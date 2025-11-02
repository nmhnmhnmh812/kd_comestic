import { Form } from "antd";
import PayInfo from "./components/PayInfo";
import TransferInfo from "./components/TranferInfo";
import CartInfo from "./components/CartInfo";

export default function PayScreen() {
  return (
    <div className="flex gap-4 py-4">
      <Form layout="vertical" className="flex flex-1 flex-col gap-4">
        <PayInfo />
        <TransferInfo />
      </Form>
      <CartInfo />
    </div>
  );
}
