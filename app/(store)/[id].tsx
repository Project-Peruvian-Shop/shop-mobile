import { TitlePage } from "@/components/app/titlepage/titlepage";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailProduct() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
      <TitlePage title={`Detalle de Producto ${id}`} />
    </SafeAreaView>
  );
}
