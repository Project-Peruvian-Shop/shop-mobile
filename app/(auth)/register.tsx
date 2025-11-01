import { CustomInput } from "@/components/login/input/input";
import { COLORS } from "@/utils/colors";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crea una cuenta</Text>
      <Text style={styles.subtitle}>
        Crea una nueva cuenta para comenzar y disfrutar de un acceso sin
        interrupciones a nuestras funciones.
      </Text>

      <CustomInput placeholder="Nombre" value={name} onChangeText={setName} />
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
      <CustomInput
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Crear Cuenta</Text>
      </TouchableOpacity>

      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>¿Ya tienes una cuenta? </Text>
        <TouchableOpacity
          onPress={() => router.replace(ROUTES.AUTH.LOGIN.ENTIRE_PATH)}
        >
          <Text style={styles.link}>Inicia Sesión aquí</Text>
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
