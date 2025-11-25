import { COLORS } from "@/utils/colors";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { change_state } from "../../../services/cotizacion.service";

export interface Data {
  id: number;
  cotizacionId: string;
  clientName: string;
  date: string;
  status: "enviada" | "aceptada" | "rechazada";
  fileName: string;
}

export default function ResponseCard({
  data,
  onStateChange,
}: {
  data: Data;
  onStateChange?: () => void;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [comentario, setComentario] = useState("");

  const statusLabels = {
    enviada: "Enviada",
    aceptada: "Aceptada",
    rechazada: "Rechazada",
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleResponder = () => {
    setModalVisible(true);
  };

  const sendResponse = async (estado: "ACEPTADA" | "RECHAZADA") => {
    try {
      await change_state(data.id, estado, comentario);
      onStateChange?.();
      console.log("STATUS RECIBIDO →", data.status);
      Alert.alert("Éxito", `Cotización ${estado.toLowerCase()} correctamente.`);
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", "No se pudo enviar la respuesta: " + error);
    }
  };

  return (
    <>
      <View style={styles.card}>
        {/* HEADER */}
        <View style={styles.leftSection}>
          <Text style={styles.clientName}>Atendido por</Text>
          <Text style={styles.clientValue}>{data.clientName}</Text>

          <Text style={[styles.date, { marginTop: 8 }]}>Enviado el</Text>
          <Text style={styles.date}>{formatDate(data.date)}</Text>
        </View>

        {/* ACTIONS */}
        <View style={styles.actions}>
          <View style={styles.pdfActions}>
            {/* VER PDF */}
            <TouchableOpacity
              style={styles.pdfButton}
              onPress={() => {
                // IMPORTANTE:
                // Usa Linking.openURL o react-native-pdf
              }}
            >
              <Text style={styles.pdfLabel}>Ver PDF</Text>
            </TouchableOpacity>

            {/* DESCARGAR PDF */}
            <TouchableOpacity
              style={styles.pdfButton}
              onPress={() => {
                // Para descargar usa react-native-fs o expo-file-system
              }}
            >
              <Text style={styles.pdfLabel}>Descargar PDF</Text>
            </TouchableOpacity>
          </View>

          {/* BOTÓN RESPONDER */}
          <TouchableOpacity
            style={[
              styles.responseBtn,
              data.status === "enviada"
                ? styles.responseEnabled
                : styles.responseDisabled,
            ]}
            disabled={data.status !== "enviada"}
            onPress={handleResponder}
          >
            <Text style={styles.responseText}>
              {data.status === "enviada"
                ? "Responder"
                : `${statusLabels[data?.status]} anteriormente`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* MODAL DE RESPUESTA */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Responder cotización</Text>

            <TextInput
              style={styles.textArea}
              placeholder="Comentario (opcional)"
              value={comentario}
              multiline
              onChangeText={setComentario}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.acceptBtn]}
                onPress={() => sendResponse("ACEPTADA")}
              >
                <Text style={styles.modalBtnText}>Aceptar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.rejectBtn]}
                onPress={() => sendResponse("RECHAZADA")}
              >
                <Text style={styles.modalBtnText}>Rechazar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBtnText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    gap: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 14,
    paddingHorizontal: 10,
  },

  leftSection: {
    width: "70%",
  },

  clientName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  clientValue: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
  },

  date: {
    fontSize: 14,
    color: COLORS.GRAY,
  },

  actions: {
    width: "50%",
    justifyContent: "center",
    alignItems: "flex-end",
  },

  pdfActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },

  pdfButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    backgroundColor: "transparent",
  },

  pdfLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.PRIMARY,
  },

  responseBtn: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderColor: COLORS.SECONDARY,
    borderWidth: 1,
  },

  responseEnabled: {
    backgroundColor: "transparent",
  },

  responseDisabled: {
    backgroundColor: COLORS.GRAY,
  },

  responseText: {
    color: COLORS.SECONDARY,
    fontWeight: "700",
    textAlign: "center",
  },
  /* MODAL STYLES */
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalCard: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    height: 100,
    marginBottom: 20,
    textAlignVertical: "top",
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modalBtn: {
    flex: 1,
    marginHorizontal: 2,
    padding: 8,
    borderRadius: 8,
  },

  acceptBtn: {
    backgroundColor: "#2ecc71",
  },

  rejectBtn: {
    backgroundColor: "#e74c3c",
  },

  cancelBtn: {
    backgroundColor: "#888",
  },

  modalBtnText: {
    textAlign: "center",
    color: "white",
    fontWeight: "700",
  },
});
