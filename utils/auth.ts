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

export const obtenerUsuario =  async () => {
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

export const agregarAuthToken = (accessToken: string) => {
  AsyncStorage.setItem("authToken", accessToken);
};

export const obtenerAuthToken = () => {
  return AsyncStorage.getItem("authToken");
};

export const eliminarAuthToken = () => {
  AsyncStorage.removeItem("authToken");
};

// =============================
// REFRESH TOKEN
// =============================

export const agregarRefreshToken = (refreshToken: string) => {
  AsyncStorage.setItem("refreshToken", refreshToken);
};

export const obtenerRefreshToken = () => {
  return AsyncStorage.getItem("refreshToken");
};

export const eliminarRefreshToken = () => {
  AsyncStorage.removeItem("refreshToken");
};



