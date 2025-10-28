import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { COLORS } from "@/utils/colors";
import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function DashboardLayout() {
  return (
    <View style={styles.container}>
      <Sidebar />

      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHTGRAY,
  },
  content: {
    flex: 1,
    marginTop: 40,
  },
});
