import { obtenerNuevoToken } from "@/services/auht.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL_API } from "./constants";

const api = axios.create({
  baseURL: URL_API,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(async (config) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// REFRESH CONTROL
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const status = error.response?.status;

    if (
      (status === 401 || status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh-token")
    ) {
      originalRequest._retry = true;

      const refreshToken = await AsyncStorage.getItem("refreshToken");

      if (!refreshToken) return Promise.reject(error);

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const res = await obtenerNuevoToken(refreshToken);

          const newAccess = res.accessToken;
          const newRefresh = res.refreshToken;

          await AsyncStorage.setItem("accessToken", newAccess);
          await AsyncStorage.setItem("refreshToken", newRefresh);

          isRefreshing = false;
          onRefreshed(newAccess);
        } catch (err) {
          isRefreshing = false;
          return Promise.reject(err);
        }
      }

      return new Promise((resolve) => {
        refreshSubscribers.push((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
