import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />

          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </SafeScreen>

      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
