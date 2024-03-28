import { User } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";


type State = {
  user: User | null;
  accessToken: string | null;
};

type Actions = {
  reset: () => void;
  updateUser: (user: User) => void;
  updateAccessToken: (accessToken: string) => void;
};

// define the initial state
const initialState: State = {
  user: null,
  accessToken: null,
};

// create store
const useAuthStore = create(
  persist(
    (set) => ({
      ...initialState,
      reset: () => {
        set(initialState);
      },
      updateUser: (user: User) => {
        set({ user });
      },
      updateAccessToken: (accessToken: string) => {
        set({ accessToken });
      },
    }),
    // Persist config
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
    } as PersistOptions<State & Actions>,
  ),
);
export default useAuthStore;
