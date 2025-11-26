import { Icons } from "@/assets/images/icons";
import { FAQCard } from "@/components/app/faq/FAQCard";
import { TitlePage } from "@/components/app/titlepage/titlepage";
import { COLORS } from "@/utils/colors";
import { router } from "expo-router";
import { useState } from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FAQ() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Cómo puedo comunicarme con atención al cliente?",
      answer:
        "Puedes contactarnos a través de nuestro formulario en línea, por correo electrónico o por teléfono, te recomendamos que nos escribas al whatsapp:+51 922723633 para poder ofrecerte una atención más rapida.",
      img: Icons.icon1,
      color: COLORS.PRIMARY,
    },
    {
      question: "¿Puedo modificar mi pedido después de haberlo realizado?",
      answer:
        "Sí, puedes modificar tu pedido si aún no ha sido procesado. Contáctanos lo antes posible para ayudarte, escribiendo a nuestro whatsapp: +51 922723633 o tambien puedes contactarnos mediante la página de contáctenos rellenando el formulario.",
      img: Icons.icon2,
      color: COLORS.PRIMARY,
    },
    {
      question: "¿Puedo recoger mi pedido en tienda?",
      answer:
        "Sí, ofrecemos la opción de recoger en la empresa. Nuestro equipo se pondra en contacto contigo para coordinar la entrega del pedido, en caso deses que se te envie ellos te brindarán la información de la entrega.",
      img: Icons.icon3,
      color: COLORS.PRIMARY,
    },
    {
      question: "¿Cómo puedo obtener un comprobante de pago?",
      answer:
        "Nos pondremos en contácto contigo para verificar el pago del pedido y la entrega, una vez terminado este proceso te emitiremos una boleta o factura según nos indiques.",
      img: Icons.icon4,
      color: COLORS.PRIMARY,
    },
    {
      question: "¿Qué hago si necesito tuberías en medidas específicas?",
      answer:
        "Escribenos a nuestro whatsapp: +51 922723633 e indicanos que necesitas tuberias con medidas especificas, para poder indicarte el procedimiento del pedido y cotizarte el precio de las tuberias.",
      img: Icons.icon5,
      color: COLORS.PRIMARY,
    },
  ];

  const handleWhatsapp = (text: string) => {
    const regex = /(\+51\s?\d{9})/g;
    const match = text.match(regex);

    if (match) {
      const phone = match[0].replace(/\D/g, "");
      const url = `https://api.whatsapp.com/send/?phone=${phone}&text=Hola+Tuberías+Peruanito,+tengo+una+consulta&type=phone_number`;

      Linking.openURL(url);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TitlePage title="Preguntas Frecuentes" />

      <View style={styles.header}>
        <Text style={styles.title}>Todo lo que necesitas saber</Text>
        <Text style={styles.subtitle}>
          Respuestas rápidas a las preguntas más importantes sobre nuestra
          plataforma
        </Text>
      </View>

      {/* GRID */}
      <View style={styles.grid}>
        {faqs.map((faq, index) => (
          <FAQCard
            key={index}
            img={faq.img}
            title={faq.question}
            description={faq.answer}
            onPressLink={() => handleWhatsapp(faq.answer)}
            color={faq.color}
            index={index}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      </View>

      {/* CTA */}
      <View style={styles.footer}>
        <View style={styles.footerBox}>
          <Text style={styles.footerText}>¿Tienes más preguntas?</Text>

          <TouchableOpacity
            onPress={() => router.push("/contactenos")}
            style={styles.footerButton}
          >
            <Text style={styles.footerButtonText}>Contáctanos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    maxWidth: 1200,
    alignSelf: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: 32,
    marginHorizontal: 20,
    marginTop: 16,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1b2f33",
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 18,
    color: "#6b7280",
    maxWidth: 700,
    textAlign: "center",
  },

  // GRID responsive
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },

  // Footer
  footer: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 40,
    marginHorizontal: 20,
  },

  footerBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 2,
    borderColor: "#fb2343",
    borderRadius: 9999,
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  footerText: {
    fontWeight: "600",
    color: "#1b2f33",
  },

  footerButton: {
    backgroundColor: "#fb2343",
    borderRadius: 9999,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },

  footerButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
