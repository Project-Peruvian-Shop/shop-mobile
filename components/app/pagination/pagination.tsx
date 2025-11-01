import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface PaginationProps {
  currentPage: number; // página actual (0-based)
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  // Calcular las páginas visibles (máximo 3)
  let pages: number[] = [];

  if (currentPage <= 1) {
    pages = [0, 1, 2].filter((p) => p < totalPages);
  } else if (currentPage >= totalPages - 2) {
    pages = [totalPages - 3, totalPages - 2, totalPages - 1].filter(
      (p) => p >= 0
    );
  } else {
    pages = [currentPage - 1, currentPage, currentPage + 1];
  }

  return (
    <View style={styles.container}>
      {/* Botón anterior */}
      <TouchableOpacity
        style={[styles.button, currentPage === 0 && styles.disabled]}
        disabled={currentPage === 0}
        onPress={() => onPageChange(currentPage - 1)}
      >
        <Text style={styles.text}>{"<"}</Text>
      </TouchableOpacity>

      {/* Números */}
      {pages.map((p) => (
        <TouchableOpacity
          key={p}
          style={[styles.button, p === currentPage && styles.active]}
          onPress={() => onPageChange(p)}
        >
          <Text style={[styles.text, p === currentPage && styles.activeText]}>
            {p + 1}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Botón siguiente */}
      <TouchableOpacity
        style={[
          styles.button,
          currentPage === totalPages - 1 && styles.disabled,
        ]}
        disabled={currentPage === totalPages - 1}
        onPress={() => onPageChange(currentPage + 1)}
      >
        <Text style={styles.text}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
};
