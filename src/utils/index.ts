import slugify from "slugify";

export const convertToUrl = (name: string, id?: number | string) => {
  if (!name) return "";

  const slug = slugify(name, {
    lower: true,
    strict: true,
    locale: "vi",
  });
  return `${slug}${id ? `.${id}` : ""}`;
};

export const convertToVnd = (price: number) => {
  if (!price) return "0 ₫";
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

export const convertToOriginalPrice = (
  finalPrice: number,
  discountAmount: number
) => {
  return finalPrice + discountAmount;
};

/**
 * Calculate discount percentage from original price and discount amount
 * @param originalPrice - The original price before discount
 * @param discountAmount - The discount amount
 * @returns The discount percentage (0-100)
 */
export const calculateDiscountPercent = (
  originalPrice: number,
  discountAmount: number
) => {
  if (!originalPrice || !discountAmount) return 0;
  return Math.round((discountAmount / originalPrice) * 100);
};
