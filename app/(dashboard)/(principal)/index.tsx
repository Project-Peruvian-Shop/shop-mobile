import { ROUTES } from "@/utils/routes";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Principal() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <View>
        <Text>Principal Screen</Text>

        <Button
          title="Productos"
          onPress={() => router.push(ROUTES.DASHBOARD.PRODUCTS.ALL.ENTIRE_PATH)}
        />

        <Button
          title="Categorías"
          onPress={() =>
            router.push(ROUTES.DASHBOARD.CATEGORIES.ALL.ENTIRE_PATH)
          }
        />

        <Button
          title="Cotizaciones"
          onPress={() =>
            router.push(ROUTES.DASHBOARD.COTIZACIONES.ALL.ENTIRE_PATH)
          }
        />

        <Button
          title="Mensajes"
          onPress={() => router.push(ROUTES.DASHBOARD.MESSAGES.ALL.ENTIRE_PATH)}
        />

        <Button
          title="Usuarios"
          onPress={() => router.push(ROUTES.DASHBOARD.USERS.ALL.ENTIRE_PATH)}
        />
      </View>
    </SafeAreaView>
  );
}
