import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { styles } from "./styles";

export function DropdownActions<T>({
  actions,
  row,
}: {
  actions: { label: string; onPress: (row: T) => void }[];
  row: T;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {/* Botón principal (menú) */}
      <Pressable onPress={() => setVisible(true)} style={styles.dropdownButton}>
        <Text style={styles.dropdownButtonText}>⋮</Text>
      </Pressable>

      {/* Menú modal */}
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.dropdownMenu}>
            {actions.map((action, idx) => (
              <Pressable
                key={idx}
                style={({ pressed }) => [
                  styles.dropdownItem,
                  pressed && styles.dropdownItemPressed,
                ]}
                onPress={() => {
                  setVisible(false);
                  action.onPress(row);
                }}
              >
                <Text style={styles.dropdownItemText}>{action.label}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
