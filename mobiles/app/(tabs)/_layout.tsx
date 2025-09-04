import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ headerShown: false, title: "Home" }}
      />

      <Tabs.Screen
        name="create"
        options={{ headerShown: false, title: "Create" }}
      />

      <Tabs.Screen
        name="profile"
        options={{ headerShown: false, title: "Profile" }}
      />
    </Tabs>
  );
};

export default TabLayout;
