import COLORS from "@/constants/xolors";
import { View, ActivityIndicator } from "react-native";
export default function Loader({ size = "large" }: { size?: string }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <ActivityIndicator size={size as any} color={COLORS.primary} />
    </View>
  );
}
