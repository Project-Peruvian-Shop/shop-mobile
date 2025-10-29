import { COLORS } from "@/utils/colors";
import { Dimensions, StyleSheet } from "react-native";

export const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  menuBtn: {
    position: "absolute",
    top: 46,
    left: 10,
    zIndex: 100,
    backgroundColor: COLORS.SECONDARY,
    padding: 10,
    borderRadius: 10,
  },

  sidebar: {
    position: "absolute",
    width: width * 0.75,
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.SECONDARY,
    paddingTop: 80,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    zIndex: 200,
  },

  overlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    zIndex: 150,
  },

  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: "bold",
  },
  role: {
    color: COLORS.GRAY,
    fontSize: 13,
    marginBottom: 10,
  },

  separator: {
    height: 1,
    backgroundColor: COLORS.PRIMARY,
    opacity: 0.3,
    marginVertical: 15,
  },

  menuContainer: {
    paddingVertical: 10,
    gap: 24,
  },

  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  activeItem: {
    backgroundColor: COLORS.PRIMARY,
  },

  menuText: {
    color: COLORS.WHITE,
    fontSize: 16,
  },

  logoutBtn: {
    backgroundColor: COLORS.DARKGRAY,
    paddingVertical: 14,
    borderRadius: 16,
    marginVertical: 20,
    alignItems: "center",
  },
  logoutText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: "600",
  },
});
