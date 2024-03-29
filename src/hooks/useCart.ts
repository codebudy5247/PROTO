import { create } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";

type State = {
  cartItemCount: number;
};

type Actions = {
  updateCartItemCount: (val: number) => void;
};

const initialState: State = {
  cartItemCount: 0,
};

const useCartStore = create(
  persist(
    (set) => ({
      ...initialState,
      updateCartItemCount: (val: number) => {
        set((state) => ({ ...state, cartItemCount: val }));
      },
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => sessionStorage),
    } as PersistOptions<State & Actions>,
  ),
);
export default useCartStore;
