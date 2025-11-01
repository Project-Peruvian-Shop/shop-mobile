import { SearchBar } from "@/components/dashboard/search/search";
import { PaginatedProductoResponseDTO } from "@/models/Producto/Producto_response_dto";
import { PaginatedResponse } from "@/services/global.interfaces";
import { getPaginatedProductos } from "@/services/producto.service";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const [productos, setProductos] =
    useState<PaginatedResponse<PaginatedProductoResponseDTO>>();

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async (page: number = 0) => {
    setLoading(true);
    try {
      const res = await getPaginatedProductos(page);
      setProductos(res);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  };

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

      {/* renderizar los productos con ItemCard */}
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
