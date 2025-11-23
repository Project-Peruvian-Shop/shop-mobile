import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";

interface QuantityModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
}

export function QuantityModal({
  visible,
  onClose,
  onConfirm,
}: QuantityModalProps) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity((prev) => (prev < 300 ? prev + 1 : 300));
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleInputChange = (text: string) => {
    const num = parseInt(text, 10);
    if (!isNaN(num) && num > 0 && num <= 300) setQuantity(num);
    else if (text === "") setQuantity(1);
  };

  const handleAdd = () => {
    onConfirm(quantity);
    setQuantity(1);
    onClose();
  };

  useEffect(() => {
    if (visible) setQuantity(10);
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContainer}>
          <Text style={styles.title}>Seleccionar cantidad</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.btnCircle} onPress={handleDecrease}>
              <Ionicons name="remove" size={20} color={COLORS.PRIMARY} />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(quantity)}
              onChangeText={handleInputChange}
            />

            <TouchableOpacity style={styles.btnCircle} onPress={handleIncrease}>
              <Ionicons name="add" size={20} color={COLORS.PRIMARY} />
            </TouchableOpacity>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.cancelBtn]}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, styles.addBtn]}
              onPress={handleAdd}
            >
              <Text style={styles.addText}>Agregar</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
