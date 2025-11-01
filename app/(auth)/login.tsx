import { CustomInput } from "@/components/login/input/input";
import { COLORS } from "@/utils/colors";
import { ROUTES } from "@/utils/routes";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.logo}
        contentFit="contain"
      />

      <Text style={styles.title}>Inicia Sesión</Text>
      <Text style={styles.subtitle}>
        Ingresa tu correo electrónico y contraseña para acceder a tu cuenta de
        forma segura.
      </Text>

      <CustomInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>¿No tienes una cuenta? </Text>
        <TouchableOpacity
          onPress={() => router.replace(ROUTES.AUTH.REGISTER.ENTIRE_PATH)}
        >
          <Text style={styles.link}>Regístrate aquí</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6f8",
    padding: 24,
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.BLACK,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.GRAY,
    marginBottom: 24,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: "600",
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  bottomText: {
    color: COLORS.GRAY,
  },
  link: {
    color: COLORS.PRIMARY,
    fontWeight: "600",
  },
});
