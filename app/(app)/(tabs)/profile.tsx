import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView edges={["top", "left", "right"]}>
      <View>
        <Text>Profile screen</Text>
      </View>
    </SafeAreaView>
  );
}
