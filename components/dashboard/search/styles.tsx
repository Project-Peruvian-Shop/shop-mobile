import { COLORS } from "@/utils/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginVertical: 12,
    width: "100%",
  },
  wrapper: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    left: 16,
    top: "30%",
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
});
