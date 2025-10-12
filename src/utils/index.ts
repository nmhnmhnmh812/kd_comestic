import slugify from "slugify";

export const convertToUrl = (name: string, id?: number) => {
  const slug = slugify(name, {
    lower: true,
    strict: true,
    locale: "vi",
  });
  return `${slug}${id ? `.${id}` : ""}`;
};

export const convertToVnd = (price: number) => {
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
