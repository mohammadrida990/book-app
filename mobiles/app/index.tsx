import { Text, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View>
      <Link href="/(auth)/index">login</Link>
      <Link href="/(auth)/sign-up">sign up</Link>
      <Text>Index</Text>

      {/* <Image cachePolicy={"none"} source={} /> */}
    </View>
  );
}
