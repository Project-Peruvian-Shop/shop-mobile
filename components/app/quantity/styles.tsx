import { COLORS } from "@/utils/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    gap: 16,
  },
  btnCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 60,
    height: 40,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    fontSize: 16,
    color: "#0f172a",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#f1f5f9",
  },
  addBtn: {
    backgroundColor: COLORS.PRIMARY,
  },
  cancelText: {
    color: "#475569",
    fontWeight: "500",
  },
  addText: {
    color: "#fff",
    fontWeight: "500",
  },
});
