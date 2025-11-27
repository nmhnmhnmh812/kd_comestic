"use client";

import { Divider, Form, Radio } from "antd";

export default function TransferInfo() {
  return (
    <div className="bg-white rounded">
      <div className="px-3 md:px-4 py-3">
        <h3 className="font-bold text-sm md:text-base">Phương thức thanh toán</h3>
      </div>
      <Divider className="m-0" />
      <Form.Item
        className="px-3 md:px-4 py-3 mb-0"
        label="Phương thức chuyển khoản"
        initialValue="COD"
        name="paymentMethod"
      >
        <Radio.Group className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <Radio value="COD">Thanh toán khi nhận hàng (COD)</Radio>
          <Radio value="BANK_TRANSFER">Chuyển khoản ngân hàng</Radio>
        </Radio.Group>
      </Form.Item>
    </div>
  );
}
