import { ROUTES } from "@/utils/routes";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Messages() {
  return (
    <View>
      <Text>Messages Screen</Text>
      <Button
        title="ID: 123"
        onPress={() => router.push(ROUTES.DASHBOARD.MESSAGES.DETAIL.GO(1))}
      />
    </View>
  );
}
