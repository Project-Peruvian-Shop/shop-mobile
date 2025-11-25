import { TitlePage } from "@/components/app/titlepage/titlepage";
import MapCard from "@/components/dashboard/mapcard/mapcard";
import {
  Action,
  Column,
  DashboardTable,
} from "@/components/dashboard/table/table";
import { CotizacionDashboardDTO } from "@/models/Cotizacion/Cotizacion_response_dto";
import { getCotizacionesByUserPaginated } from "@/services/cotizacion.service";
import { PaginatedResponse } from "@/services/global.interfaces";
import { obtenerUsuario } from "@/utils/auth";
import { agregarProductosCotizacionAlCarrito } from "@/utils/cartStorage";
import { COLORS } from "@/utils/colors";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cotizaciones() {
  const [cotizaciones, setCotizaciones] =
    useState<PaginatedResponse<CotizacionDashboardDTO>>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  useEffect(() => {
    const fetchAll = async () => {
      const localUser = await obtenerUsuario();
      if (!localUser) {
        router.push("Login" as never);
        return;
      }

      setLoading(true);
      try {
        const res = await getCotizacionesByUserPaginated(localUser.id, page);
        setCotizaciones(res);
        setTotalPages(res.totalPages);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [page]);

  // columnas
  const columns: Column<CotizacionDashboardDTO>[] = [
    { header: "Número", accessor: "numeroCotizacion" },
    {
      header: "Fecha",
      accessor: "creacion",
      render: (value) => {
        const fecha = new Date(value as string);
        return (
          <Text>
            {fecha.toLocaleDateString("es-PE", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </Text>
        );
      },
    },
    {
      header: "Estado",
      accessor: "estado",
      render: (value) => (
        <MapCard property="estadoCotizacion" value={value as string} />
      ),
    },
  ];

  // acciones de la tabla
  const actions: Action<CotizacionDashboardDTO>[] = [
    {
      label: "Ver",
      onPress: (row) => {
        router.push(ROUTES.PROFILE.COTIZACIONDETAIL.GO(row.id));
      },
    },
    {
      label: "Volver a Cotizar",
      onPress: async (row) => {
        await agregarProductosCotizacionAlCarrito(row.numeroCotizacion, row.id);
      },
    },
  ];

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
      <TitlePage title="Mis Cotizaciones" />
      <ScrollView style={styles.container}>
        <View style={styles.tableContainer}>
          {loading ? (
            <Text>Cargando...</Text>
          ) : (
            <DashboardTable
              columns={columns}
              data={cotizaciones?.content ?? []}
              actions={actions}
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              router.push(ROUTES.PROFILE.PROFILE.ENTIRE_PATH);
            }}
          >
            <Text style={styles.Label}>Volver al Perfil</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F6F7",
  },
  tableContainer: {},
  Button: {
    width: "100%",
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    alignItems: "center",
  },

  Label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  containerButton: {
    marginHorizontal: 50,
    marginBottom: 50,
  },
});
