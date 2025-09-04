import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuthStore } from "@/store/authStore";
const Home = () => {
  const { logout } = useAuthStore();
  return (
    <View>
      <TouchableOpacity onPress={logout}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
