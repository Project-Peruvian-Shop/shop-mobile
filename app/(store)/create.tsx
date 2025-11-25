import { TitlePage } from "@/components/app/titlepage/titlepage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { postCotizacion } from "@/services/cotizacion.service";
import { obtenerUsuario } from "@/utils/auth";
import { clearCart, getCart } from "@/utils/cartStorage";

import { Icons } from "@/assets/images/icons";
import { AlertCustom } from "@/components/app/Alert/alertCustom";
import type { CotizacionRequestDTO } from "@/models/Cotizacion/Cotizacion_request_dto";
import { COLORS } from "@/utils/colors";
import { ROUTES } from "@/utils/routes";

export default function Checkout() {
  const router = useRouter();

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [comentarios, setComentarios] = useState("");

  const [alert, setAlert] = useState({
    visible: false,
    title: "",
    message: "",
    image: null as any,
  });

  const [loading, setLoading] = useState(false);

  const options = ["DNI", "RUC", "PASAPORTE", "OTRO"];

  // --------------------------
  // CARGAR DATOS DEL USUARIO
  // --------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usr = await obtenerUsuario();

        if (usr) {
          setNombre(`${usr.nombre} ${usr.apellidos}` || "");
          setEmail(usr.email || "");
          setTipoDocumento(usr.tipoDocumento || "");
          setNumeroDocumento(usr.documento || "");
          setTelefono(usr.telefono || "");

          setAlert({
            visible: true,
            title: "Datos cargados",
            message: "Se han cargado tus datos de usuario.",
            image: Icons.successIcon,
          });
        }
      } catch (error) {
        console.log("ERROR:", error);

        setAlert({
          visible: true,
          title: "Error cargando datos",
          message:
            "No se pudieron cargar tus datos de usuario, reinicia la app.",
          image: Icons.errorIcon,
        });
      }
    };

    fetchData();
  }, []);

  // --------------------------
  // VALIDACIÓN Y ENVÍO
  // --------------------------
  const handleSubmit = async () => {
    // Validación de términos
    if (!acceptedTerms) {
      setAlert({
        visible: true,
        title: "Términos no aceptados",
        message: "Debes aceptar los términos y condiciones para continuar.",
        image: Icons.warningIcon,
      });
      return;
    }

    if (loading) return;
    setLoading(true);

    const products = await getCart();

    // Validación de carrito
    if (!products || products.length === 0) {
      setLoading(false);
      setAlert({
        visible: true,
        title: "Carrito vacío",
        message: "Agregue productos antes de enviar la cotización.",
        image: Icons.warningIcon,
      });
      return;
    }

    const usuario = await obtenerUsuario();

    // Validación de login
    if (!usuario) {
      setLoading(false);
      setAlert({
        visible: true,
        title: "Sesión requerida",
        message: "Debe iniciar sesión para enviar la cotización.",
        image: Icons.warningIcon,
      });
      return;
    }

    const body: CotizacionRequestDTO = {
      usuarioID: usuario.id,
      nombre,
      tipoDocumento,
      documento: numeroDocumento,
      telefono,
      email,
      comentario: comentarios,
      productos: products,
    };

    try {
      const response = await postCotizacion(body);

      setAlert({
        visible: true,
        title: "Cotización enviada",
        message: "Tu solicitud de cotización ha sido enviada exitosamente.",
        image: Icons.successIcon,
      });

      console.log("Respuesta backend:", response);

      // Limpiar campos
      setNombre("");
      setTipoDocumento("");
      setNumeroDocumento("");
      setTelefono("");
      setEmail("");
      setComentarios("");
      setAcceptedTerms(false);
      await clearCart();

      // Redirigir después de 1 segundo
      setTimeout(() => {
        router.replace(ROUTES.PROFILE.PROFILE.ENTIRE_PATH);
      }, 1000);
    } catch (error) {
      console.log("Error enviando cotización:", error);

      setAlert({
        visible: true,
        title: "Error",
        message: "Hubo un problema enviando la cotización.",
        image: Icons.errorIcon,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
      <TitlePage title="Solicitar Cotización" />

      <ScrollView style={{ padding: 20 }}>
        {/* Texto de introducción */}
        <View style={{ alignItems: "center" }}>
          <Text style={styles.description}>
            Complete la información en las siguientes secciones
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Personal</Text>

          <Text style={styles.label}>Nombre completo</Text>
          <TextInput
            value={nombre}
            onChangeText={setNombre}
            style={styles.input}
            placeholder="Tu nombre"
          />

          <Text style={styles.label}>Correo</Text>
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
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documentación</Text>

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
            value={numeroDocumento}
            onChangeText={setNumeroDocumento}
            style={styles.input}
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información adicional</Text>

          <Text style={styles.label}>Comentarios</Text>
          <TextInput
            value={comentarios}
            onChangeText={setComentarios}
            style={[styles.input, { height: 100 }]}
            multiline
          />
        </View>

        {/* Checkbox */}
        <TouchableOpacity
          onPress={() => setAcceptedTerms(!acceptedTerms)}
          style={styles.checkboxRow}
        >
          <View style={styles.checkbox}>
            {acceptedTerms && <Text style={styles.checkText}>X</Text>}
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
            <Text style={styles.buttonText}>Enviar cotización</Text>
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
      </ScrollView>
    </SafeAreaView>
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
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
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
