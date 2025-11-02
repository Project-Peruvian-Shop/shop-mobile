import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width - 20;

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: "70%",
    aspectRatio: 1,
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

export const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  gestureRoot: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 30,
    padding: 6,
  },
  zoomImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.7,
  },
});
