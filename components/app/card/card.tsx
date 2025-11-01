import { ROUTES } from "@/utils/routes";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface HomeCardProps {
  title: string;
  icon: any;
}

export const HomeCard: React.FC<HomeCardProps> = ({ title, icon }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => router.push(ROUTES.TABS.PRODUCTS.ENTIRE_PATH)}
    >
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};
