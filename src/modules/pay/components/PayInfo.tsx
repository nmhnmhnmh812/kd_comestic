"use client";

import { useEffect, useState, useCallback } from "react";
import { Divider, Form, Input, Select, Spin } from "antd";
import {
  getProvinces,
  getDistricts,
  getWards,
  Province,
  District,
  Ward,
} from "@/api/address";

export default function PayInfo({
  getShipFee,
}: {
  getShipFee: (address: string) => void;
}) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<{
    code: number;
    name: string;
  } | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<{
    code: number;
    name: string;
  } | null>(null);
  const [selectedWard, setSelectedWard] = useState<{
    code: number;
    name: string;
  } | null>(null);
  const [detailAddress, setDetailAddress] = useState<string>("");

  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  // Load provinces on mount
  useEffect(() => {
    const fetchProvinces = async () => {
      setLoadingProvinces(true);
      try {
        const data = await getProvinces();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setLoadingProvinces(false);
      }
    };
    fetchProvinces();
  }, []);

  // Load districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        setLoadingDistricts(true);
        try {
          const data = await getDistricts(selectedProvince.code);
          setDistricts(data);
        } catch (error) {
          console.error("Error fetching districts:", error);
        } finally {
          setLoadingDistricts(false);
        }
      };
      fetchDistricts();
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  // Load wards when district changes
  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        setLoadingWards(true);
        try {
          const data = await getWards(selectedDistrict.code);
          setWards(data);
        } catch (error) {
          console.error("Error fetching wards:", error);
        } finally {
          setLoadingWards(false);
        }
      };
      fetchWards();
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  // Build full address and trigger ship fee calculation
  const buildFullAddress = useCallback(() => {
    const parts: string[] = [];
    if (detailAddress.trim()) {
      parts.push(detailAddress.trim());
    }
    if (selectedWard) {
      parts.push(selectedWard.name);
    }
    if (selectedDistrict) {
      parts.push(selectedDistrict.name);
    }
    if (selectedProvince) {
      parts.push(selectedProvince.name);
    }
    return parts.join(", ");
  }, [detailAddress, selectedWard, selectedDistrict, selectedProvince]);

  useEffect(() => {
    const fullAddress = buildFullAddress();
    if (fullAddress) {
      getShipFee(fullAddress);
    }
  }, [buildFullAddress, getShipFee]);

  const handleProvinceChange = (value: number) => {
    const province = provinces.find((p) => p.code === value);
    setSelectedProvince(province ? { code: province.code, name: province.name } : null);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setDistricts([]);
    setWards([]);
  };

  const handleDistrictChange = (value: number) => {
    const district = districts.find((d) => d.code === value);
    setSelectedDistrict(district ? { code: district.code, name: district.name } : null);
    setSelectedWard(null);
    setWards([]);
  };

  const handleWardChange = (value: number) => {
    const ward = wards.find((w) => w.code === value);
    setSelectedWard(ward ? { code: ward.code, name: ward.name } : null);
  };

  return (
    <div className="bg-white rounded">
      <div className="px-3 md:px-4 py-3">
        <h3 className="font-bold text-sm md:text-base">Thông tin nhận hàng</h3>
      </div>
      <Divider className="m-0" />
      <div className="px-3 md:px-4 py-3">
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

        {/* Province Select */}
        <Form.Item
          label="Tỉnh/Thành phố"
          name="province"
          rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
        >
          <Select
            placeholder="Chọn tỉnh/thành phố"
            loading={loadingProvinces}
            showSearch
            optionFilterProp="label"
            onChange={handleProvinceChange}
            notFoundContent={loadingProvinces ? <Spin size="small" /> : null}
            options={provinces.map((p) => ({
              value: p.code,
              label: p.name,
            }))}
          />
        </Form.Item>

        {/* District Select */}
        <Form.Item
          label="Quận/Huyện"
          name="district"
          rules={[{ required: true, message: "Vui lòng chọn quận/huyện" }]}
        >
          <Select
            placeholder="Chọn quận/huyện"
            loading={loadingDistricts}
            showSearch
            optionFilterProp="label"
            disabled={!selectedProvince}
            onChange={handleDistrictChange}
            notFoundContent={loadingDistricts ? <Spin size="small" /> : null}
            options={districts.map((d) => ({
              value: d.code,
              label: d.name,
            }))}
          />
        </Form.Item>

        {/* Ward Select */}
        <Form.Item
          label="Phường/Xã"
          name="ward"
          rules={[{ required: true, message: "Vui lòng chọn phường/xã" }]}
        >
          <Select
            placeholder="Chọn phường/xã"
            loading={loadingWards}
            showSearch
            optionFilterProp="label"
            disabled={!selectedDistrict}
            onChange={handleWardChange}
            notFoundContent={loadingWards ? <Spin size="small" /> : null}
            options={wards.map((w) => ({
              value: w.code,
              label: w.name,
            }))}
          />
        </Form.Item>

        {/* Detail Address Input */}
        <Form.Item
          label="Địa chỉ chi tiết"
          name="detailAddress"
          rules={[
            { required: true, message: "Vui lòng nhập địa chỉ chi tiết" },
          ]}
        >
          <Input
            placeholder="Số nhà, tên đường..."
            onChange={(e) => setDetailAddress(e.target.value)}
          />
        </Form.Item>

        {/* Hidden field for full address - will be populated on form submit */}
        <Form.Item name="address" hidden>
          <Input />
        </Form.Item>

        <Form.Item label="Ghi chú" name="note">
          <Input.TextArea placeholder="Nhập ghi chú nếu có" rows={4} />
        </Form.Item>
      </div>
    </div>
  );
}
