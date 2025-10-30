import MapCard from "@/components/dashboard/mapcard/mapcard";
import { SearchBar } from "@/components/dashboard/search/search";
import {
  Action,
  Column,
  DashboardTable,
} from "@/components/dashboard/table/table";
import { UsuarioDashboardDTO } from "@/models/Usuario/Usuario_response_dto";
import { PaginatedResponse } from "@/services/global.interfaces";
import { getAllUsuarios } from "@/services/usuario.service";
import { ROUTES } from "@/utils/routes";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Users() {
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [usuarios, setUsuarios] =
    useState<PaginatedResponse<UsuarioDashboardDTO>>();

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async (page: number = 0) => {
    setLoading(true);
    try {
      const res = await getAllUsuarios(page);
      setUsuarios(res);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const columns: Column<UsuarioDashboardDTO>[] = [
    {
      header: "ID",
      accessor: "id",
      columnWidth: 50,
      textAlign: "center",
      sticky: true,
    },
    {
      header: "Nombre",
      accessor: "nombre",
      columnWidth: 120,
      textAlign: "left",
      render: (_, row) => `${row.nombre} ${row.apellidos}`,
    },
    { header: "Email", accessor: "email", columnWidth: 180 },
    { header: "Teléfono", accessor: "telefono", columnWidth: 120 },
    {
      header: "Rol",
      accessor: "rol",
      columnWidth: 120,
      render: (_, row) => {
        return <MapCard property="rolUsuario" value={row.rol} />;
      },
    },
  ];

  const actions: Action<UsuarioDashboardDTO>[] = [
    {
      label: "Editar",
      onPress: (row) => router.push(ROUTES.DASHBOARD.USERS.DETAIL.GO(row.id)),
    },
    {
      label: "Eliminar",
      onPress: (row) => console.log("Eliminar usuario:", row.id),
    },
  ];

  return (
    <View style={{ flex: 1, paddingHorizontal: 12, paddingVertical: 20 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        Usuarios
      </Text>

      <SearchBar
        placeholder="Buscar cotizaciones..."
        value=""
        onChangeText={() => {}}
      />

      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <DashboardTable<UsuarioDashboardDTO>
          columns={columns}
          data={usuarios?.content ?? []}
          actions={actions}
          currentPage={usuarios?.number ?? 0}
          totalPages={totalPages}
          onPageChange={fetchAll}
        />
      )}
    </View>
  );
}
