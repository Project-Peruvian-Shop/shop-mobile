import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { Icons } from "@/assets/images/icons";
import { COLORS } from "@/utils/colors";
import { createContactenos } from "../../../services/mensajes.service";
import { obtenerUsuario } from "../../../utils/auth";
import { AlertCustom } from "../Alert/alertCustom";

export default function FormContactenos() {
  const [usuario_id, setUsuario] = useState<number | null>(null);
  const [checkbox, setCheckbox] = useState(false);
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [documento, setDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [contenido, setContenido] = useState("");

  const [alert, setAlert] = useState({
    visible: false,
    title: "",
    message: "",
    image: null as any,
  });

  const [loading, setLoading] = useState(false);

  const options = ["DNI", "RUC", "PASAPORTE", "OTRO"];

  useEffect(() => {
    const cargarUsuario = async () => {
      const user = await obtenerUsuario();
      if (user) {
        setUsuario(user.id || null);
        setEmail(user.email || "");
        setTipoDocumento(user.tipoDocumento || "");
        setNombre(user.nombre || "");
        setDocumento(user.documento || "");
        setTelefono(user.telefono || "");
        setAlert({
          visible: true,
          title: "Datos cargados",
          message: "Se han cargado tus datos personales",
          image: Icons.successIcon,
        });
      }
    };

    cargarUsuario();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
    try {
      const body = {
        nombre,
        tipoDocumento,
        documento,
        telefono,
        email,
        contenido,
        tipo: "CONTACTENOS",
        usuario_id,
      };
      const response = await createContactenos(body);
      if (response) {
        setAlert({
          visible: true,
          title: "Mensaje enviado",
          message:
            "Le agradecemos por contactarnos. Su consulta ha sido recibida.",
          image: Icons.successIcon,
        });
      }
      setNombre("");
      setTipoDocumento("");
      setDocumento("");
      setTelefono("");
      setEmail("");
      setContenido("");
      setCheckbox(false);
    } catch (error: any) {
      setAlert({
        visible: true,
        title: "Error",
        message:
          "Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente más tarde.",
        image: Icons.errorIcon,
      });
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos Personales</Text>

        <Text style={styles.label}>Nombre Completo / Razón Social *</Text>
        <TextInput
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
          placeholder="Tu nombre"
        />
        <Text style={styles.label}>Email *</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="correo@ejemplo.com"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          value={telefono}
          onChangeText={setTelefono}
          style={styles.input}
          keyboardType="number-pad"
        />
        <Text style={styles.label}>Tipo de documento</Text>
        <View style={styles.selectBox}>
          {options.map((op) => (
            <TouchableOpacity
              key={op}
              onPress={() => setTipoDocumento(op)}
              style={[
                styles.selectOption,
                tipoDocumento === op && styles.optionSelected,
              ]}
            >
              <Text
                style={{
                  color: tipoDocumento === op ? COLORS.WHITE : COLORS.BLACK,
                  textAlign: "center",
                }}
              >
                {op}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Número de documento</Text>
        <TextInput
          value={documento}
          onChangeText={setDocumento}
          style={styles.input}
          keyboardType="number-pad"
        />
        <Text style={styles.sectionTitle}>Comentario o Mensaje *</Text>

        <Text style={styles.label}>Comentarios</Text>
        <TextInput
          value={contenido}
          onChangeText={setContenido}
          style={[styles.input, { height: 100 }]}
          multiline
        />
      </View>

      {/* Checkbox */}
      <TouchableOpacity
        onPress={() => setCheckbox(!checkbox)}
        style={styles.checkboxRow}
      >
        <View style={styles.checkbox}>
          {checkbox && <Text style={styles.checkText}>X</Text>}
        </View>
        <Text>Acepto los términos y condiciones</Text>
      </TouchableOpacity>

      {/* Botón enviar */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Enviar Mensaje</Text>
        )}
      </TouchableOpacity>

      {alert.visible && (
        <AlertCustom
          visible={alert.visible}
          title={alert.title}
          message={alert.message}
          image={alert.image}
          onClose={() =>
            setAlert({
              visible: false,
              title: "",
              message: "",
              image: null,
            })
          }
        />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  description: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
    width: "90%",
    color: "#333",
  },
  section: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 14,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 8,
    color: COLORS.PRIMARY,
  },

  /* ------ Inputs ------ */
  label: {
    marginTop: 10,
    marginBottom: 5,
    color: "#555",
    fontWeight: "500",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fafafa",
  },

  /* ------ Select custom ------ */
  selectBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 5,
  },

  selectOption: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f5f5f5",
    marginRight: 6,
  },

  optionSelected: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },

  /* ------ Checkbox ------ */
  checkboxRow: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },

  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 4,
  },

  checkText: {
    color: COLORS.PRIMARY,
    fontWeight: "bold",
    fontSize: 16,
  },

  /* ------ Botón ------ */
  button: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 50,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
