import { create } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";

type State = {
  cartItemCount: number;
  size:string;
  color:string;
};

type Actions = {
  updateCartItemCount: (val: number) => void;
  updateSize:(val:string) => void;
  updateColor:(val:string) => void;
};

const initialState: State = {
  cartItemCount: 0,
  size:"",
  color:""
};

const useCartStore = create(
  persist(
    (set) => ({
      ...initialState,
      updateCartItemCount: (val: number) => {
        set((state) => ({ ...state, cartItemCount: val }));
      },
      updateSize: (val: string) => {
        set((state) => ({ ...state, size: val }));
      },
      updateColor: (val: string) => {
        set((state) => ({ ...state, color: val }));
      },
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => sessionStorage),
    } as PersistOptions<State & Actions>,
  ),
);
export default useCartStore;
