import { TitlePage } from "@/components/app/titlepage/titlepage";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "expo-router";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cart() {
  const router = useRouter();
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
      <TitlePage title="Carrito" />

      <Button
        title="Solicitar cotización"
        onPress={() => {
          router.push(ROUTES.STORE.COTIZACION.ENTIRE_PATH);
        }}
      />
    </SafeAreaView>
  );
}
