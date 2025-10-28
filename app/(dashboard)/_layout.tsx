import { ROUTES } from "@/utils/routes";
import { Stack } from "expo-router";

export default function DashboardLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={ROUTES.DASHBOARD.PRODUCTS.PATH}
        options={{ title: ROUTES.DASHBOARD.PRODUCTS.NAME }}
      />
    </Stack>
  );
}
