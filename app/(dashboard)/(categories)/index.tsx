import { ROUTES } from "@/utils/routes";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Categories() {
  return (
    <View>
      <Text>Categorias Screen</Text>
      <Button
        title="ID: 123"
        onPress={() => router.push(ROUTES.DASHBOARD.CATEGORIES.DETAIL.GO(1))}
      />
    </View>
  );
}
