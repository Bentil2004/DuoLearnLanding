// src/stores/userStore.ts
import { create } from 'zustand';

type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  // Add other user properties you need
};

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));