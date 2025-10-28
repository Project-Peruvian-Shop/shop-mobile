import { COLORS } from "@/utils/colors";
import { ROUTES } from "@/utils/routes";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, usePathname } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { styles, width } from "./styles";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [usuario, setUsuario] = useState("Wilmer Guevara");
  const [role, setRole] = useState("Propietario");

  const pathname = usePathname();

  const translateX = useRef(new Animated.Value(-width * 0.75)).current;

  const toggleSidebar = () => {
    const newState = !open;
    setOpen(newState);
    Animated.timing(translateX, {
      toValue: newState ? 0 : -width * 0.75,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: ROUTES.DASHBOARD.PRINCIPAL.ENTIRE_PATH,
      icon: "dashboard" as const,
    },
    {
      name: ROUTES.DASHBOARD.COTIZACIONES.ALL.NAME,
      path: ROUTES.DASHBOARD.COTIZACIONES.ALL.ENTIRE_PATH,
      icon: "request-quote" as const,
    },
    {
      name: ROUTES.DASHBOARD.MESSAGES.ALL.NAME,
      path: ROUTES.DASHBOARD.MESSAGES.ALL.ENTIRE_PATH,
      icon: "message" as const,
    },
    {
      name: ROUTES.DASHBOARD.PRODUCTS.ALL.NAME,
      path: ROUTES.DASHBOARD.PRODUCTS.ALL.ENTIRE_PATH,
      icon: "shopping-cart" as const,
    },
    {
      name: ROUTES.DASHBOARD.CATEGORIES.ALL.NAME,
      path: ROUTES.DASHBOARD.CATEGORIES.ALL.ENTIRE_PATH,
      icon: "category" as const,
    },
    {
      name: ROUTES.DASHBOARD.USERS.ALL.NAME,
      path: ROUTES.DASHBOARD.USERS.ALL.ENTIRE_PATH,
      icon: "group" as const,
    },
  ];

  return (
    <>
      <TouchableOpacity style={styles.menuBtn} onPress={toggleSidebar}>
        <MaterialIcons name="menu" size={28} color={COLORS.WHITE} />
      </TouchableOpacity>

      {open && (
        <TouchableOpacity style={styles.overlay} onPress={toggleSidebar} />
      )}

      <Animated.View style={[styles.sidebar, { transform: [{ translateX }] }]}>
        {/* Profile */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=68" }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{usuario}</Text>
          <Text style={styles.role}>{role}</Text>
        </View>

        {/* Line */}
        <View style={styles.separator} />

        {/* Menu */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => {
            const isActive = pathname.includes(item.path);
            return (
              <Link key={item.path} href={item.path} asChild>
                <TouchableOpacity
                  style={[styles.menuItem, isActive && styles.activeItem]}
                  onPress={toggleSidebar}
                >
                  <View style={styles.row}>
                    <MaterialIcons
                      name={item.icon}
                      size={22}
                      color={isActive ? COLORS.PRIMARY : COLORS.WHITE}
                    />
                    <Text
                      style={[
                        styles.menuText,
                        isActive && { color: COLORS.WHITE },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Link>
            );
          })}
        </View>

        {/* Line */}
        <View style={styles.separator} />

        {/* Sign Out */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Sign out</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}
