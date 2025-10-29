import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f3f3f3",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cell: {
    width: 200,
    padding: 6,
  },
  th: {
    fontWeight: "bold",
    textAlign: "center",
  },
  td: {
    color: "#333",
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#ddd",
    padding: 4,
    borderRadius: 4,
    marginRight: 4,
  },
  empty: {
    textAlign: "center",
    padding: 12,
    color: "#888",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    gap: 12,
  },
  disabled: {
    color: "#aaa",
  },
});
