import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/constants/api";

export const useAuthStore = create<any>((set) => ({
  user: null,
  isLoading: false,
  token: null,
  register: async (username: string, email: string, password: string) => {
    set({ isLoading: true });

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
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
  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");

      const user = userJson ? JSON.parse(userJson) : null;

      if (token && user) {
        set({ token, user });
      }
    } catch (error) {
      console.log("auth store error:", error);
    }
  },
  logout: async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    set({ user: null, token: null });
  },
  login: async (email: string, password: string) => {
    set({ isLoading: true });

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Login failed");
      }

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ user: data.user, token: data.token, isLoading: false });

      return { success: true };
    } catch (error: any) {
      console.error("Error during login:", error);
      set({ isLoading: false });
      return { success: false, message: error.message };
    }
  },
}));
