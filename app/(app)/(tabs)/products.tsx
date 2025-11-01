import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Products() {
  return (
    <SafeAreaView edges={["top", "left", "right"]}>
      <View>
        <Text>Products screen</Text>
      </View>
    </SafeAreaView>
  );
}
