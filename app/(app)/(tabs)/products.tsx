import ItemCard from "@/components/app/itemcard/itemcard";
import { Pagination } from "@/components/app/pagination/pagination";
import { SearchBar } from "@/components/dashboard/search/search";
import { PaginatedProductoResponseDTO } from "@/models/Producto/Producto_response_dto";
import { PaginatedResponse } from "@/services/global.interfaces";
import { getPaginatedProductos } from "@/services/producto.service";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [productos, setProductos] =
    useState<PaginatedResponse<PaginatedProductoResponseDTO>>();

  useEffect(() => {
    fetchAll(page);
  }, [page]);

  const fetchAll = async (page: number = 0) => {
    setLoading(true);
    try {
      const res = await getPaginatedProductos(page);
      setProductos(res);
      setTotalPages(res.totalPages);
      setPage(res.number);
    } finally {
      setLoading(false);
    }
  };

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 16 * 2 - 8) / 2;

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
      <Text style={styles.title}>Productos</Text>

      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Buscar productos..."
          value=""
          onChangeText={() => {}}
        />
      </View>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#000"
          style={{ marginTop: 20 }}
        />
      )}

      {!loading && productos?.content && (
        <FlatList
          data={productos.content}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={{ width: cardWidth }}>
              <ItemCard
                product={item}
                onAddToCart={() => console.log("Agregar:", item.nombre)}
              />
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No se encontraron productos</Text>
          }
        />
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
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
    marginBottom: 8,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#888",
  },
});
