export interface ICategory {
  title: string;
  children: { name: string; link: string; id?: number }[];
}

export interface ISlug {
  title: string;
  id: number;
}

export interface ISLUGMAP {
  [key: string]: {
    slug: ISlug;
    categories: ICategory;
  };
}

export interface IProduct {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  oldPrice: number;
  description: string;
  category: string;
}

export type ResponseApi = {
  data: any;
  message?: string;
  status?: number;
  error?: string;
};

export type Product = {
  id: number;
  category: {
    id: number;
    name: string;
    createdDate: string;
    updatedDate: string;
    subCategories: {
      id: number;
      name: string;
      categoryId: number;
      categoryName: string;
    }[];
  };
  subCategory: {
    id: number;
    name: string;
    categoryId: number;
    categoryName: string;
  };
  brand: {
    id: number;
    name: string;
    image: {
      id: number;
      url: string;
    } | null;
    link: string;
    description: string;
    createdDate: string;
    updatedDate: string;
  };
  name: string;
  price: number;
  description: string;
  discount: number;
  finalPrice: number;
  isDeleted: boolean;
  stockQuantity: number;
  viewCount: number;
  buyCount: number;
  createdDate: string;
  updatedDate: string;
  blobs: {
    id: number;
    url: string;
  }[];
};

export type Variant = {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  createdDate: string;
  updatedDate: string;
  stockQuantity: number;
  buyCount: number;
  blobs: {
    id: number;
    url: string;
  }[];
};

export type CartItem = {
  id: string;
  product: Product;
  variant: Variant | null;
  quantity: number;
};

export type BuyNowItem = {
  product: Product;
  variant: Variant | null;
  quantity: number;
};

export type Category = {
  id: number;
  name: string;
  link: string;
  subCategories?: {
    id: number;
    name: string;
    link: string;
    items?: { name: string; link: string }[];
  }[];
};

export type Brand = {
  id: number;
  name: string;
  image: {
    id: number;
    url: string;
  } | null;
  link: string;
  description: string;
  createdDate: string;
  updatedDate: string;
};

export type Blog = {
  id: number;
  title: string;
  shortDescription: string;
  thumbnail: string;
  categoryId: number;
  categoryName: string;
  slug: string;
  displayOrder: number;
  createdDate: string;
};

export type BlogDetail = {
  id: number;
  title: string;
  content: string;
  shortDescription: string;
  thumbnail: string;
  categoryId: number;
  categoryName: string;
  slug: string;
  displayOrder: number;
  createdDate: string;
  updatedDate: string;
};

export type BlogPageResponse = {
  totalPages: number;
  totalElements: number;
  pageable: {
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    offset: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  content: Blog[];
  number: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export interface Banner {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
  description: string;
  status: boolean;
  startDate: string;
  endDate: string;
  createdDate: string;
  updatedDate: string;
  displayOrder: number;
}

export interface OrderItem {
  productId: number;
  productName: string;
  variantId?: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userName: string;
  phoneNumber: string;
  address: string;
  paymentMethod: "COD" | "TRANSFER";
  status: string;
  totalProductAmount: number;
  shipAmount: number;
  totalAmountFinal: number;
  orderItems: OrderItem[];
  notes?: string;
  createdDate: string;
  updatedDate: string;
}

// Types for user orders search response
export interface UserOrderPayment {
  id: number;
  transferCode: string;
  transactionId: number;
  paymentMethod: "BANK_TRANSFER" | "COD";
  totalAmount: number;
  paymentStatus: "NOT_YET" | "PAID" | "FAILED";
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface UserOrderItemVariant {
  id: number;
  name: string;
  description: string;
  price: number;
  costPrice: number;
  discount: number;
  finalPrice: number;
  createdDate: string;
  updatedDate: string;
  stockQuantity: number;
  buyCount: number;
  blobs: { id: number; url: string }[];
  flashSale?: {
    flashSaleId: number;
    flashSaleProductId: number;
    salePrice: number;
    originalPrice: number;
    startTime: string;
    endTime: string;
    quantity: number;
    soldQuantity: number;
    remainingQuantity: number;
  };
}

export interface UserOrderItemProduct {
  id: number;
  category: {
    id: number;
    name: string;
    displayOrder: number;
    createdDate: string;
    updatedDate: string;
    subCategories: {
      id: number;
      name: string;
      displayOrder: number;
      categoryId: number;
      categoryName: string;
      createdDate: string;
      updatedDate: string;
    }[];
  };
  subCategory: {
    id: number;
    name: string;
    displayOrder: number;
    categoryId: number;
    categoryName: string;
    createdDate: string;
    updatedDate: string;
  };
  brand: {
    id: number;
    name: string;
    image: { id: number; url: string } | null;
    link: string;
    description: string;
    createdDate: string;
    updatedDate: string;
  };
  name: string;
  price: number;
  costPrice: number;
  description: string;
  discount: number;
  finalPrice: number;
  isDeleted: boolean;
  stockQuantity: number;
  viewCount: number;
  buyCount: number;
  createdDate: string;
  updatedDate: string;
  blobs: { id: number; url: string }[];
  flashSale?: {
    flashSaleId: number;
    flashSaleProductId: number;
    salePrice: number;
    originalPrice: number;
    startTime: string;
    endTime: string;
    quantity: number;
    soldQuantity: number;
    remainingQuantity: number;
  };
}

export interface UserOrderItem {
  id: number;
  variant: UserOrderItemVariant | null;
  product: UserOrderItemProduct;
  quantity: number;
  price: number;
  costPrice: number;
  discount: number;
  finalPrice: number;
}

export interface UserOrder {
  id: number;
  payment: UserOrderPayment;
  status: "WAITING_CONFIRMATION" | "CONFIRMED" | "SHIPPING" | "DELIVERED" | "CANCELLED";
  totalProductAmount: number;
  shipAmount: number;
  totalAmountFinal: number;
  totalCostPrice: number;
  userName: string;
  address: string;
  phoneNumber: string;
  note: string;
  createdAt: string;
  updatedAt: string;
  orderItems: UserOrderItem[];
  qrCodeUrl: string;
}

export interface StoreLocation {
  id: number;
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapUrl: string;
  active: boolean;
}
