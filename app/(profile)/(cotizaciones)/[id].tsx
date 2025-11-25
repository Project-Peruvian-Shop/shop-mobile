import { InfoCard } from "@/components/app/infocard/InfoCard";
import ResponseCard from "@/components/app/responseCard/ResponseCard";
import { TitlePage } from "@/components/app/titlepage/titlepage";
import MapCard from "@/components/dashboard/mapcard/mapcard";
import { ProductListCard2 } from "@/components/productlistcard/ProductListCard";
import {
  getCotizacionById,
  getHistorialCambiosEstado,
  getProductosByCotizacionId,
} from "@/services/cotizacion.service";
import { COLORS } from "@/utils/colors";
import { ROUTES } from "@/utils/routes";
import { useRoute } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type EstadoStatus = "enviada" | "aceptada" | "rechazada";

interface EstadoType {
  estado: EstadoStatus;
  remitente: string;
  fechaEnvio: string;
}

export default function CotizacionDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const router = useRouter();
  const { id } = route.params as { id: string };

  const [cotizacion, setCotizacion] = useState<any>(null);
  const [productos, setProductos] = useState<any>();
  const [page, setPage] = useState(0);
  const [estado, setEstado] = useState<EstadoType | null>(null);
  const fetchData = async () => {
    try {
      const [data, productosData, historialEstado] = await Promise.all([
        getCotizacionById(Number(id)),
        getProductosByCotizacionId(Number(id), page),
        getHistorialCambiosEstado(Number(id)),
      ]);

      setCotizacion(data);
      setProductos(productosData);

      const nuevoEstado = obtenerEstadoEnvio(historialEstado);
      if (nuevoEstado) setEstado(nuevoEstado);
    } catch (error) {
      console.error("Error al obtener cotización:", error);
      navigation.navigate("ProfileUser" as never);
    }
  };
  useEffect(() => {
    if (!id) {
      navigation.navigate("Shop" as never);
      return;
    }
    fetchData();
  }, [id, page]);

  function obtenerEstadoEnvio(historial: any[]): EstadoType | null {
    // tomar el último cambio de estado válido
    const ultimo = historial
      .filter((h) =>
        ["ENVIADA", "ACEPTADA", "RECHAZADA"].includes(h.estadoNuevo)
      )
      .sort(
        (a, b) =>
          new Date(b.fechaCambio).getTime() - new Date(a.fechaCambio).getTime()
      )[0];

    if (!ultimo) return null;

    return {
      estado: ultimo.estadoNuevo.toLowerCase() as EstadoStatus,
      remitente: ultimo.usuarioNombre,
      fechaEnvio: ultimo.fechaCambio,
    };
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
      <TitlePage title={`Cotización ${cotizacion?.numero}`} />
      <FlatList
        data={[]} // lista vacía
        keyExtractor={() => "header"}
        renderItem={null}
        ListHeaderComponent={
          <View style={styles.container}>
            <View style={styles.section}>
              <InfoCard
                title="Datos de la Cotización"
                items={[
                  {
                    label: "Número de cotización:",
                    value: cotizacion?.numero || "",
                  },
                  {
                    label: "Estado:",
                    value: (
                      <MapCard
                        property="estadoCotizacion"
                        value={cotizacion?.estado || ""}
                      />
                    ),
                  },
                  {
                    label: "Fecha de cotización:",
                    value: cotizacion?.creacion
                      ? new Date(cotizacion.creacion).toLocaleDateString(
                          "es-PE"
                        )
                      : "",
                  },
                  {
                    label: "Comentario:",
                    value: cotizacion?.comentario || "-",
                  },
                ]}
              />

              <InfoCard
                title="Datos de contacto"
                items={[
                  {
                    label: "Nº documento:",
                    value: cotizacion
                      ? `${cotizacion.tipoDocumento ?? ""}${
                          cotizacion.documento
                            ? " - " + cotizacion.documento
                            : ""
                        }`
                      : "",
                  },
                  { label: "Cliente:", value: cotizacion?.cliente || "" },
                  { label: "Email:", value: cotizacion?.email || "" },
                  { label: "Teléfono:", value: cotizacion?.telefono || "" },
                ]}
              />
            </View>

            <ProductListCard2
              title="Productos de la cotización"
              items={productos?.content || []}
              currentPage={productos?.number || 0}
              totalPages={productos?.totalPages || 1}
              onPageChange={setPage}
            />

            <View style={styles.card}>
              {cotizacion?.cotizacionEnlace && estado ? (
                <ResponseCard
                  data={{
                    id: cotizacion.id,
                    cotizacionId: cotizacion.numero.toString(),
                    clientName: estado.remitente,
                    date: estado.fechaEnvio,
                    status: estado.estado,
                    fileName: cotizacion.cotizacionEnlace,
                  }}
                  onStateChange={() => {
                    setPage(0); // si tienes paginación
                    fetchData(); // vuelve a traer todo
                  }}
                />
              ) : (
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.titlePDF}>Sin respuesta aún</Text>
                  <Text style={styles.textMuted}>
                    No hay respuesta de cotización disponible.
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.containerButton}>
              <TouchableOpacity
                style={styles.pdfButton}
                onPress={() => {
                  router.push(ROUTES.PROFILE.PROFILE.ENTIRE_PATH);
                }}
              >
                <Text style={styles.pdfLabel}>Volver al Perfil</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F7",
    padding: 16,
  },
  section: {
    marginVertical: 16,
  },
  card: {
    marginTop: 20,
    padding: 50,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 3,
  },
  textMuted: {
    color: COLORS.GRAY,
    textAlign: "center",
  },
  titlePDF: {
    marginTop: 16,
    marginBottom: 12,
    color: COLORS.SECONDARY,
    fontSize: 20,
    fontWeight: "bold",
  },
  pdfButton: {
    width: "100%",
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    alignItems: "center",
  },

  pdfLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  containerButton: {
    marginHorizontal: 50,
    marginTop: 20,
    marginBottom: 50,
  },
});
