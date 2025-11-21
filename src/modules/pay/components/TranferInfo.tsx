"use client";

import { Divider, Form, Radio } from "antd";

export default function TransferInfo() {
  return (
    <div className="bg-white rounded">
      <div className="px-3 md:px-4 py-3">
        <h3 className="font-bold text-sm md:text-base">Thông tin nhận hàng</h3>
      </div>
      <Divider className="m-0" />
      <Form.Item className="px-3 md:px-4 py-3" label="Phương thức chuyển khoản">
        <Radio.Group className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
          <Radio value="cod">Thanh toán khi nhận hàng (COD)</Radio>
          <Radio value="bank">
            <p>
              Chuyển khoản ngân hàng <b>TECHCOMBANK</b>:
              <p>
                + Tên tài khoản: <b>XXXXXXXXXXXXXXXXXXX</b>
              </p>
              <p>
                + Số tài khoản: <b>999999999999</b>
              </p>
              <p>
                + Nội dung chuyển khoản:
                <b>“Đã chuyển khoản, ngày và giờ chuyển khoản”</b>.
              </p>
            </p>
          </Radio>
        </Radio.Group>
      </Form.Item>
    </div>
  );
}
