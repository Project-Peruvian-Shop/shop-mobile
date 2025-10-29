import {
  Action,
  Column,
  DashboardTable,
} from "@/components/dashboard/table/table";
import { CotizacionDashboardDTO } from "@/models/Cotizacion/Cotizacion_response_dto";
import { getAllCotizaciones } from "@/services/cotizacion.service";
import { PaginatedResponse } from "@/services/global.interfaces";
import { ROUTES } from "@/utils/routes";
import { truncateText } from "@/utils/utils.text";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Cotizaciones() {
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [cotizaciones, setCotizaciones] =
    useState<PaginatedResponse<CotizacionDashboardDTO>>();

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async (page: number = 0) => {
    setLoading(true);
    try {
      const res = await getAllCotizaciones(page);
      setCotizaciones(res);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const columns: Column<CotizacionDashboardDTO>[] = [
    { header: "ID", accessor: "id", columnWidth: 60, textAlign: "center" },
    { header: "N° Cotización", accessor: "numeroCotizacion", columnWidth: 140 },
    { header: "Cliente", accessor: "clienteNombre", textAlign: "left" },
    { header: "Documento", accessor: "clienteDocumento", columnWidth: 120 },
    {
      header: "Fecha",
      accessor: "creacion",
      columnWidth: 140,
      render: (_, row) => {
        const date = new Date(row.creacion);
        return <Text>{date.toLocaleDateString()}</Text>;
      },
    },
    {
      header: "Estado",
      accessor: "estado",
      columnWidth: 100,
      render: (_, row) => (
        <Text
          style={{
            color:
              row.estado === "APROBADA"
                ? "green"
                : row.estado === "RECHAZADA"
                ? "red"
                : "orange",
            fontWeight: "600",
          }}
        >
          {row.estado}
        </Text>
      ),
    },
    {
      header: "Comentario",
      accessor: "comentario",
      textAlign: "left",
      columnWidth: 200,
      render: (_, row) => truncateText(row.comentario, 10),
    },
    {
      header: "Observaciones",
      accessor: "observaciones",
      textAlign: "left",
      columnWidth: 200,
      render: (_, row) =>
        row.observaciones ? (
          truncateText(row.observaciones, 10)
        ) : (
          <Text>-</Text>
        ),
    },
  ];

  const actions: Action<CotizacionDashboardDTO>[] = [
    {
      label: "Ver Detalle",
      onPress: (row) =>
        router.push(ROUTES.DASHBOARD.COTIZACIONES.DETAIL.GO(row.id)),
    },
    {
      label: "Eliminar",
      onPress: (row) => console.log("Eliminar cotización:", row.id),
    },
  ];

  return (
    <View style={{ paddingHorizontal: 12, paddingVertical: 20 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        Cotizaciones
      </Text>

      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <DashboardTable<CotizacionDashboardDTO>
          columns={columns}
          data={cotizaciones?.content ?? []}
          actions={actions}
          currentPage={cotizaciones?.number ?? 0}
          totalPages={totalPages}
          onPageChange={fetchAll}
        />
      )}
    </View>
  );
}
