import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";
import { styles } from "./styles";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchBar({
  placeholder = "Buscar...",
  value,
  onChangeText,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Ionicons name="search" size={18} color="#a3a3a3" style={styles.icon} />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#737373"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}
