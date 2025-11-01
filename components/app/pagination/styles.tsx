import { COLORS } from "@/utils/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  button: {
    backgroundColor: COLORS.LIGHTGRAY,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "600",
    color: COLORS.SECONDARY,
    fontFamily: "System",
  },
  active: {
    backgroundColor: COLORS.PRIMARY,
  },
  activeText: {
    color: COLORS.WHITE,
    fontWeight: "bold",
  },
  disabled: {
    opacity: 0.5,
  },
});
