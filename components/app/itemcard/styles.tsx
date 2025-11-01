import { COLORS } from "@/utils/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    padding: 20,
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 16,
    resizeMode: "cover",
  },
  name: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.SECONDARY,
    marginBottom: 12,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  category: {
    flex: 1,
    fontSize: 10,
    color: COLORS.GRAY,
    marginRight: 10,
  },
  cartButton: {
    backgroundColor: COLORS.PRIMARY,
    padding: 10,
    borderRadius: 10,
  },
});
