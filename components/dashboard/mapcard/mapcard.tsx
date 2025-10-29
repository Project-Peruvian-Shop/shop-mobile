import { COLORS } from "@/utils/colors";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./style";

interface MapCardProps {
  property: "tipoMensaje" | "estadoCotizacion" | "estadoMensaje" | "rolUsuario";
  value: string;
}

// === MAPPERS ===
const mapperEstadoCotizacion = (estado: string) => {
  switch (estado) {
    case "PENDIENTE":
      return "Pendiente";
    case "EN_PROCESO":
      return "En proceso";
    case "ENVIADA":
      return "Enviada";
    case "ACEPTADA":
      return "Aceptada";
    case "RECHAZADA":
      return "Rechazada";
    case "CERRADA":
      return "Cerrada";
    default:
      return "Desconocido";
  }
};

const mapperTipoMensaje = (tipo: string) => {
  switch (tipo) {
    case "CONTACTENOS":
      return "Contáctenos";
    case "QUEJA":
      return "Queja";
    case "RECLAMO":
      return "Reclamo";
    default:
      return "Desconocido";
  }
};

const mapperEstadoMensaje = (estado: string) => {
  switch (estado) {
    case "PENDIENTE":
      return "Pendiente";
    case "EN_PROCESO":
      return "En proceso";
    case "RESUELTO":
      return "Resuelto";
    case "CERRADO":
      return "Cerrado";
    default:
      return "Desconocido";
  }
};

const mapperUsuario = (rol: string) => {
  switch (rol) {
    case "ROLE_ADMIN":
      return "Administrador";
    case "ROLE_MANAGER":
      return "Gerente";
    case "ROLE_USER":
      return "Usuario";
    default:
      return "Desconocido";
  }
};

// === PALETA DE COLORES ===
const colorPalette: Record<string, { color: string; background: string }> = {
  Pendiente: { color: COLORS.YELLOW, background: COLORS.LIGHTYELLOW },
  "En proceso": { color: COLORS.ORANGE, background: COLORS.LIGHTORANGE },
  Enviada: { color: COLORS.BLUE, background: COLORS.LIGHTBLUE },
  Aceptada: { color: COLORS.GREEN, background: COLORS.LIGHTGREEN },
  Rechazada: { color: COLORS.PRIMARY, background: COLORS.LIGHTRED },
  Cerrada: { color: COLORS.GRAY, background: COLORS.LIGHTGRAY },
  Resuelto: { color: COLORS.GREEN, background: COLORS.LIGHTGREEN },
  Queja: { color: COLORS.ORANGE, background: COLORS.LIGHTORANGE },
  Reclamo: { color: COLORS.PRIMARY, background: COLORS.LIGHTRED },
  Contáctenos: { color: COLORS.BLUE, background: COLORS.LIGHTBLUE },
  Desconocido: { color: COLORS.GRAY, background: COLORS.LIGHTGRAY },
  Administrador: { color: COLORS.PRIMARY, background: COLORS.LIGHTRED },
  Gerente: { color: COLORS.BLUE, background: COLORS.LIGHTBLUE },
  Usuario: { color: COLORS.GREEN, background: COLORS.LIGHTGREEN },
};

export default function MapCard({ property, value }: MapCardProps) {
  let formattedValue = value;

  switch (property) {
    case "tipoMensaje":
      formattedValue = mapperTipoMensaje(value);
      break;
    case "estadoCotizacion":
      formattedValue = mapperEstadoCotizacion(value);
      break;
    case "estadoMensaje":
      formattedValue = mapperEstadoMensaje(value);
      break;
    case "rolUsuario":
      formattedValue = mapperUsuario(value);
      break;
    default:
      formattedValue = "Desconocido";
  }

  const { color, background } =
    colorPalette[formattedValue] || colorPalette["Desconocido"];

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.badge,
          { backgroundColor: background, borderColor: color },
        ]}
      >
        <Text style={[styles.text, { color }]}>{formattedValue}</Text>
      </View>
    </View>
  );
}
