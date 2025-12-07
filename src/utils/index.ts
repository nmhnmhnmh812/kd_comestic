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
  if (originalPrice <= 0 || discountAmount <= 0) return 0;
  return Math.round((discountAmount / originalPrice) * 100);
};

import DOMPurify from "dompurify";

export const sanitizedDescription = (content: string) => {
  if (typeof window === "undefined") {
    // Server-side: return raw HTML (will be sanitized on client)
    return "";
  }
  // Client-side: sanitize HTML
  return DOMPurify.sanitize(content || "", {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "a",
      "img",
      "div",
      "span",
      "table",
      "tr",
      "td",
      "th",
      "thead",
      "tbody",
      "blockquote",
      "code",
      "pre",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "style", "target"],
    ALLOW_DATA_ATTR: false,
    ADD_TAGS: ["iframe"], 
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"], 
    ALLOWED_URI_REGEXP:
      /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  });
};
