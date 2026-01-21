"use client";

import { Coupon } from "@/types";
import { convertToVnd } from "@/utils";
import { Button, Input, Modal, message } from "antd";
import dayjs from "dayjs";
import { useState, useMemo, useEffect } from "react";

interface CouponModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (coupon: Coupon) => void;
  currentTotal: number;
  activeCoupons: Coupon[];
  appliedCoupon: Coupon | null;
}

export default function CouponModal({
  visible,
  onClose,
  onApply,
  currentTotal,
  activeCoupons,
  appliedCoupon,
}: CouponModalProps) {
  const [manualCode, setManualCode] = useState("");
  const [selectedCouponId, setSelectedCouponId] = useState<number | null>(
    appliedCoupon?.id || null,
  );

  useEffect(() => {
    if (visible) {
      setSelectedCouponId(appliedCoupon?.id || null);
    }
  }, [visible, appliedCoupon]);

  // Group coupons into eligible and ineligible
  const { eligibleCoupons, ineligibleCoupons } = useMemo(() => {
    const eligible: Coupon[] = [];
    const ineligible: Coupon[] = [];

    activeCoupons.forEach((coupon) => {
      if (currentTotal >= coupon.minOrderAmount) {
        eligible.push(coupon);
      } else {
        ineligible.push(coupon);
      }
    });

    return { eligibleCoupons: eligible, ineligibleCoupons: ineligible };
  }, [activeCoupons, currentTotal]);

  const handleManualApply = () => {
    const found = activeCoupons.find(
      (c) => c.code.toUpperCase() === manualCode.toUpperCase(),
    );

    if (found) {
      if (currentTotal >= found.minOrderAmount) {
        setSelectedCouponId(found.id);
        message.success("Đã chọn mã giảm giá");
      } else {
        message.warning("Đơn hàng chưa đủ điều kiện áp dụng mã này");
      }
    } else {
      message.warning("Mã giảm giá không tồn tại hoặc chưa đến đợt");
    }
  };

  const handleOk = () => {
    const coupon = activeCoupons.find((c) => c.id === selectedCouponId);
    if (coupon) {
      onApply(coupon);
    }
    onClose();
  };

  const CouponItem = ({
    coupon,
    disabled = false,
  }: {
    coupon: Coupon;
    disabled?: boolean;
  }) => {
    const isSelected = selectedCouponId === coupon.id;

    return (
      <div
        className={`flex border rounded-lg overflow-hidden mb-3 transition-all duration-200 ${
          disabled
            ? "opacity-50 bg-gray-50 grayscale"
            : "bg-white border-gray-200 hover:border-red-300 hover:shadow-sm cursor-pointer"
        } ${isSelected ? "border-red-500 ring-1 ring-red-500 bg-red-50/30" : ""}`}
        onClick={() => !disabled && setSelectedCouponId(coupon.id)}
      >
        {/* Left Side: Brand/Icon */}
        <div className="w-28 bg-gradient-to-br from-red-600 to-red-700 flex flex-col items-center justify-center p-2 text-white border-r border-dashed border-red-400 relative overflow-hidden">
          <div className="absolute -right-[6px] top-0 bottom-0 flex flex-col justify-between py-1 z-10">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-white rounded-full -mr-[6px]"
              ></div>
            ))}
          </div>
          {/* Decorative circle */}
          <div className="absolute -left-4 -top-4 w-12 h-12 bg-white/20 rounded-full"></div>

          <span className="font-bold text-center text-xs uppercase mb-1 z-10 tracking-wider text-white drop-shadow-sm">
            KD Cosmetic
          </span>
          <div className="text-[10px] bg-white text-red-600 font-bold px-1.5 py-0.5 rounded-sm z-10 uppercase tracking-tight shadow-sm">
            Voucher
          </div>
        </div>

        {/* Right Side: Info */}
        <div className="flex-1 p-3 flex justify-between items-center relative">
          {/* Watermark/Decoration */}
          <div className="absolute right-0 bottom-0 text-[40px] text-red-50 font-bold opacity-50 select-none pointer-events-none -mb-3 -mr-2">
            %
          </div>
          <div className="flex-1 z-10">
            <div className="font-bold text-base mb-1 text-gray-800">
              Giảm{" "}
              <span className="text-red-600">
                {convertToVnd(coupon.discountAmount)}
              </span>
            </div>
            <div className="text-xs text-gray-600 mb-1">
              Đơn Tối Thiểu {convertToVnd(coupon.minOrderAmount)}
            </div>
            <div className="text-[11px] text-gray-400 font-medium">
              HSD: {dayjs(coupon.endDate).format("DD.MM.YYYY")}
            </div>
            {disabled && (
              <div className="mt-2 text-xs text-red-500 flex items-center font-medium">
                <span className="mr-1">⚠️</span> Chưa đạt điều kiện
              </div>
            )}
          </div>

          <div className="ml-3 z-10">
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                isSelected
                  ? "border-red-500 bg-red-500"
                  : "border-gray-300 bg-white"
              }`}
            >
              {isSelected && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Modal
      title={
        <div className="text-lg font-bold border-b pb-3 text-gray-800 tracking-tight flex items-center gap-2">
          <span className="text-red-600">🎫</span> CHỌN KD VOUCHER
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
      className="coupon-modal"
      styles={{
        body: {
          maxHeight: "70vh",
          overflowY: "auto",
          padding: "20px",
        },
      }}
    >
      {/* Input Section */}
      <div className="bg-red-50/50 p-4 rounded-lg mb-5 flex gap-3 border border-red-100">
        <label className="flex items-center text-gray-700 font-medium whitespace-nowrap">
          Mã Voucher
        </label>
        <Input
          placeholder="Nhập mã voucher"
          value={manualCode}
          onChange={(e) => setManualCode(e.target.value)}
          className="flex-1 hover:border-red-400 focus:border-red-600 active:border-red-600 placeholder:text-gray-400"
        />
        <Button
          disabled={!manualCode}
          onClick={handleManualApply}
          className={`${
            manualCode
              ? "text-white bg-red-600 border-red-600 hover:!bg-red-700 hover:!border-red-700"
              : "text-gray-400 bg-gray-100 border-gray-200"
          } font-medium px-6 shadow-sm`}
        >
          ÁP DỤNG
        </Button>
      </div>

      <div className="mb-6">
        <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider flex items-center gap-2">
          <span>📦</span> Mã miễn phí vận chuyển
        </h4>
        <div className="text-center text-gray-500 text-sm py-6 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          Hiện chưa có mã miễn phí vận chuyển
        </div>
      </div>

      <div className="mb-24">
        <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider flex items-center gap-2">
          <span>💰</span> Mã giảm giá / Hoàn xu
        </h4>

        {eligibleCoupons.length === 0 && ineligibleCoupons.length === 0 ? (
          <div className="text-center py-10 text-gray-500 flex flex-col items-center">
            <span className="text-4xl mb-3 opacity-50">🎫</span>
            <span className="text-gray-400">
              Không có mã giảm giá nào khả dụng
            </span>
          </div>
        ) : (
          <>
            {eligibleCoupons.map((coupon) => (
              <CouponItem key={coupon.id} coupon={coupon} />
            ))}

            {ineligibleCoupons.length > 0 && (
              <>
                <div className="my-6 text-center">
                  <span className="text-xs text-gray-400 bg-white px-3 relative z-10">
                    Vouchers chưa đủ điều kiện
                  </span>
                  <div className="h-px bg-gray-200 -mt-2 opacity-50"></div>
                </div>
                {ineligibleCoupons.map((coupon) => (
                  <CouponItem key={coupon.id} coupon={coupon} disabled />
                ))}
              </>
            )}
          </>
        )}
      </div>

      {/* Footer Fixed */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t flex justify-end gap-3 z-20 rounded-b-lg shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <Button
          size="large"
          onClick={onClose}
          className="hover:border-red-400 hover:text-red-700 font-medium"
        >
          TRỞ LẠI
        </Button>
        <Button
          type="primary"
          size="large"
          className="bg-red-600 hover:!bg-red-700 border-red-600 shadow-red-200 shadow-lg px-8 font-bold uppercase tracking-wide"
          onClick={handleOk}
        >
          ĐỒNG Ý
        </Button>
      </div>
    </Modal>
  );
}
