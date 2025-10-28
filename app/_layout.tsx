import { ROUTES } from "@/utils/routes";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ROUTES.GROUPS.APP.PATH} />
        <Stack.Screen name={ROUTES.GROUPS.DASHBOARD.PATH} />
      </Stack>
    </SafeAreaProvider>
  );
}
