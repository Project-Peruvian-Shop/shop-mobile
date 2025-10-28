import { ROUTES } from "@/utils/routes";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Users() {
  return (
    <View>
      <Text>Users Screen</Text>
      <Button
        title="ID: 123"
        onPress={() => router.push(ROUTES.DASHBOARD.USERS.DETAIL.GO(1))}
      />
    </View>
  );
}
