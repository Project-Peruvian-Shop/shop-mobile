import { Icons } from "@/assets/images/icons";
import { AlertCustom } from "@/components/app/Alert/alertCustom";
import { CustomInput } from "@/components/login/input/input";
import { login } from "@/services/auht.service";
import { agregarAuthToken, agregarRefreshToken, agregarUsuario } from "@/utils/auth";
import { COLORS } from "@/utils/colors";
import { ROUTES } from "@/utils/routes";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    visible: false,
    title: "",
    message: "",
    image: null as any,
  });

  const router = useRouter();

  const handleSubmit = async () => {
    /*
    setErrors({});

    let newErrors: { email?: string; passwordd?: string } = {};

    // Validación email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Ingresa un correo válido";
    }

    // Validación contraseña
    if (passwordd.trim().length < 8) {
      newErrors.passwordd = "La contraseña debe tener al menos 8 caracteres";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
      */

    if (loading) return;
    setLoading(true);

    try {
      const body = {
        email: email.trim(),
        passwordd: password.trim(),
      };

      const response = await login(body);

      if (response) {
        // Guardar usuario en AsyncStorage
        await agregarUsuario(response);
        await agregarAuthToken(response.accessToken);
        await agregarRefreshToken(response.refreshToken);
        setAlert({
          visible: true,
          title: "Inicio de sesión exitoso",
          message: "Has iniciado sesión correctamente ",
          image: Icons.successIcon,
        });
        // redirige después de 1 seg
        setTimeout(() => {
          router.replace(ROUTES.PROFILE.PROFILE.ENTIRE_PATH);
        }, 1000);
      }
    } catch (err: any) {
      setAlert({
        visible: true,
        title: "Error al iniciar sesión",
        message: err.message || "Ocurrió un error inesperado.",
        image: Icons.errorIcon,
      });
      console.error("Error en login:", err);
    } finally {
      setLoading(false);
    }
  };

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

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        )}
      </TouchableOpacity>

      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>¿No tienes una cuenta? </Text>
        <TouchableOpacity
          onPress={() => router.replace(ROUTES.AUTH.REGISTER.ENTIRE_PATH)}
        >
          <Text style={styles.link}>Regístrate aquí</Text>
        </TouchableOpacity>
      </View>
      {alert.visible && (
        <AlertCustom
          visible={alert.visible}
          title={alert.title}
          message={alert.message}
          image={alert.image}
          onClose={() =>
            setAlert({ visible: false, title: "", message: "", image: null })
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginTop: 20,
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
