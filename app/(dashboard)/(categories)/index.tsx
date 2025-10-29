import {
  Action,
  Column,
  DashboardTable,
} from "@/components/dashboard/table/table";
import { CategoriaDashboardDTO } from "@/models/Categoria/Categoria_response";
import { getAllCategories } from "@/services/categoria.service";
import { PaginatedResponse } from "@/services/global.interfaces";
import { ROUTES } from "@/utils/routes";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Categories() {
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const [categorias, setCategorias] =
    useState<PaginatedResponse<CategoriaDashboardDTO>>();

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async (page: number = 0) => {
    setLoading(true);
    try {
      const res = await getAllCategories(page);
      setCategorias(res);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const columns: Column<CategoriaDashboardDTO>[] = [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Categoría", accessor: "norma" },
    { header: "Usos", accessor: "usos" },
  ];

  const actions: Action<CategoriaDashboardDTO>[] = [
    {
      label: "Editar",
      // Abrir modal de edición
      onPress: (row) =>
        router.push(ROUTES.DASHBOARD.CATEGORIES.DETAIL.GO(row.id)),
    },
    {
      label: "Eliminar",
      // Abrir modal de confirmación
      onPress: (row) => console.log("Eliminar", row.id),
    },
  ];

  return (
    <View style={{ padding: 16 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        Categorías
      </Text>

      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <DashboardTable<CategoriaDashboardDTO>
          columns={columns}
          data={categorias?.content ?? []}
          actions={actions}
          currentPage={categorias?.number ?? 0}
          totalPages={totalPages}
          onPageChange={fetchAll}
        />
      )}
    </View>
  );
}
