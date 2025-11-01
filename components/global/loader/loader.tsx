import { COLORS } from "@/utils/colors";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "./style";

interface LoaderProps {
  message?: string;
  color?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  message = "Cargando...",
  color = COLORS.PRIMARY,
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={color} />
      {message && <Text style={[styles.text, { color }]}>{message}</Text>}
    </View>
  );
};
