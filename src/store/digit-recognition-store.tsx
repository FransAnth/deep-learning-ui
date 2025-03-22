import { create } from "zustand";

export const useDigitStore = create((set: any) => {
  return {
    modelPrediction: null,
    setModelPrediction: (digit: any) => set(() => ({ modelPrediction: digit })),
  };
});
