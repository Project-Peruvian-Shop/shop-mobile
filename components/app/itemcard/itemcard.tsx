import { Icons } from "@/assets/images/icons";
import { QuantityModal } from "@/components/app/quantity/quantity";
import { PaginatedProductoResponseDTO } from "@/models/Producto/Producto_response_dto";
import { addToCart } from "@/utils/cartStorage";
import { COLORS } from "@/utils/colors";
import { ROUTES } from "@/utils/routes";
import { FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ConfirmModal } from "../modalConfirm/modalConfirm";
import { styles } from "./styles";

interface ItemCardProps {
  product: PaginatedProductoResponseDTO;
}

export default function ItemCard({ product }: ItemCardProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);

  const goToDetail = () => {
    router.push(ROUTES.STORE.DETAILPRODUCT.GO(product.id));
  };

  const handleConfirm = async (quantity: number) => {
    console.log(
      "Producto agregado:",
      product.nombre,
      "Cantidad:",
      quantity,
      "Categoría:",
      product.categoriaNombre
    );
    await addToCart(product, quantity);
    setShowModal(false);
    setModalConfirm(true);
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

          <TouchableOpacity
            style={styles.cartButton}
            onPress={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
          >
            <FontAwesome6 name="cart-plus" size={16} color={COLORS.WHITE} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Modal de cantidad */}
      <QuantityModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
      />
      {/* Modal de confirmación */}
      <ConfirmModal
        visible={modalConfirm}
        onClose={() => setModalConfirm(false)}
        title="Producto agregado"
        message="El producto se añadió correctamente al carrito"
        image={Icons.successIcon}
      />
    </View>
  );
}
