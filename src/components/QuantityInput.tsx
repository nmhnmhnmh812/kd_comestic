"use client";

import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";

export default function QuantityInput() {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Chỉ chấp nhận số
    if (value === "" || /^\d+$/.test(value)) {
      const numValue = value === "" ? 1 : parseInt(value, 10);
      if (numValue > 0) {
        setQuantity(numValue);
      }
    }
  };

  const handleBlur = () => {
    // Nếu input trống, set về 1
    if (quantity === 0 || !quantity) {
      setQuantity(1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleDecrease}
        disabled={quantity === 1}
        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <MinusOutlined size={16} />
      </button>

      <input
        type="text"
        value={quantity}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className="w-12 h-8 text-center border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />

      <button
        onClick={handleIncrease}
        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
      >
        <PlusOutlined size={16} />
      </button>
    </div>
  );
}
