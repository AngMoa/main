import { create } from "zustand";

// 로그인 여부
export const useAuthStore = create((set) => ({
    isLoginState: false,
    setIsLoginState: () =>
        set((state) => ({ isLoginState: !state.isLoginState })),
}));
