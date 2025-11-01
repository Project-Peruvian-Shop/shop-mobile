import { SearchBar } from "@/components/dashboard/search/search";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Products() {
  return (
    <SafeAreaView edges={["top", "left", "right"]}>
      <Text style={styles.title}>Productos</Text>

      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Buscar productos..."
          value=""
          onChangeText={() => {}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 16,
    paddingHorizontal: 16,
    fontSize: 24,
    fontWeight: "bold",
  },
  searchContainer: {
    marginHorizontal: 16,
  },
});
