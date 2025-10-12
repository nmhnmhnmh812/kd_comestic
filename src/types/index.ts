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
