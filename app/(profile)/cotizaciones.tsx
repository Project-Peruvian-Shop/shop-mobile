import { TitlePage } from "@/components/app/titlepage/titlepage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cotizaciones() {
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
      <TitlePage title="Mis Cotizaciones" />
    </SafeAreaView>
  );
}
