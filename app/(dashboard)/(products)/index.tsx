import { ROUTES } from "@/utils/routes";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Products() {
  return (
    <View>
      <Text>Products Screen</Text>
      <Button
        title="ID: 123"
        onPress={() => router.push(ROUTES.DASHBOARD.PRODUCTS.DETAIL.GO(1))}
      />
    </View>
  );
}
