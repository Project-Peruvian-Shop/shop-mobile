import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 16,
    resizeMode: "cover",
  },
  name: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  pricingContainer: {
    marginBottom: 24,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    gap: 8,
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },
  previousPrice: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "#9ca3af",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563eb",
    borderRadius: 10,
    paddingVertical: 12,
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
