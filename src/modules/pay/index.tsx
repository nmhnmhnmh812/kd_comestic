import { Form } from "antd";
import PayInfo from "./components/PayInfo";
import TransferInfo from "./components/TranferInfo";
import CartInfo from "./components/CartInfo";

export default function PayScreen() {
  return (
    <div className="flex flex-col lg:flex-row gap-3 md:gap-4 py-3 md:py-4">
      <Form layout="vertical" className="flex flex-1 flex-col gap-3 md:gap-4">
        <PayInfo />
        <TransferInfo />
      </Form>
      <CartInfo />
    </div>
  );
}
