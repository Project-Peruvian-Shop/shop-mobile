import type { PaginatedProductoResponseDTO } from "@/models/Producto/Producto_response_dto";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
