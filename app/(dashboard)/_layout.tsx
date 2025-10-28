import { ROUTES } from "@/utils/routes";
import { Stack } from "expo-router";

export default function DashboardLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={ROUTES.DASHBOARD.PRODUCTS.ALL.PATH}
        options={{ title: ROUTES.DASHBOARD.PRODUCTS.ALL.NAME }}
      />
    </Stack>
  );
}
