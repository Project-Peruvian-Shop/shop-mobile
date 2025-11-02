import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width - 20;

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: "70%",
    height: screenWidth * 0.7,
  },
  categoryContainer: {
    width: "100%",
  },
  categoryFullImage: {
    width: screenWidth,
    height: undefined,
    aspectRatio: 16 / 9,
    resizeMode: "contain",
    marginBottom: 10,
  },
});
