import { SearchBar } from "@/components/dashboard/search/search";
import {
  Action,
  Column,
  DashboardTable,
} from "@/components/dashboard/table/table";
import { Loader } from "@/components/global/loader/loader";
import { PaginatedProductoResponseDTO } from "@/models/Producto/Producto_response_dto";
import { PaginatedResponse } from "@/services/global.interfaces";
import { getPaginatedProductos } from "@/services/producto.service";
import { ROUTES } from "@/utils/routes";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const [productos, setProductos] =
    useState<PaginatedResponse<PaginatedProductoResponseDTO>>();

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async (page: number = 0) => {
    setLoading(true);
    try {
      const res = await getPaginatedProductos(page);
      setProductos(res);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const columns: Column<PaginatedProductoResponseDTO>[] = [
    {
      header: "ID",
      accessor: "id",
      columnWidth: 60,
      textAlign: "center",
      sticky: true,
    },
    {
      header: "Imagen",
      accessor: "imagenUrl",
      columnWidth: 100,
      render: (_, row) => (
        <Image
          source={{ uri: row.imagenUrl }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 6,
            backgroundColor: "#f2f2f2",
          }}
          resizeMode="cover"
        />
      ),
    },
    { header: "Nombre", accessor: "nombre", textAlign: "left" },
    {
      header: "Categoría",
      accessor: "categoriaNombre",
      columnWidth: 140,
      textAlign: "left",
    },
  ];

  const actions: Action<PaginatedProductoResponseDTO>[] = [
    {
      label: "Editar",
      onPress: (row) =>
        router.push(ROUTES.DASHBOARD.PRODUCTS.DETAIL.GO(row.id)),
    },
    {
      label: "Eliminar",
      onPress: (row) => console.log("Eliminar producto:", row.id),
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
        Productos
      </Text>

      <SearchBar
        placeholder="Buscar cotizaciones..."
        value=""
        onChangeText={() => {}}
      />

      {loading ? (
        <Loader message="Cargando productos..." />
      ) : (
        <DashboardTable<PaginatedProductoResponseDTO>
          columns={columns}
          data={productos?.content ?? []}
          actions={actions}
          currentPage={productos?.number ?? 0}
          totalPages={totalPages}
          onPageChange={fetchAll}
        />
      )}
    </View>
  );
}
