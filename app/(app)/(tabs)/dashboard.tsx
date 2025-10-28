import { ROUTES } from "@/utils/routes";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <View>
        <Text>Dashboard Screen</Text>

        <Button
          title="Ir a Products"
          onPress={() => router.push(ROUTES.DASHBOARD.PRODUCTS.ALL.ENTIRE_PATH)}
        />
      </View>
    </SafeAreaView>
  );
}
