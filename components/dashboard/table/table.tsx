import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";

export interface Column<T> {
  header: string;
  accessor: keyof T;
  columnWidth?: number;
  textAlign?: "left" | "center" | "right";
  sticky?: boolean;
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
  const stickyColumns = columns.filter((c) => c.sticky);
  const scrollableColumns = columns.filter((c) => !c.sticky);

  return (
    <View style={styles.wrapper}>
      <View style={{ flexDirection: "row" }}>
        {/* 🧷 ZONA FIJA */}
        <View>
          {/* Headers fijos */}
          <View style={styles.headerRow}>
            {stickyColumns.map((col) => (
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
          </View>

          {/* Filas fijas */}
          <ScrollView>
            {data.length === 0 ? (
              <Text style={styles.empty}>No hay registros</Text>
            ) : (
              data.map((row) => (
                <View key={row.id} style={styles.row}>
                  {stickyColumns.map((col) => {
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
                </View>
              ))
            )}
          </ScrollView>
        </View>

        {/* 🧭 ZONA SCROLLABLE */}
        <ScrollView horizontal>
          <View>
            {/* Headers desplazables */}
            <View style={styles.headerRow}>
              {scrollableColumns.map((col) => (
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

            {/* Filas desplazables */}
            <ScrollView>
              {data.length === 0 ? (
                <Text style={styles.empty}>No hay registros</Text>
              ) : (
                data.map((row) => (
                  <View key={row.id} style={styles.row}>
                    {scrollableColumns.map((col) => {
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
                            {col.render
                              ? col.render(value, row)
                              : String(value)}
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
      </View>

      {/* Pagination */}
      <View style={styles.pagination}>
        <Pressable
          onPress={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          style={({ pressed }) => [
            styles.buttonPagination,
            currentPage === 0 && styles.disabledButton,
            pressed && styles.pressed,
          ]}
        >
          <Text
            style={[
              styles.textButton,
              currentPage === 0 && styles.disabledText,
            ]}
          >
            ← Ant.
          </Text>
        </Pressable>

        <Text style={styles.pageIndicator}>
          {`${currentPage + 1} / ${totalPages}`}
        </Text>

        <Pressable
          onPress={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          style={({ pressed }) => [
            styles.buttonPagination,
            currentPage >= totalPages - 1 && styles.disabledButton,
            pressed && styles.pressed,
          ]}
        >
          <Text
            style={[
              styles.textButton,
              currentPage >= totalPages - 1 && styles.disabledText,
            ]}
          >
            Sig. →
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
