import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TitlePage } from "@/components/app/titlepage/titlepage";

import {
  obtenerUsuario
} from "@/utils/auth";

//import { obtenerNuevoToken } from "@/services/auht.service";
import { Icons } from "@/assets/images/icons";
import { CotizacionDashboardDTO } from "@/models/Cotizacion/Cotizacion_response_dto";
import { UsuarioProfileDTO } from "@/models/Usuario/Usuario_response_dto";
import { getCotizacionesByUserPaginated } from "@/services/cotizacion.service";
import { PaginatedResponse } from "@/services/global.interfaces";
import { getProfile } from "@/services/usuario.service";
import { COLORS } from "@/utils/colors";

export default function Profile() {
  const router = useRouter();

  // Estados
  const [fechaHora, setFechaHora] = useState(new Date());
  const [usuario, setUsuario] = useState<UsuarioProfileDTO | null>(null);
  const [cotizaciones, setCotizaciones] = useState<PaginatedResponse<CotizacionDashboardDTO>>();
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // ------------------------------
  // REFRESCAR TOKEN
  // ------------------------------
 /* const checkAndRefreshToken = async (refreshToken: string) => {
    try {
      const newToken = await obtenerNuevoToken(refreshToken);

      agregarAuthToken(newToken.accessToken);
      agregarRefreshToken(newToken.refreshToken);

      agregarUsuario({
        ...obtenerUsuario(),
        accessToken: newToken.accessToken,
        refreshToken: newToken.refreshToken,
      });
    } catch (error) {
      alert("Sesión expirada. Inicia sesión nuevamente.");
      router.push("/login");
    }
  }; */

  // ------------------------------
  // ACTUALIZAR HORA CADA SEGUNDO
  // ------------------------------
  useEffect(() => {
    const interval = setInterval(() => setFechaHora(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // ------------------------------
  // CARGAR DATOS DEL USUARIO
  // ------------------------------
  useEffect(() => {
    const fetchData = async () => {
      const localUser = await obtenerUsuario();
      if (!localUser) {
        router.push("/login");
        return;
      }

      setLoading(true);
      try {
        //await checkAndRefreshToken(localUser.refreshToken);

        const updatedUser =  await obtenerUsuario();
        const [userData, cotData] = await Promise.all([
          getProfile(updatedUser.id),
          getCotizacionesByUserPaginated(updatedUser.id, page, 5),
        ]);

        setUsuario(userData);
        setCotizaciones(cotData);
        setTotalPages(cotData.totalPages);
      } catch (err) {
        console.log("error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  // ------------------------------
  // MAPEAR ROL
  // ------------------------------
  const mapperRol = (rol?: string) => {
    switch (rol) {
      case "ROLE_SUPERADMIN":
        return "Super Usuario";
      case "ROLE_ADMINISTRADOR":
        return "Administrador";
      case "ROLE_SUPERVISOR":
        return "Supervisor";
      case "ROLE_CLIENTE":
        return "Cliente";
      default:
        return "Desconocido";
    }
  };

    return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitlePage title="Mi Perfil" />

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {/* ---- COLUMNA IZQUIERDA ---- */}
          <View style={styles.left}>
            {/* Datos personales */}
            <View style={styles.personal}>
              <View style={styles.nameContainer}>
                <Image
                  source={Icons.userProfileIcon}
                  style={styles.logo}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{usuario?.nombre ?? "Cargando..."}</Text>
                  <Text style={styles.tipo}>{mapperRol(usuario?.rol)}</Text>
                </View>
              </View>

              <View style={styles.datetime}>
                <Text>Fecha: {fechaHora.toLocaleDateString()}</Text>
                <Text>Hora: {fechaHora.toLocaleTimeString()}</Text> 
              </View>
          
              <Text style={styles.label}>Correo</Text>
              <Text style={styles.email}>{usuario?.email ?? "Cargando..."}</Text>

              <Text style={styles.label}>Teléfono</Text>
              <Text style={styles.phone}>{usuario?.telefono ?? "Cargando..."}</Text>
            </View>
          </View>

          {/* ---- COLUMNA DERECHA ---- */}
          <View style={styles.right}>
            <Text style={styles.title}>Cotizaciones anteriores</Text>

            {/* Render seguro */}
            {cotizaciones === undefined ? (
              <Text style={{ marginTop: 10 }}>Cargando cotizaciones...</Text>
            ) : cotizaciones.content.length === 0 ? (
              <Text style={{ marginTop: 10 }}>
                No tienes cotizaciones registradas.
              </Text>
            ) : (
              cotizaciones.content.map((coti) => (
                <View key={coti.id} style={styles.cotizacionCard}>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    {coti.numeroCotizacion}
                  </Text>
                  <Text>Estado: {coti.estado}</Text>
                  <Text>Fecha: {coti.creacion}</Text>
                </View>
              ))
            )}

            {/* Paginación */}
            <View style={styles.pagination}>
              <Text
                onPress={() => page > 0 && setPage(page - 1)}
                style={{ color: COLORS.PRIMARY }}
              >
                {"< Anterior"}
              </Text>

              <Text
                onPress={() => page + 1 < totalPages && setPage(page + 1)}
                style={{ color: COLORS.PRIMARY }}
              >
                {"Siguiente >"}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "95%",
    marginVertical: 20,
    alignSelf: "center",
    gap: 20,
    flexWrap: "wrap",
  },

  left: {
    width: "45%",
    minWidth: 300,
  },

  right: {
    width: "45%",
    minWidth: 300,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    padding: 20,
    flexDirection: "column",
    gap: 16,
    maxHeight: 450,
  },

  title: {
    fontWeight: "600",
    fontSize: 18,
    color: COLORS.SECONDARY,
  },

  personal: {
    padding: 25,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    flexDirection: "column",
    gap: 16,
  },

  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  textContainer: {
    flexDirection: "column",
  },

  name: {
    fontWeight: "bold",
    fontSize: 18,
  },

  tipo: {
    fontSize: 14,
    color: "#666",
  },

  datetime: {
    flexDirection: "column",
    alignItems: "flex-end",
    fontSize: 14,
  },

  label: {
    marginTop: 20,
    fontWeight: "600",
    fontSize: 16,
  },

  email: {
    fontSize: 16,
  },

  phone: {
    fontSize: 16,
    marginBottom: 20,
  },

  cotizacionCard: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginTop: 10,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
});