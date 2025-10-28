import { ROUTES } from "@/utils/routes";
import { Stack } from "expo-router";

export default function DashboardLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={ROUTES.DASHBOARD.PRODUCTS.ALL.PATH}
        options={{ title: ROUTES.DASHBOARD.PRODUCTS.ALL.NAME }}
      />

      <Stack.Screen
        name={ROUTES.DASHBOARD.CATEGORIES.ALL.PATH}
        options={{ title: ROUTES.DASHBOARD.CATEGORIES.ALL.NAME }}
      />

      <Stack.Screen
        name={ROUTES.DASHBOARD.COTIZACIONES.ALL.PATH}
        options={{ title: ROUTES.DASHBOARD.COTIZACIONES.ALL.NAME }}
      />

      <Stack.Screen
        name={ROUTES.DASHBOARD.MESSAGES.ALL.PATH}
        options={{ title: ROUTES.DASHBOARD.MESSAGES.ALL.NAME }}
      />

      <Stack.Screen
        name={ROUTES.DASHBOARD.USERS.ALL.PATH}
        options={{ title: ROUTES.DASHBOARD.USERS.ALL.NAME }}
      />
    </Stack>
  );
}
