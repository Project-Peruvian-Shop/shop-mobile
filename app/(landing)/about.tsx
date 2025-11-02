import { TitlePage } from "@/components/app/titlepage/titlepage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function About() {
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
      <TitlePage title="¿Quiénes somos?" />
    </SafeAreaView>
  );
}
