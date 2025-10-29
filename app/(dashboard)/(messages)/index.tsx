import MapCard from "@/components/dashboard/mapcard/mapcard";
import {
  Action,
  Column,
  DashboardTable,
} from "@/components/dashboard/table/table";
import { MensajeDashboardDTO } from "@/models/Mensaje/Mensaje_response_dto";
import { PaginatedResponse } from "@/services/global.interfaces";
import { getAllMensajes } from "@/services/mensajes.service";
import { ROUTES } from "@/utils/routes";
import { truncateText } from "@/utils/utils.text";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Messages() {
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [mensajes, setMensajes] =
    useState<PaginatedResponse<MensajeDashboardDTO>>();

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async (page: number = 0) => {
    setLoading(true);
    try {
      const res = await getAllMensajes(page);
      setMensajes(res);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const columns: Column<MensajeDashboardDTO>[] = [
    { header: "ID", accessor: "id", columnWidth: 50 },
    {
      header: "Tipo",
      accessor: "tipo",
      columnWidth: 150,
      render: (_, row) => {
        return <MapCard property="tipoMensaje" value={row.tipo} />;
      },
    },
    {
      header: "Mensaje",
      accessor: "mensaje",
      textAlign: "left",
      columnWidth: 220,
      render: (_, row) => truncateText(row.mensaje, 10),
    },
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
      columnWidth: 150,
      render: (_, row) => {
        return <MapCard property="estadoMensaje" value={row.estado} />;
      },
    },
  ];

  const actions: Action<MensajeDashboardDTO>[] = [
    {
      label: "Ver Detalle",
      onPress: (row) =>
        router.push(ROUTES.DASHBOARD.MESSAGES.DETAIL.GO(row.id)),
    },
    {
      label: "Eliminar",
      onPress: (row) => console.log("Eliminar mensaje:", row.id),
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
        Mensajes
      </Text>

      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <DashboardTable<MensajeDashboardDTO>
          columns={columns}
          data={mensajes?.content ?? []}
          actions={actions}
          currentPage={mensajes?.number ?? 0}
          totalPages={totalPages}
          onPageChange={fetchAll}
        />
      )}
    </View>
  );
}
