import { COLORS } from "@/utils/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: COLORS.SECONDARY,
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.WHITE,
  },
});
