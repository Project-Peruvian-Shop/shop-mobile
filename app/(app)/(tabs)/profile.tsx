import { TitlePage } from "@/components/app/titlepage/titlepage";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "expo-router";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
      <TitlePage title="Perfil" />

      <Button
        title="Mi perfil"
        onPress={() => {
          router.push(ROUTES.PROFILE.PROFILE.ENTIRE_PATH);
        }}
      />

      <Button
        title="Mis cotizaciones"
        onPress={() => {
          router.push(ROUTES.PROFILE.COTIZACIONES.ENTIRE_PATH);
        }}
      />

      <Button
        title="¿Quiénes somos?"
        onPress={() => {
          router.push(ROUTES.LANDING.ABOUT.ENTIRE_PATH);
        }}
      />

      <Button
        title="Preguntas frecuentes"
        onPress={() => {
          router.push(ROUTES.LANDING.FAQ.ENTIRE_PATH);
        }}
      />

      <Button
        title="Contáctanos"
        onPress={() => {
          router.push(ROUTES.LANDING.CONTACT.ENTIRE_PATH);
        }}
      />

      <Button
        title="Libro de reclamaciones"
        onPress={() => {
          router.push(ROUTES.LANDING.CLAIMS.ENTIRE_PATH);
        }}
      />

      <Button
        title="Términos y condiciones"
        onPress={() => {
          router.push(ROUTES.LANDING.TERMS.ENTIRE_PATH);
        }}
      />

      <Button
        title="Política de privacidad"
        onPress={() => {
          router.push(ROUTES.LANDING.PRIVACY.ENTIRE_PATH);
        }}
      />
    </SafeAreaView>
  );
}
