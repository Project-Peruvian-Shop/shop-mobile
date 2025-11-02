import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
import { styles } from "./styles";

interface ImageViewerProps {
  uri?: string;
  variant?: "product" | "category";
}

export function ImageViewer({ uri, variant = "product" }: ImageViewerProps) {
  const imageSource = uri || require("@/assets/images/logo.png");

  const imageStyle =
    variant === "product" ? styles.productImage : styles.categoryFullImage;

  return (
    <View
      style={[
        styles.container,
        variant === "category" && styles.categoryContainer,
      ]}
    >
      <Image
        source={{ uri: imageSource }}
        style={imageStyle}
        contentFit="contain"
        transition={500}
      />
    </View>
  );
}
