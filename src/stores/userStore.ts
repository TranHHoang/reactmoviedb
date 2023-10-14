import { create } from "zustand";
import { User } from "~/types/user";
import { storage } from "~/utils/storage";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()((set) => ({
  user: storage.getUser(),
  setUser: (user) => {
    set(() => ({ user }));
    storage.setUser(user);
  },
  clearUser: () => {
    set(() => ({ user: null }));
    storage.clearUser();
  },
}));
