import { PaginatedProductoResponseDTO } from "@/models/Producto/Producto_response_dto";
import { COLORS } from "@/utils/colors";
import { ROUTES } from "@/utils/routes";
import { FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface ItemCardProps {
  product: PaginatedProductoResponseDTO;
  onAddToCart?: () => void;
}

export default function ItemCard({ product, onAddToCart }: ItemCardProps) {
  const router = useRouter();

  const goToDetail = () => {
    router.push(ROUTES.STORE.DETAILPRODUCT.GO(product.id));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={goToDetail}
      >
        {/* Imagen centrada */}
        <View style={styles.imageContainer}>
          <Image
            source={
              product.imagenUrl
                ? { uri: product.imagenUrl }
                : require("@/assets/images/logo.png")
            }
            style={styles.image}
            contentFit="contain"
            transition={500}
            placeholder="blur"
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

          {/* Botón del carrito independiente */}
          <TouchableOpacity
            style={styles.cartButton}
            onPress={(e) => {
              e.stopPropagation();
              onAddToCart?.();
            }}
          >
            <FontAwesome6 name="cart-plus" size={16} color={COLORS.WHITE} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}
