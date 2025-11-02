import ItemCard from "@/components/app/itemcard/itemcard";
import { Pagination } from "@/components/app/pagination/pagination";
import { TitlePage } from "@/components/app/titlepage/titlepage";
import { SearchBar } from "@/components/dashboard/search/search";
import { Loader } from "@/components/global/loader/loader";
import { PaginatedProductoResponseDTO } from "@/models/Producto/Producto_response_dto";
import { PaginatedResponse } from "@/services/global.interfaces";
import { getPaginatedProductos } from "@/services/producto.service";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [productos, setProductos] =
    useState<PaginatedResponse<PaginatedProductoResponseDTO>>();

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 16 * 2 - 8) / 2;

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

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
      <TitlePage title="Productos" />

      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Buscar productos..."
          value=""
          onChangeText={() => {}}
        />
      </View>

      {loading && <Loader message="Cargando productos..." />}

      {!loading && productos?.content && (
        <FlatList
          data={productos.content}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={{ width: cardWidth }}>
              <ItemCard product={item} />
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No se encontraron productos</Text>
          }
          ListFooterComponent={
            <View style={styles.footerContainer}>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </View>
          }
          ListFooterComponentStyle={{ marginTop: 20, marginBottom: 40 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginHorizontal: 12,
    marginBottom: 12,
  },
  listContainer: {
    paddingTop: 8,
    paddingHorizontal: 12,
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
  footerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
