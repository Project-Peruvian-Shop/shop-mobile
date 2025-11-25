import axios, { AxiosHeaders } from "axios";
import { obtenerNuevoToken } from "../services/auht.service";
import {
  agregarAuthToken,
  obtenerAuthToken,
  obtenerRefreshToken,
} from "../utils/auth";
import { URL_API } from "./constants";

// Si usas ENV:
const API_URL = URL_API;

const api = axios.create({
  baseURL: API_URL,
});

// -------------------------------
// 🔹 Interceptor de REQUEST
// -------------------------------
api.interceptors.request.use(async (config) => {
  const token = await obtenerAuthToken();

  if (!config.headers) {
    config.headers = new AxiosHeaders();
  }

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

// -------------------------------
// 🔹 Interceptor de RESPONSE
// -------------------------------
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token expirado
    if (
      (error.response?.status === 401 ||
        error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = await obtenerRefreshToken();

        if (!refreshToken) {
          console.warn("No hay refresh token, navegando al login...");
          redirectToLogin();
          return Promise.reject(error);
        }

        // Obtener nuevo access token
        const newToken = await obtenerNuevoToken(refreshToken);

        await agregarAuthToken(newToken.accessToken);

        // Reintentar con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`;

        return api(originalRequest);
      } catch (e) {
        console.log("No se pudo refrescar el token", e);
        redirectToLogin();
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

// -------------------------------
// 🔹 Función auxiliar para navegar al login
// -------------------------------
let navigationRef: any = null;

export function setNavigationRef(navigation: any) {
  navigationRef = navigation;
}

function redirectToLogin() {
  if (navigationRef) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  } else {
    console.error(
      "navigationRef no está configurado. Llama setNavigationRef() en App.tsx"
    );
  }
}

export default api;
