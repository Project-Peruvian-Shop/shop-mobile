import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    width: "45%",
    margin: 8,
  },
  iconContainer: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: "#1a1a1a",
  },
});
