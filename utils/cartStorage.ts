import AsyncStorage from "@react-native-async-storage/async-storage";

// Obtener carrito desde AsyncStorage
export const getCart = async () => {
  try {
    const saved = await AsyncStorage.getItem("cart_items");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error("Error al obtener carrito:", e);
    return [];
  }
};

// Guardar un carrito completo
export const saveCart = async (cart: any[]) => {
  try {
    await AsyncStorage.setItem("cart_items", JSON.stringify(cart));
  } catch (e) {
    console.error("Error al guardar carrito:", e);
  }
};

export const addToCart = async (product: any, quantity: number) => {
  const cart = await getCart();

  // Verificar si ya existe
  const existing = cart.find((item: any) => item.id === product.id);

  let updated;

  if (existing) {
    // Si ya existe, actualizar cantidad
    updated = cart.map((item: any) =>
      item.id === product.id
        ? { ...item, cantidad: item.cantidad + quantity }
        : item
    );
  } else {
    // Si no existe, agregar nuevo
    updated = [...cart, { ...product, cantidad: quantity }];
  }

  await saveCart(updated);
  return updated;
};


// Eliminar producto por ID
export const removeFromCart = async (id: number) => {
  const cart = await getCart();
  const updated = cart.filter((item: any) => item.id !== id);
  await saveCart(updated);
  return updated;
};

// Vaciar carrito
export const clearCart = async () => {
  try {
    await AsyncStorage.removeItem("cart_items");
  } catch (e) {
    console.error("Error al limpiar carrito:", e);
  }
  
};
// Actualizar cantidad sumando/restando (+ / -)
export const updateQuantity = async (id: number, difference: number) => {
  const cart = await getCart();

  const updated = cart.map((item: any) =>
    item.id === id
      ? { ...item, cantidad: Math.max(1, item.cantidad + difference) }
      : item
  );

  await saveCart(updated);
  return updated;
};

// Establecer una cantidad exacta (input numérico)
export const setQuantity = async (id: number, newQuantity: number) => {
  const cart = await getCart();

  const updated = cart.map((item: any) =>
    item.id === id
      ? { ...item, cantidad: Math.max(1, newQuantity) }
      : item
  );

  await saveCart(updated);
  return updated;
};
