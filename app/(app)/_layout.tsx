import { COLORS } from "@/utils/colors";
import { ROUTES } from "@/utils/routes";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.GRAY,
        headerTintColor: COLORS.WHITE,
        headerStyle: {
          backgroundColor: COLORS.SECONDARY,
        },
        tabBarStyle: {
          backgroundColor: COLORS.SECONDARY,
        },
      }}
    >
      <Tabs.Screen
        name={ROUTES.TABS.HOME.PATH}
        options={{
          title: ROUTES.TABS.HOME.NAME,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name={ROUTES.TABS.PRODUCTS.PATH}
        options={{
          title: ROUTES.TABS.PRODUCTS.NAME,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "pricetag-sharp" : "pricetag-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name={ROUTES.TABS.CART.PATH}
        options={{
          title: ROUTES.TABS.CART.NAME,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "cart-sharp" : "cart-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name={ROUTES.TABS.DASHBOARD.PATH}
        options={{
          title: ROUTES.TABS.DASHBOARD.NAME,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="monitor-dashboard"
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name={ROUTES.TABS.MORE.PATH}
        options={{
          title: ROUTES.TABS.MORE.NAME,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "menu-sharp" : "menu-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
