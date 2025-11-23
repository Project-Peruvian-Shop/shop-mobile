import { COLORS } from "@/utils/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "75%",
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 10,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.PRIMARY,
    textAlign: "center",
    marginBottom: 6,
  },
  message: {
    fontSize: 15,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
