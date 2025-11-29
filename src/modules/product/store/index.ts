import { Variant } from "@/types";
import { create } from "zustand";

type State = {
  currentVariant: Variant | null;
};

type Action = {
  updateVariant: (variant: State["currentVariant"]) => void;
};

const useProductDetail = create<Action & State>((set) => ({
  currentVariant: null,
  updateVariant: (variant) => set({ currentVariant: variant }),
}));
export default useProductDetail;
