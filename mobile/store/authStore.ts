import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthStore = create<any>((set) => ({
  user: null,
  isLoading: false,
  token: null,
  register: async (username: string, email: string, password: string) => {
    set({ isLoading: true });

    try {
      const response = await fetch("https://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ user: data.user, token: data.token, isLoading: false });

      return { success: true };
    } catch (error: any) {
      console.error("Error during registration:", error);
      set({ isLoading: false });
      return { success: false, message: error.message };
    }
  },
}));
