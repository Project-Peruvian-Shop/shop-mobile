import { Tabs } from "expo-router";

import { ROUTES } from "@/utils/routes";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
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
        name={ROUTES.HOME.PATH}
        options={{
          title: ROUTES.HOME.NAME,
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
        name={ROUTES.CART.PATH}
        options={{
          title: ROUTES.CART.NAME,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused ? "cart-sharp" : "cart-outline"
              }
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name={ROUTES.PROFILE.PATH}
        options={{
          title: ROUTES.PROFILE.NAME,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person-sharp" : "person-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name={ROUTES.DASHBOARD.PATH}
        options={{
          title: ROUTES.DASHBOARD.NAME,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "speedometer-sharp" : "speedometer-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
