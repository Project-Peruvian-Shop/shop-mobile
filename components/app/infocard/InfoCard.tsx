import { COLORS } from "@/utils/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface InfoItem {
  label: string;
  value: string | number | React.ReactNode;
}

interface InfoCardProps {
  title: string;
  items: InfoItem[];
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, items }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.subtitle}>{title}</Text>

      {items.map((item, index) => (
        <View style={styles.infoRow} key={index}>
          <Text style={styles.label}>{item.label}</Text>
          {typeof item.value === "string" || typeof item.value === "number" ? (
            <Text style={styles.value}>{item.value}</Text>
          ) : (
            <View style={{ width: "70%" }}>{item.value}</View>
          )}
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    padding: 40,
    flexDirection: "column",
    gap: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    backgroundColor: "#ffffff",
  },

  subtitle: {
    marginBottom: 20,
    color: COLORS.PRIMARY, 
    fontWeight: "700",
    fontSize: 20,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  label: {
    width: "50%",
    fontWeight: "600",
    fontSize: 16,
  },

  value: {
    width: "50%",
    fontWeight: "400",
    fontSize: 16,
    textAlign: "justify",
  },
});
