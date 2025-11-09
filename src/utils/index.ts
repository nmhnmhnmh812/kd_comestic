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
  price: number,
  discountPercent: number
) => {
  return Math.round(price / (1 - discountPercent / 100));
};
