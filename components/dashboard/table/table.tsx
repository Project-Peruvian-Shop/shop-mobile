import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";

export interface Column<T> {
  header: string;
  accessor: keyof T;
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
      <ScrollView horizontal>
        <View style={{ flexDirection: "column" }}>
          {/* Headers */}
          <View style={styles.headerRow}>
            {columns.map((col, idx) => (
              <View key={idx} style={styles.cell}>
                <Text style={styles.th}>{col.header}</Text>
              </View>
            ))}
            {actions && (
              <View style={styles.cell}>
                <Text style={styles.th}>Acciones</Text>
              </View>
            )}
          </View>

          {/* Rows */}
          {data.length === 0 ? (
            <Text style={styles.empty}>No hay registros</Text>
          ) : (
            data.map((row) => (
              <View key={row.id} style={styles.row}>
                {columns.map((col, idx) => {
                  const value = row[col.accessor];
                  return (
                    <View key={idx} style={styles.cell}>
                      <Text style={styles.td}>
                        {col.render ? col.render(value, row) : String(value)}
                      </Text>
                    </View>
                  );
                })}
                {actions && (
                  <View style={styles.cell}>
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
        </View>
      </ScrollView>

      {/* Pagination */}
      <View style={styles.pagination}>
        <Pressable
          onPress={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <Text
            style={currentPage === 0 ? styles.disabled : undefined}
          >{`<`}</Text>
        </Pressable>

        <Text>{`${currentPage + 1} / ${totalPages}`}</Text>

        <Pressable
          onPress={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          <Text
            style={currentPage >= totalPages - 1 ? styles.disabled : undefined}
          >{`>`}</Text>
        </Pressable>
      </View>
    </View>
  );
}
