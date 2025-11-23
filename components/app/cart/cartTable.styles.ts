import { COLORS } from "@/utils/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    flex: 1,
  },

  /* Empty cart */
  emptyCart: {
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.GRAY,
  },

  /* Items */
  row: {
    flexDirection: "column",
    alignItems: "center",
    borderBlockColor: COLORS.LIGHTGRAY,
    borderBottomWidth: 0.5,
    paddingVertical: 16,
    gap: 12,
  },

  productCell: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },

  productImage: {
    width:  80,
    height: 80,
  },

  productName: {
    fontSize: 14,
    fontWeight: "500",
  },

  category: {
    textAlign: "center",
    fontSize: 13,
    width: "70%"
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  qtyBtn: {
    padding: 6,
    backgroundColor: COLORS.DARKGRAY,
    borderRadius: 5,
    width: 40,
    alignItems: "center",
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: "600",
  },
  qtyText: {
    width: 60,
    textAlign: "center",
    fontSize: 14,
  },

  delete: {
    width: 30,
    height: 30,
  },

  /* Footer */
  footer: {
    marginTop: 20,
    gap: 14,
    alignItems: "center",
  },

  totalText: {
    fontSize: 16,
    fontWeight: "500",
  },

  btnBlue: {
    backgroundColor: COLORS.PRIMARY,
    padding: 10,
    borderRadius: 6,
    width: 180,
    alignItems: "center",
  },
  btnBlueText: {
    color: "white",
    fontWeight: "600",
  },

  btnWhite: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: COLORS.SECONDARY,
    padding: 10,
    borderRadius: 6,
    width: 180,
    alignItems: "center",
  },
  btnWhiteText: {
    color: "#444",
    fontWeight: "600",
  },
});
