"use client";

import { convertToVnd } from "@/utils";

interface PurchaseSuggestionProps {
  suggestedAmount: number;
}

export default function PurchaseSuggestion({
  suggestedAmount,
}: PurchaseSuggestionProps) {
  return (
    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
      <p className="text-sm text-blue-700">
        💡 Mua thêm <strong>{convertToVnd(suggestedAmount)}</strong> để sử dụng
        mã giảm giá!
      </p>
    </div>
  );
}
