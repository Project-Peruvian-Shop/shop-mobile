import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface ItemCardProps {
  image: string;
  name: string;
  currentPrice: number;
  previousPrice: number;
  onAddToCart?: () => void;
}

export default function ItemCard({
  image,
  name,
  currentPrice,
  previousPrice,
  onAddToCart,
}: ItemCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Imagen del producto */}
        <View style={styles.imageContainer}>
          <Image
            source={
              image ? { uri: image } : require("@/assets/placeholder.png")
            }
            style={styles.image}
          />
        </View>

        {/* Nombre del producto */}
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>

        {/* Sección de precios */}
        <View style={styles.pricingContainer}>
          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>${currentPrice.toFixed(2)}</Text>
            <Text style={styles.previousPrice}>
              ${previousPrice.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Botón de carrito */}
        <TouchableOpacity style={styles.button} onPress={onAddToCart}>
          <FontAwesome6 name="cart-plus" size={24} color="black" />{" "}
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
