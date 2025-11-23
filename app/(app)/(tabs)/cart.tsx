import CartTable from "@/components/app/cart/cartTable";
import { TitlePage } from "@/components/app/titlepage/titlepage";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cart() {

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
      <TitlePage title="Carrito" />
      <View style={{ flex: 1, }}>
        <CartTable />
      </View>
    </SafeAreaView>
  );
}
