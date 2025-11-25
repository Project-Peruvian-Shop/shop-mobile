import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProductoCarritoDetalleDTO {
  id: number;
  nombre: string;
  imagenEnlace: string;
  imagenAlt: string;
  cantidad?: number;
}

interface ProductListCardProps {
  title: string;
  items: ProductoCarritoDetalleDTO[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ProductListCard2: React.FC<ProductListCardProps> = ({
  title,
  items,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.subtitle}>{title}</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image
              source={{ uri: item.imagenEnlace }}
              style={styles.productImage}
            />

            <Text style={styles.productName}>{item.nombre}</Text>

            {item.cantidad !== undefined && (
              <Text style={styles.productCantidad}>
                {item.cantidad} unidad(es)
              </Text>
            )}
          </View>
        )}
      />

      {/* PAGINACIÓN */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          disabled={currentPage === 0}
          onPress={() => onPageChange(currentPage - 1)}
          style={[styles.pageButton, currentPage === 0 && styles.pageDisabled]}
        >
          <Text style={styles.pageText}>◀</Text>
        </TouchableOpacity>

        <Text style={styles.pageNumber}>
          {currentPage + 1} / {totalPages}
        </Text>

        <TouchableOpacity
          disabled={currentPage + 1 >= totalPages}
          onPress={() => onPageChange(currentPage + 1)}
          style={[
            styles.pageButton,
            currentPage + 1 >= totalPages && styles.pageDisabled,
          ]}
        >
          <Text style={styles.pageText}>▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 10,
    flexDirection: "column",
    gap: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    backgroundColor: "#ffffff",
  },

  subtitle: {
    marginBottom: 16,
    color: "#1b2f33", // reemplaza con tu var(--primary-color)
    fontWeight: "700",
    fontSize: 20,
  },

  productItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    flexWrap: "wrap", // para simular el @media
  },

  productImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    borderRadius: 8,
  },

  productName: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontWeight: "400",
  },

  productCantidad: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1b2f33",
  },

  paginationContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },

  pageButton: {
    padding: 10,
  },

  pageDisabled: {
    opacity: 0.3,
  },

  pageText: {
    fontSize: 18,
  },

  pageNumber: {
    fontSize: 16,
    fontWeight: "600",
  },
});
