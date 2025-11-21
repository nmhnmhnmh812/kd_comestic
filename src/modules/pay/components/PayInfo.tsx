"use client";

import { debounce } from "@/utils/lodash";
import { Divider, Form, Input } from "antd";

export default function PayInfo({
  getShipFee,
}: {
  getShipFee: (address: string) => void;
}) {
  debounce(getShipFee, 500);
  return (
    <div className="bg-white rounded">
      <div className="px-4 py-3">
        <h3 className="font-bold text-base">Thông tin nhận hàng</h3>
      </div>
      <Divider className="m-0" />
      <div className="px-4 py-3">
        <Form.Item
          label="Họ và tên"
          name="userName"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>
        <Form.Item
          label="Số điện thoại nhận hàng"
          name="phoneNumber"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
        <Form.Item
          label="Địa chỉ nhận hàng"
          name="address"
          rules={[
            { required: true, message: "Vui lòng nhập địa chỉ nhận hàng" },
          ]}
        >
          <Input
            placeholder="Nhập địa chỉ nhận hàng"
            onChange={(e) => getShipFee(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Ghi chú" name="note">
          <Input.TextArea placeholder="Nhập ghi chú nếu có" rows={4} />
        </Form.Item>
      </div>
    </div>
  );
}
