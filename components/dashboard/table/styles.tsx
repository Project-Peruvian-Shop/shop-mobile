import { COLORS } from "@/utils/colors";
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
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 8,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "stretch",
    height: 56,
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
  actionsCell: {
    width: 160,
    padding: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    gap: 16,
  },
  buttonPagination: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.PRIMARY,
  },
  pressed: {
    backgroundColor: "#e0e0e0",
  },
  disabledButton: {
    backgroundColor: COLORS.LIGHTGRAY,
  },
  textButton: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  disabledText: {
    color: COLORS.WHITE,
  },
  pageIndicator: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.SECONDARY,
  },
});
