import { COLORS } from "@/utils/colors";
import { Dimensions, StyleSheet } from "react-native";

export const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  menuBtn: {
    position: "absolute",
    top: 40,
    left: 10,
    zIndex: 100,
    backgroundColor: COLORS.SECONDARY,
    padding: 8,
    borderRadius: 8,
    elevation: 3,
  },

  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.7,
    backgroundColor: COLORS.SECONDARY,
    paddingTop: 80,
    paddingHorizontal: 20,
    zIndex: 200,
  },
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 150,
  },
  title: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  activeItem: {
    backgroundColor: COLORS.PRIMARY,
  },
  menuText: {
    color: COLORS.WHITE,
    fontSize: 16,
  },
});
