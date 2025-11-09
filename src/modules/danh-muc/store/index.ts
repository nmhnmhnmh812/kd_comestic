import { create } from "zustand";

type State = {
  category: {
    id: number;
    title: string;
    subCategoryId: number;
  };
  filter: {
    brandId?: number;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  };
};

type Action = {
  updateTitle: (title: State["category"]) => void;
  updateFilter: (filter: State["filter"]) => void;
};

const useProductList = create<Action & State>((set) => ({
  category: {
    id: 0,
    title: "",
    subCategoryId: 0,
  },
  filter: {},
  updateTitle: (category) => set({ category }),
  updateFilter: (filter) => set({ filter }),
}));
export default useProductList;
