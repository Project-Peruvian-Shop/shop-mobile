import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { styles } from "./styles";

interface ResultItem {
  id: string | number;
  label: string;
}

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  results?: ResultItem[];
  onSelectResult?: (item: ResultItem) => void;
  loading?: boolean;
}

export function SearchBar({
  placeholder = "Buscar...",
  value,
  onChangeText,
  results = [],
  onSelectResult,
  loading = false,
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

        {loading && <Text style={styles.loadingText}>Cargando...</Text>}
      </View>

      {results.length > 0 && (
        <View style={styles.resultsBox}>
          <FlatList
            data={results}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <Pressable
                style={styles.resultItem}
                onPress={() => onSelectResult?.(item)}
              >
                <Text style={styles.resultLabel}>{item.label}</Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
}
