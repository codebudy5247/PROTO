import { create } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";

type State = {
  previousLocation: string | null;
};

type Actions = {
  updatePreviousLocation: (previousLocation: string) => void;
};

const initialState: State = {
  previousLocation: null,
};

const useLocationStore = create(
  persist(
    (set) => ({
      ...initialState,
      updatePreviousLocation: (previousLocation: string) => {
        set({ previousLocation });
      },
    }),
    {
      name: "location-store",
      storage: createJSONStorage(() => sessionStorage),
    } as PersistOptions<State & Actions>,
  ),
);
export default useLocationStore;
