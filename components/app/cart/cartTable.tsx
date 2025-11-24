import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  CartProductoDTO,
  getCart,
  removeFromCart,
  updateQuantity,
} from "@/utils/cartStorage";

import { Icons } from "@/assets/images/icons";
import { obtenerUsuario } from "@/utils/auth";
import { ROUTES } from "@/utils/routes";
import { AlertCustom } from "../Alert/alertCustom";
import { styles } from "./cartTable.styles";

export default function CartTable() {
  const [cart, setCart] = useState<CartProductoDTO[]>([]);
  const [alert, setAlert] = useState(false);
  const router = useRouter();

  const loadCart = async () => {
    const data = await getCart();
    setCart(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadCart();
    }, [])
  );
  const handleQuantity = async (item: any, delta: number) => {
    const updated = await updateQuantity(item.id, delta);
    setCart(updated);
    await AsyncStorage.setItem("cart_items", JSON.stringify(updated));
  };

  const handleDelete = async (id: number) => {
    const updated = await removeFromCart(id);
    setCart(updated);
    await AsyncStorage.setItem("cart_items", JSON.stringify(updated));
  };

  const totalProductos = cart.reduce((acc, item) => acc + item.cantidad, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setAlert(true);
      return;
    }

    const usuario = await obtenerUsuario();
    console.log("Usuario obtenido:", obtenerUsuario());
    if (!usuario) {
      router.push(ROUTES.AUTH.LOGIN.ENTIRE_PATH);
    } else {
      router.push(ROUTES.STORE.COTIZACION.ENTIRE_PATH);
    }
  };

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyTitle}>Tu carrito está vacío 🛒</Text>
          <Text style={styles.emptySubtitle}>
            Agrega productos para solicitar tu cotización.
          </Text>

          <Pressable
            style={styles.btnBlue}
            onPress={() => router.push(ROUTES.TABS.PRODUCTS.ENTIRE_PATH)}
          >
            <Text style={styles.btnBlueText}>Ir a la tienda</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <ScrollView>
            {cart.map((item) => (
              <View key={item.id} style={styles.row}>
                {/* Imagen + Nombre */}
                <View style={styles.productCell}>
                  <Image
                    source={{ uri: item.imagenUrl }}
                    style={styles.productImage}
                  />
                  <Text style={styles.productName}>{item.nombre}</Text>
                </View>

                {/* Categoría */}
                <Text style={styles.category}>{item.categoriaNombre}</Text>

                {/* Cantidad */}
                <View style={styles.quantityRow}>
                  <Pressable
                    style={styles.qtyBtn}
                    onPress={() => {
                      if (item.cantidad > 1) handleQuantity(item, -1);
                    }}
                  >
                    <Text style={styles.qtyBtnText}>-</Text>
                  </Pressable>

                  <TextInput
                    style={[styles.qtyText, { textAlign: "center" }]}
                    keyboardType="numeric"
                    value={String(item.cantidad)}
                    onChangeText={async (value) => {
                      const numericValue = value.replace(/[^0-9]/g, "");

                      if (numericValue === "") return;

                      let newQty = Number(numericValue);

                      if (newQty < 1) newQty = 1;
                      if (newQty > 300) newQty = 300;

                      if (newQty === item.cantidad) return;

                      const delta = newQty - item.cantidad;

                      const updated = await updateQuantity(item.id, delta);
                      setCart(updated);
                    }}
                    onBlur={async () => {
                      if (!item.cantidad || item.cantidad < 1) {
                        const updated = await updateQuantity(
                          item.id,
                          1 - item.cantidad
                        );
                        setCart(updated);
                      }
                    }}
                  />

                  <Pressable
                    style={styles.qtyBtn}
                    onPress={() => {
                      if (item.cantidad < 300) handleQuantity(item, +1);
                    }}
                  >
                    <Text style={styles.qtyBtnText}>+</Text>
                  </Pressable>
                </View>

                {/* Eliminar */}
                <Pressable onPress={() => handleDelete(item.id)}>
                  <Image source={Icons.trashIcon} style={styles.delete}></Image>
                </Pressable>
              </View>
            ))}
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.totalText}>
              Total de unidades: {totalProductos}
            </Text>

            <Pressable
              style={styles.btnWhite}
              onPress={() => router.push(ROUTES.TABS.PRODUCTS.ENTIRE_PATH)}
            >
              <Text style={styles.btnWhiteText}>Volver a la tienda</Text>
            </Pressable>

            <Pressable style={styles.btnBlue} onPress={handleCheckout}>
              <Text style={styles.btnBlueText}>Solicitar cotización</Text>
            </Pressable>
          </View>
        </>
      )}
      <AlertCustom
        visible={alert}
        title="Carrito vacío"
        message="No hay productos en el carrito para solicitar una cotización."
        image={Icons.infoIcon}
        onClose={() => {
          setAlert(false);
        }}
      />
    </View>
  );
}
