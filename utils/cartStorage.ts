import type { PaginatedProductoResponseDTO } from "@/models/Producto/Producto_response_dto";
import { getProductoCarritoDetalle } from "@/services/cotizacion.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export interface CartProductoDTO extends PaginatedProductoResponseDTO {
  cantidad: number;
}

const CART_KEY = "cart_items";
/**
 * Obtiene el carrito desde AsyncStorage
 */
export const getCart = async (): Promise<CartProductoDTO[]> => {
  const data = await AsyncStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Guarda el carrito
 */
export const saveCart = async (items: CartProductoDTO[]) => {
  await AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
};

/**
 * Agregar producto al carrito
 */
export const addToCart = async (
  producto: PaginatedProductoResponseDTO,
  cantidad: number = 1
) => {
  const cart = await getCart();

  const index = cart.findIndex((p) => p.id === producto.id);

  if (index !== -1) {
    cart[index].cantidad += cantidad;

    if (cart[index].cantidad > 300) {
      cart[index].cantidad = 300; // límite
    }
  } else {
    cart.push({ ...producto, cantidad });
  }

  await saveCart(cart);
  return cart;
};

/**
 * Actualizar cantidad usando delta (+1 o -1)
 */
export const updateQuantity = async (id: number, delta: number) => {
  const cart = await getCart();

  const updated = cart
    .map((item) =>
      item.id === id
        ? {
            ...item,
            cantidad: Math.max(1, Math.min(300, item.cantidad + delta)),
          }
        : item
    )
    .filter((item) => item.cantidad > 0);

  await saveCart(updated);
  return updated;
};

/**
 * Actualizar cantidad absoluta (input)
 */
export const setAbsoluteQuantity = async (id: number, cantidad: number) => {
  const cart = await getCart();

  const updated = cart.map((item) =>
    item.id === id
      ? { ...item, cantidad: Math.max(1, Math.min(300, cantidad)) }
      : item
  );

  await saveCart(updated);
  return updated;
};

/**
 * Eliminar producto
 */
export const removeFromCart = async (id: number) => {
  const cart = await getCart();
  const updated = cart.filter((p) => p.id !== id);
  await saveCart(updated);
  return updated;
};

/**
 * Vaciar carrito
 */
export const clearCart = async () => {
  await AsyncStorage.removeItem(CART_KEY);
};
/**
 *
 * Agregar productos de una cotización al carrito con confirmación
 *
 */
export const agregarProductosCotizacionAlCarrito = async (
  numeroCotizacion: string,
  cotizacionId: number
) => {
  Alert.alert(
    "¿Agregar productos al carrito?",
    `¿Deseas cargar los productos de la cotización ${numeroCotizacion} al carrito?`,
    [
      { text: "No, cancelar", style: "cancel" },
      {
        text: "Sí, agregar",
        onPress: async () => {
          try {
            // Obtener productos desde backend
            const productos = await getProductoCarritoDetalle(cotizacionId);

            for (const producto of productos) {
              addToCart(
                {
                  id: producto.id,
                  nombre: producto.nombre,
                  imagenUrl: producto.imagenEnlace,
                  imagenAlt: producto.imagenAlt,
                  categoriaNombre:
                    producto.categoriaNombre + " " + producto.categoriaNorma,
                },
                producto.cantidad
              );
            }

            Alert.alert(
              "Productos agregados",
              "Los productos fueron cargados correctamente al carrito."
            );
          } catch (error) {
            console.error(error);
            Alert.alert(
              "Error",
              "No se pudieron cargar los productos. Inténtalo nuevamente."
            );
          }
        },
      },
    ]
  );
};
