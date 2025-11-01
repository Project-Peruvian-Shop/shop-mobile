import { Title } from "@/components/app/title/title";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Products() {
  return (
    <SafeAreaView edges={["top", "left", "right"]}>
      <Title title="Productos" textAlign="left" />
    </SafeAreaView>
  );
}
