import { TitlePage } from "@/components/app/titlepage/titlepage";
import { COLORS } from "@/utils/colors";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function More() {
  const router = useRouter();

  const menuItems = [
    { title: "Mi perfil", route: ROUTES.PROFILE.PROFILE.ENTIRE_PATH },
    {
      title: "Mis cotizaciones",
      route: ROUTES.PROFILE.COTIZACIONES.ENTIRE_PATH,
    },
    { title: "¿Quiénes somos?", route: ROUTES.LANDING.ABOUT.ENTIRE_PATH },
    { title: "Preguntas frecuentes", route: ROUTES.LANDING.FAQ.ENTIRE_PATH },
    { title: "Contáctanos", route: ROUTES.LANDING.CONTACT.ENTIRE_PATH },
    {
      title: "Libro de reclamaciones",
      route: ROUTES.LANDING.CLAIMS.ENTIRE_PATH,
    },
    {
      title: "Términos y condiciones",
      route: ROUTES.LANDING.TERMS.ENTIRE_PATH,
    },
    {
      title: "Política de privacidad",
      route: ROUTES.LANDING.PRIVACY.ENTIRE_PATH,
    },
  ];

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: COLORS.WHITE }}
    >
      <TitlePage title="Más opciones" />

      <ScrollView contentContainerStyle={styles.container}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            activeOpacity={0.6}
            onPress={() => router.push(item.route)}
          >
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          activeOpacity={0.6}
          onPress={() => console.log("Cerrar sesión")}
        >
          <Text style={[styles.text, styles.logoutText]}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  button: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: COLORS.WHITE,
  },
  text: {
    color: COLORS.SECONDARY,
    fontSize: 16,
    textAlign: "left",
  },
  logoutButton: {
    borderTopColor: "#eee",
  },
  logoutText: {
    color: COLORS.PRIMARY,
    fontWeight: "600",
  },
});
