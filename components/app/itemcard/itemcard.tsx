import { PaginatedProductoResponseDTO } from "@/models/Producto/Producto_response_dto";
import { COLORS } from "@/utils/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface ItemCardProps {
  product: PaginatedProductoResponseDTO;
  onAddToCart?: () => void;
}

export default function ItemCard({ product, onAddToCart }: ItemCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Imagen centrada */}
        <View style={styles.imageContainer}>
          <Image
            source={
              product.imagenUrl
                ? { uri: product.imagenUrl }
                : require("@/assets/images/logo.png")
            }
            style={styles.image}
          />
        </View>

        {/* Título centrado */}
        <Text style={styles.name} numberOfLines={3}>
          {product.nombre}
        </Text>

        {/* Categoría + Botón de carrito */}
        <View style={styles.bottomRow}>
          <Text style={styles.category} numberOfLines={3}>
            {product.categoriaNombre}
          </Text>
          <TouchableOpacity style={styles.cartButton} onPress={onAddToCart}>
            <FontAwesome6 name="cart-plus" size={16} color={COLORS.WHITE} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
