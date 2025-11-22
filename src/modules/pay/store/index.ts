import { create } from "zustand";

type State = {
  amount: {
    shipAmount: number;
    totalAmountFinal: number;
    totalProductAmount: number;
  };
};

type Action = {
  updateAmount: (amount: State["amount"]) => void;
};

const usePayment = create<Action & State>((set) => ({
  amount: {
    shipAmount: 0,
    totalAmountFinal: 0,
    totalProductAmount: 0,
  },
  updateAmount: (amount) => set({ amount }),
}));
export default usePayment;
