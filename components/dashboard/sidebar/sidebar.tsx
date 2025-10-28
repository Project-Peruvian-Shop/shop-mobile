import { COLORS } from "@/utils/colors";
import { ROUTES } from "@/utils/routes";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, usePathname } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Text, TouchableOpacity } from "react-native";
import { styles, width } from "./styles";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [usuario, setUsuario] = useState("Wilmer");

  const translateX = useRef(new Animated.Value(-width * 0.7)).current;
  const pathname = usePathname();

  const toggleSidebar = () => {
    const newState = !open;
    setOpen(newState);

    Animated.timing(translateX, {
      toValue: newState ? 0 : -width * 0.7,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: ROUTES.DASHBOARD.PRINCIPAL.ENTIRE_PATH,
    },
    {
      name: ROUTES.DASHBOARD.PRODUCTS.ALL.NAME,
      path: ROUTES.DASHBOARD.PRODUCTS.ALL.ENTIRE_PATH,
    },
    {
      name: ROUTES.DASHBOARD.USERS.ALL.NAME,
      path: ROUTES.DASHBOARD.USERS.ALL.ENTIRE_PATH,
    },
    {
      name: ROUTES.DASHBOARD.CATEGORIES.ALL.NAME,
      path: ROUTES.DASHBOARD.CATEGORIES.ALL.ENTIRE_PATH,
    },
    {
      name: ROUTES.DASHBOARD.COTIZACIONES.ALL.NAME,
      path: ROUTES.DASHBOARD.COTIZACIONES.ALL.ENTIRE_PATH,
    },
    {
      name: ROUTES.DASHBOARD.MESSAGES.ALL.NAME,
      path: ROUTES.DASHBOARD.MESSAGES.ALL.ENTIRE_PATH,
    },
  ];

  return (
    <>
      <TouchableOpacity style={styles.menuBtn} onPress={toggleSidebar}>
        <MaterialIcons name="menu" size={30} color={COLORS.WHITE} />
      </TouchableOpacity>

      {open && (
        <TouchableOpacity style={styles.overlay} onPress={toggleSidebar} />
      )}

      <Animated.View style={[styles.sidebar, { transform: [{ translateX }] }]}>
        <Text style={styles.title}>Bienvenido, {usuario}</Text>

        {menuItems.map((item) => {
          const isActive = pathname.includes(item.path);
          return (
            <Link key={item.path} href={item.path} asChild>
              <TouchableOpacity
                style={[styles.menuItem, isActive && styles.activeItem]}
                onPress={toggleSidebar}
              >
                <Text
                  style={[styles.menuText, isActive && { color: COLORS.WHITE }]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            </Link>
          );
        })}
      </Animated.View>
    </>
  );
}
