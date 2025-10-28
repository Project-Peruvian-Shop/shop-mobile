import { ROUTES } from "@/utils/routes";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Cotizaciones() {
  return (
    <View>
      <Text>Cotizaciones Screen</Text>
      <Button
        title="ID: 123"
        onPress={() => router.push(ROUTES.DASHBOARD.COTIZACIONES.DETAIL.GO(1))}
      />
    </View>
  );
}
