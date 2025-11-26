import { Icons } from "@/assets/images/icons";
import { TitlePage } from "@/components/app/titlepage/titlepage";
import { COLORS } from "@/utils/colors";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function AboutCompany() {
  return (
    <ScrollView style={styles.scroll}>
      <TitlePage title="¿Quiénes somos?" />

      {/* SOBRE LA EMPRESA */}
      <View style={styles.containerPadre}>
        <Image source={Icons.aboutIcon} style={styles.aboutImage} />
        <View style={styles.containerTexto}>
          <Text style={styles.text}>
            En <Text style={styles.bold}>Tuberías Peruanito S.A.C.</Text> nos
            especializamos en ofrecer soluciones en tuberías de alta calidad,
            innovadoras y sostenibles, orientadas a satisfacer las necesidades
            de sectores clave como la construcción, el saneamiento y la
            industria. Somos una empresa{" "}
            <Text style={styles.bold}>
              100% peruana, orgullosos de contribuir
            </Text>{" "}
            al desarrollo del país y firmemente comprometidos con el cuidado del
            medio ambiente, así como con la promoción de prácticas responsables
            a lo largo de toda nuestra cadena de producción.
          </Text>

          <Text style={styles.text}>
            Nuestros productos se fabrican mediante la{" "}
            <Text style={styles.bold}>extrusión de compuestos de PVC</Text>, un
            proceso eficiente y preciso que garantiza la calidad y resistencia
            de cada unidad. Utilizamos materiales de primera calidad, como
            estabilizantes de <Text style={styles.bold}>Calcio/Zinc</Text>, en
            sustitución de los metales pesados tradicionalmente empleados en la
            industria. Esta decisión no solo reduce el impacto ambiental de
            nuestros procesos, sino que también protege la salud de los
            trabajadores y usuarios finales, promoviendo una producción más
            limpia, segura y responsable.
          </Text>

          <Text style={styles.text}>
            Este enfoque nos permite ofrecer{" "}
            <Text style={styles.bold}>
              productos duraderos, confiables y de alto rendimiento
            </Text>
            , alineados con las crecientes exigencias de sostenibilidad del
            mercado nacional e internacional. Además, trabajamos continuamente
            en la mejora de nuestros procesos mediante la innovación
            tecnológica, reduciendo nuestra huella de carbono y optimizando el
            uso de recursos.
          </Text>

          <Text style={styles.text}>
            Actualmente, seguimos contribuyendo activamente al desarrollo de{" "}
            <Text style={styles.bold}>
              infraestructuras eficientes y sostenibles
            </Text>
            en las regiones norte y sur del país, reafirmando nuestro compromiso
            con la{" "}
            <Text style={styles.bold}>
              calidad, la innovación, el servicio excepcional
            </Text>
            y, sobre todo, con la{" "}
            <Text style={styles.bold}>
              preservación del entorno natural para las futuras generaciones.
            </Text>
          </Text>
        </View>
      </View>

      {/* VALORES */}
      <View style={styles.containerValores}>
        <Text style={styles.h2}>Valores</Text>
        <View style={styles.valoresGrid}>
          {[
            { src: Icons.compromisoIcon, title: "Compromiso" },
            { src: Icons.responsabilidadIcon, title: "Responsabilidad" },
            { src: Icons.excelenciaIcon, title: "Excelencia" },
            { src: Icons.trabajoEnEquipoIcon, title: "Trabajo en equipo" },
            { src: Icons.innovacionIcon, title: "Innovación" },
          ].map((valor, i) => (
            <View key={i} style={styles.containerValor}>
              <Image source={valor.src} style={styles.valorImage} />
              <Text style={styles.valorText}>{valor.title}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* MISIÓN */}
      <View style={styles.containerMision}>
        <Image source={Icons.misionIcon} style={styles.misionImage} />
        <View style={styles.containerTextoMision}>
          <Text style={styles.h4}>Misión</Text>
          <Text style={styles.text}>
            Ofrecer una amplia gama de tuberías de alta calidad, diseñadas para
            satisfacer las necesidades de diversos sectores, desde la
            construcción hasta la industria. Nos comprometemos a brindar
            productos duraderos, con precios competitivos y un servicio
            excepcional que garantice la satisfacción y confianza de nuestros
            clientes.
          </Text>
        </View>
      </View>

      {/* VISIÓN */}
      <View style={styles.containerVision}>
        <Image source={Icons.visionIcon} style={styles.visionImage} />
        <View style={styles.containerTextoVision}>
          <Text style={styles.h4}>Visión</Text>
          <Text style={styles.text}>
            Ser la empresa de referencia en soluciones de tuberías, destacando
            por la innovación, calidad y sostenibilidad en cada uno de nuestros
            productos, contribuyendo al desarrollo de proyectos de
            infraestructura de clase mundial.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    marginTop: 40,
    backgroundColor: COLORS.WHITE,
  },
  bold: { fontWeight: "bold" },
  containerPadre: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    gap: 20,
  },
  aboutImage: {
    width: 180,
    height: 180,
    marginRight: 24,
    resizeMode: "contain",
  },
  containerTexto: {
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    padding: 30,
    maxWidth: 500,
  },
  text: {
    fontSize: 14,
    textAlign: "justify",
    marginBottom: 12,
  },
  containerValores: {
    textAlign: "center",
    alignItems: "center",
    backgroundColor: COLORS.SECONDARY,
    padding: 20,
  },
  h2: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 16,
  },
  valoresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 40,
  },
  containerValor: {
    borderRadius: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  valorImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
    resizeMode: "contain",
  },
  valorText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  containerMision: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 20,
    marginTop: 50,
    marginHorizontal: 20,
  },
  misionImage: {
    width: 140,
    height: 140,
    resizeMode: "contain",
  },
  containerTextoMision: {
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    padding: 24,
    maxWidth: 500,
  },
  h4: {
    fontSize: 32,
    color: COLORS.SECONDARY,
    marginBottom: 8,
  },
  containerVision: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: 50,
    marginBottom: 50,
    marginHorizontal: 20,
  },
  visionImage: {
    width: 140,
    height: 140,
    resizeMode: "contain",
  },
  containerTextoVision: {
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    padding: 24,
    maxWidth: 500,
  },
});
