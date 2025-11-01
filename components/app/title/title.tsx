import { COLORS } from "@/utils/colors";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

interface TitleProps {
  title: string;
  color?: string;
  backgroundColor?: string;
  textAlign?: "left" | "center" | "right";
}

export const Title: React.FC<TitleProps> = ({
  title,
  color = COLORS.WHITE,
  backgroundColor = COLORS.SECONDARY,
  textAlign = "center",
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color, textAlign }]}>{title}</Text>
    </View>
  );
};
