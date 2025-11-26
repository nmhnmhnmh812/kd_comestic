import { Variant } from "@/types";
import { create } from "zustand";

type State = {
  currentVariant: Variant | null;
};

type Action = {
  updateVariant: (variant: State["currentVariant"]) => void;
  resetVariant: () => void;
};

const useProductDetail = create<Action & State>((set) => ({
  currentVariant: null,
  updateVariant: (variant) => set({ currentVariant: variant }),
  resetVariant: () => set({ currentVariant: null }),
}));
export default useProductDetail;
