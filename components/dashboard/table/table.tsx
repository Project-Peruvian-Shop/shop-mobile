import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";

export interface Column<T> {
  header: string;
  accessor: keyof T;
  columnWidth?: number;
  textAlign?: "left" | "center" | "right";
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface Action<T> {
  label: string;
  onPress: (row: T) => void;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  actions?: Action<T>[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function DashboardTable<T extends { id: number | string }>({
  columns,
  data,
  actions,
  currentPage,
  totalPages,
  onPageChange,
}: TableProps<T>) {
  return (
    <View style={styles.wrapper}>
      {/* Scroll horizontal para columnas */}
      <ScrollView horizontal>
        <View style={{ flexDirection: "column" }}>
          {/* Headers */}
          <View style={styles.headerRow}>
            {columns.map((col) => (
              <View
                key={String(col.accessor)}
                style={[
                  styles.cell,
                  col.columnWidth ? { width: col.columnWidth } : {},
                ]}
              >
                <Text
                  style={[
                    styles.th,
                    col.textAlign ? { textAlign: col.textAlign } : {},
                  ]}
                >
                  {col.header}
                </Text>
              </View>
            ))}
            {actions && (
              <View style={styles.actionsCell}>
                <Text style={styles.th}>Acciones</Text>
              </View>
            )}
          </View>

          {/* Scroll vertical para filas */}
          <ScrollView>
            {/* <--- altura máxima */}
            {data.length === 0 ? (
              <Text style={styles.empty}>No hay registros</Text>
            ) : (
              data.map((row) => (
                <View key={row.id} style={styles.row}>
                  {columns.map((col) => {
                    const value = row[col.accessor];
                    return (
                      <View
                        key={String(col.accessor)}
                        style={[
                          styles.cell,
                          col.columnWidth ? { width: col.columnWidth } : {},
                        ]}
                      >
                        <Text
                          style={[
                            styles.td,
                            col.textAlign ? { textAlign: col.textAlign } : {},
                          ]}
                        >
                          {col.render ? col.render(value, row) : String(value)}
                        </Text>
                      </View>
                    );
                  })}
                  {actions && (
                    <View style={styles.actionsCell}>
                      <View style={styles.actions}>
                        {actions.map((action, idx) => (
                          <Pressable
                            key={idx}
                            style={styles.button}
                            onPress={() => action.onPress(row)}
                          >
                            <Text>{action.label}</Text>
                          </Pressable>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Pagination */}
      <View style={styles.pagination}>
        <Pressable
          onPress={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <Text>{`<`}</Text>
        </Pressable>

        <Text>{`${currentPage + 1} / ${totalPages}`}</Text>

        <Pressable
          onPress={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          <Text>{`>`}</Text>
        </Pressable>
      </View>
    </View>
  );
}
