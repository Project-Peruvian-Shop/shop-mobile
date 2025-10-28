import { ROUTES } from "@/utils/routes";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
          backgroundColor: "#25292e",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#25292e",
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
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name={ROUTES.TABS.PROFILE.PATH}
        options={{
          title: ROUTES.TABS.PROFILE.NAME,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person-sharp" : "person-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
