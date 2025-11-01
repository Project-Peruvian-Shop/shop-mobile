import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cart() {
  return (
    <SafeAreaView edges={["top", "left", "right"]}>
      <View>
        <Text>Cart screen</Text>
      </View>
    </SafeAreaView>
  );
}
