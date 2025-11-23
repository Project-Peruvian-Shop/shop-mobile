import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity
} from "react-native";
import { styles } from "./styles";

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  image: any; // require("…")
  onClose: () => void;
}

export function ConfirmModal({
  visible,
  title,
  message,
  image,
  onClose,
}: ConfirmModalProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 6,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                {
                  scale: scaleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            },
          ]}
        >
          {image && <Image source={image} style={styles.icon} />}

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.btnText}>Aceptar</Text>
          </TouchableOpacity>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
