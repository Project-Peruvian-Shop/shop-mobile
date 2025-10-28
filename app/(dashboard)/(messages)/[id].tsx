import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Detail() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <View>
        <Text>Detalle del mensaje: {id}</Text>
      </View>
    </SafeAreaView>
  );
}
