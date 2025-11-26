import { COLORS } from "@/utils/colors";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FAQCardProps {
  img: any;
  title: string;
  description: string;
  color: string;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  onPressLink?: () => void;
}

export function FAQCard({
  img,
  title,
  description,
  color,
  index,
  hoveredIndex,
  setHoveredIndex,
  onPressLink,
}: FAQCardProps) {
  const isHovered = hoveredIndex === index;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPressLink && onPressLink()}
      onPressIn={() => setHoveredIndex(index)}
      onPressOut={() => setHoveredIndex(null)}
      style={[
        styles.card,
        { borderColor: isHovered ? COLORS.PRIMARY : "#e5e7eb" },
        isHovered && styles.cardHovered,
      ]}
    >
      <View
        style={[
          styles.bar,
          {
            backgroundColor: color,
            transform: [{ scaleX: isHovered ? 1 : 0 }],
          },
        ]}
      />

      <View
        style={[
          styles.iconBox,
          {
            backgroundColor: isHovered ? color : "#f8f9fa",
          },
        ]}
      >
        <Image source={img} style={styles.icon} resizeMode="contain" />
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.desc}>{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "relative",
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 12,
    padding: 24,
    width: "80%",
    minWidth: 160,
    alignItems: "center",
    margin: 8,
  },

  cardHovered: {
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 4,
  },

  bar: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 4,
    width: "100%",
  },

  iconBox: {
    width: 90,
    height: 90,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  icon: {
    width: 60,
    height: 60,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1b2f33",
    textAlign: "center",
    marginBottom: 8,
  },

  desc: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "justify",
  },
});
