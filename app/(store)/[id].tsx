import { TitlePage } from "@/components/app/titlepage/titlepage";
import { ImageViewer } from "@/components/global/images/images";
import { Loader } from "@/components/global/loader/loader";
import { ProductoDTO } from "@/models/Producto/Producto_response_dto";
import { getProductoById } from "@/services/producto.service";
import { COLORS } from "@/utils/colors";
import { ROUTES } from "@/utils/routes";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailProduct() {
  const { id } = useLocalSearchParams();
  const [producto, setProducto] = useState<ProductoDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        const response = await getProductoById(Number(id));
        setProducto(response);
      } catch (err) {
        console.error("Error cargando producto:", err);
        router.push(ROUTES.TABS.PRODUCTS.ENTIRE_PATH);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id, router]);

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
      <TitlePage title={`Detalle de Producto`} />

      <View style={styles.container}>
        {loading ? <Loader message="Cargando producto..." /> : null}

        {producto && (
          <ScrollView contentContainerStyle={styles.scroll}>
            {/* Imagen principal con fondo de categoría */}
            <View style={styles.imageContainer}>
              {producto.categoriaEnlace && (
                <Image
                  source={{ uri: producto.categoriaEnlace }}
                  style={styles.categoryImage}
                  contentFit="cover"
                  transition={500}
                  blurRadius={5}
                />
              )}

              {/* Imagen del producto */}
              <ImageViewer uri={producto.productoEnlace} variant="product" />
            </View>

            {/* Contenido */}
            <View style={styles.content}>
              {/* Categoría */}
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{producto.categoriaNombre}</Text>
              </View>

              {/* Nombre */}
              <Text style={styles.title}>{producto.nombre}</Text>

              {/* Descripción */}
              <Text style={styles.description}>{producto.descripcion}</Text>

              {/* Imagen + Nombre de categoría */}
              <View style={styles.categoryInfo}>
                <ImageViewer
                  uri={producto.categoriaEnlace}
                  variant="category"
                />
                <Text style={styles.categoryFullName}>
                  {producto.categoriaNombre}
                </Text>
              </View>

              {/* Usos */}
              <View style={styles.usesContainer}>
                <Text style={styles.usesTitle}>Usos de la categoría</Text>
                <Text style={styles.usesText}>{producto.categoriaUsos}</Text>
              </View>
            </View>
          </ScrollView>
        )}

        {/* Botón */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="cart-outline" size={18} color="#fff" />
            <Text style={styles.addButtonText}>Agregar al carrito</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get("window").width - 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    marginBottom: 20,
  },
  scroll: {
    paddingBottom: 80,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    overflow: "hidden",
  },
  categoryImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.25,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  badgeContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f5f9",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  badgeText: {
    fontSize: 12,
    color: "#334155",
    fontWeight: "500",
  },
  title: {
    fontSize: 22,
    fontWeight: "400",
    color: "#0f172a",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    marginBottom: 20,
  },
  categoryInfo: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  categoryFullName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
    textAlign: "center",
  },
  usesContainer: {
    marginTop: 10,
  },
  usesTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  usesText: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 18,
    textAlign: "justify",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    backgroundColor: COLORS.WHITE,
  },
  addButton: {
    backgroundColor: COLORS.PRIMARY,
    height: 50,
    borderRadius: 10,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 6,
  },
});
