import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [ready, setReady] = useState(false);

  const { checkAuth, user, token } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      await checkAuth(); // wait for auth check
      setReady(true);
    };
    init();
  }, [checkAuth]);

  useEffect(() => {
    if (!ready) return;
    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;

    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)");
    } else if (isSignedIn && inAuthScreen) {
      router.replace("/(tabs)" as any);
    }
  }, [user, token, segments, router, ready]);

  if (!ready) {
    // simple splash while checking auth
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />

          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>

      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
