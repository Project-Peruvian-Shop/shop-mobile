import { TitlePage } from "@/components/app/titlepage/titlepage";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "expo-router";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
      <TitlePage title="Dashboard" />

      <Button
        title="Ir a Principal"
        onPress={() => router.push(ROUTES.DASHBOARD.PRINCIPAL.ENTIRE_PATH)}
      />

      <Button
        title="Ir a Login"
        onPress={() => router.push(ROUTES.AUTH.LOGIN.ENTIRE_PATH)}
      />

      <Button
        title="Ir a Register"
        onPress={() => router.push(ROUTES.AUTH.REGISTER.ENTIRE_PATH)}
      />
    </SafeAreaView>
  );
}
