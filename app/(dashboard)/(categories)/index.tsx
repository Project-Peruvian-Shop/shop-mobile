import { CategoriaDashboardDTO } from "@/models/Categoria/Categoria_response";
import { getAllCategories } from "@/services/categoria.service";
import { PaginatedResponse } from "@/services/global.interfaces";
import { ROUTES } from "@/utils/routes";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Categories() {
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [cantidad, setCantidad] = useState(0);

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

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Categorías
      </Text>

      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          data={categorias?.content ?? []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push(ROUTES.DASHBOARD.CATEGORIES.DETAIL.GO(item.id))
              }
            >
              <Text style={{ fontSize: 16, marginVertical: 8 }}>
                {item.nombre}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
