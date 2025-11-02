import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
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

  // --- valores animados ---
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  // --- Gestos ---
  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = savedTranslateX.value + e.translationX;
      translateY.value = savedTranslateY.value + e.translationY;
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      scale.value = withTiming(scale.value > 1 ? 1 : 2);
    });

  const composed = Gesture.Simultaneous(pinch, pan, doubleTap);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const closeModal = () => {
    setVisible(false);
    scale.value = 1;
    savedScale.value = 1;
    translateX.value = 0;
    translateY.value = 0;
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
  };

  return (
    <>
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

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={modalStyles.overlay}>
          <Pressable onPress={closeModal} style={modalStyles.closeButton}>
            <Ionicons name="close" size={28} color="#fff" />
          </Pressable>

          <GestureHandlerRootView style={modalStyles.gestureRoot}>
            <GestureDetector gesture={composed}>
              <Animated.View style={animatedStyle}>
                <Image
                  source={{ uri: imageSource }}
                  style={modalStyles.zoomImage}
                  contentFit="contain"
                  transition={300}
                />
              </Animated.View>
            </GestureDetector>
          </GestureHandlerRootView>
        </View>
      </Modal>
    </>
  );
}
