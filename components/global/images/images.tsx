import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { modalStyles, styles } from "./styles";

interface ImageViewerProps {
  uri?: string;
  variant?: "product" | "category";
}

export function ImageViewer({ uri, variant = "product" }: ImageViewerProps) {
  const [visible, setVisible] = useState(false);

  const imageSource = uri || require("@/assets/images/logo.png");

  const imageStyle =
    variant === "product" ? styles.productImage : styles.categoryFullImage;

  return (
    <>
      {/* Imagen principal */}
      <TouchableOpacity
        onPress={() => setVisible(true)}
        activeOpacity={0.9}
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
      </TouchableOpacity>

      {/* Modal con zoom */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={modalStyles.overlay}>
          {/* Cerrar tocando fuera */}
          <Pressable
            style={modalStyles.pressableBackground}
            onPress={() => setVisible(false)}
          />

          {/* Botón de cierre */}
          <Pressable
            onPress={() => setVisible(false)}
            style={modalStyles.closeButton}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </Pressable>

          {/* Imagen con zoom */}
          <ScrollView
            contentContainerStyle={modalStyles.scrollContent}
            maximumZoomScale={5}
            minimumZoomScale={1}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            bouncesZoom
            centerContent
          >
            <Image
              source={{ uri: imageSource }}
              style={modalStyles.zoomImage}
              contentFit="contain"
              transition={300}
            />
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}
