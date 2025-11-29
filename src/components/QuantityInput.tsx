"use client";

import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";

export default function QuantityInput({
  onChange,
  value = 1,
  size = "default",
}: {
  onChange?: (value: number) => void;
  value?: number;
  size?: "default" | "small";
}) {
  const handleDecrease = () => {
    if (value > 1) {
      onChange?.(value - 1);
    }
  };

  const handleIncrease = () => {
    onChange?.(value + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;

    // Chỉ chấp nhận số
    if (v === "" || /^\d+$/.test(v)) {
      const numValue = v === "" ? 1 : parseInt(v, 10);
      if (numValue > 0) {
        onChange?.(numValue);
      }
    }
  };

  const handleBlur = () => {
    // Nếu input trống, set về 1
    if (value === 0 || !value) {
      onChange?.(1);
    }
  };

  const isSmall = size === "small";

  const btnBase =
    "flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const btnClass = isSmall
    ? `w-6 h-6 ${btnBase} text-xs`
    : `w-8 h-8 ${btnBase} text-sm`;

  const inputClass = isSmall
    ? "w-10 h-6 text-center border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    : "w-12 h-8 text-center border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

  const iconSize = isSmall ? 12 : 16;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleDecrease}
        disabled={value === 1}
        className={btnClass}
      >
        <MinusOutlined style={{ fontSize: iconSize }} />
      </button>

      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className={inputClass}
      />

      <button onClick={handleIncrease} className={btnClass}>
        <PlusOutlined style={{ fontSize: iconSize }} />
      </button>
    </div>
  );
}
