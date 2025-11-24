import AsyncStorage from "@react-native-async-storage/async-storage";
import type { UsuarioResponseDto } from "../models/Usuario/Usuario_response_dto";

// =============================
// USUARIO
// =============================

export const agregarUsuario = async (usuario: UsuarioResponseDto) => {
  try {
    await AsyncStorage.setItem("usuario", JSON.stringify(usuario));
  } catch (error) {
    console.error("Error guardando usuario:", error);
  }
};

export const obtenerUsuario = async (): Promise<UsuarioResponseDto | null> => {
  try {
    const usuario = await AsyncStorage.getItem("usuario");
    return usuario ? JSON.parse(usuario) : null;
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    return null;
  }
};

export const eliminarUsuario = async () => {
  try {
    await AsyncStorage.removeItem("usuario");
  } catch (error) {
    console.error("Error eliminando usuario:", error);
  }
};

// =============================
// ACCESS TOKEN
// =============================

export const agregarAuthToken = async (accessToken: string) => {
  try {
    await AsyncStorage.setItem("authToken", accessToken);
  } catch (error) {
    console.error("Error guardando authToken:", error);
  }
};

export const obtenerAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem("authToken");
  } catch (error) {
    console.error("Error obteniendo authToken:", error);
    return null;
  }
};

export const eliminarAuthToken = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
  } catch (error) {
    console.error("Error eliminando authToken:", error);
  }
};

// =============================
// REFRESH TOKEN
// =============================

export const agregarRefreshToken = async (refreshToken: string) => {
  try {
    await AsyncStorage.setItem("refreshToken", refreshToken);
  } catch (error) {
    console.error("Error guardando refreshToken:", error);
  }
};

export const obtenerRefreshToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem("refreshToken");
  } catch (error) {
    console.error("Error obteniendo refreshToken:", error);
    return null;
  }
};

export const eliminarRefreshToken = async () => {
  try {
    await AsyncStorage.removeItem("refreshToken");
  } catch (error) {
    console.error("Error eliminando refreshToken:", error);
  }
};
