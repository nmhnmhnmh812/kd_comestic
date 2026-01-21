import { create } from "zustand";

type State = {
  amount: {
    shipAmount: number;
    totalAmountFinal: number;
    totalProductAmount: number;
  };
  couponCode: string;
  discountAmount: number;
};

type Action = {
  updateAmount: (amount: State["amount"]) => void;
  setCoupon: (code: string, discount: number) => void;
};

const usePayment = create<Action & State>((set) => ({
  amount: {
    shipAmount: 0,
    totalAmountFinal: 0,
    totalProductAmount: 0,
  },
  couponCode: "",
  discountAmount: 0,
  updateAmount: (amount) => set({ amount }),
  setCoupon: (code, discount) =>
    set({ couponCode: code, discountAmount: discount }),
}));
export default usePayment;
