import { Icons } from "@/assets/images/icons";
import { AlertCustom } from "@/components/app/Alert/alertCustom";
import { CustomInput } from "@/components/login/input/input";
import { register } from "@/services/auht.service";
import { agregarUsuario } from "@/utils/auth";
import { COLORS } from "@/utils/colors";
import { ROUTES } from "@/utils/routes";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
        nombre: name.trim(),
        apellidos: lastName.trim(),
        email: email.trim(),
        telefono: phone.trim(),
        passwordd: password.trim(),
      };

      const response = await register(body);

      if (response) {
        // Guardar usuario en AsyncStorage
        await agregarUsuario(response);
        setAlert({
          visible: true,
          title: "Registro exitoso",
          message: "Has creado tu cuenta correctamente ",
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

      <Text style={styles.title}>Crea una cuenta</Text>
      <Text style={styles.subtitle}>
        Crea una nueva cuenta para comenzar y disfrutar de un acceso sin
        interrupciones a nuestras funciones.
      </Text>

      <CustomInput placeholder="Nombre" value={name} onChangeText={setName} />
      <CustomInput
        placeholder="Apellido"
        value={lastName}
        onChangeText={setLastName}
      />
      <CustomInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Teléfono"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
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

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.WHITE} />
        ) : (
          <Text style={styles.buttonText}>Crear Cuenta</Text>
        )}
      </TouchableOpacity>

      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>¿Ya tienes una cuenta? </Text>
        <TouchableOpacity
          onPress={() => router.replace(ROUTES.AUTH.LOGIN.ENTIRE_PATH)}
        >
          <Text style={styles.link}>Inicia Sesión aquí</Text>
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
    width: 160,
    height: 160,
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
