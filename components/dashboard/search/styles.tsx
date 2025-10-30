import { COLORS } from "@/utils/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    width: "100%",
  },
  wrapper: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    left: 16,
    top: "50%",
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },
  input: {
    fontFamily: "System",
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingLeft: 40,
    backgroundColor: COLORS.GRAY100,
    borderWidth: 1,
    borderColor: COLORS.SECONDARY,
    borderRadius: 8,
    fontSize: 14,
    color: COLORS.DARKGRAY,
  },
  loadingText: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -10 }],
    fontSize: 12,
    color: "#999",
  },
  resultsBox: {
    position: "absolute",
    top: "110%",
    left: 0,
    width: "100%",
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.LIGHTGRAY,
    borderRadius: 8,
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    maxHeight: 300,
    zIndex: 10,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  resultLabel: {
    fontSize: 14,
    color: COLORS.DARKGRAY,
  },
});
