import { HomeCard } from "@/components/app/card/card";
import { Title } from "@/components/app/title/title";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f6f8" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#f5f6f8" }}>
        {/* Hero section */}
        <View style={{ position: "relative" }}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={{ width: "100%", height: 200 }}
            resizeMode="cover"
          />
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.4)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Tuberías Peruanito S.A.C.
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
                marginTop: 6,
                textAlign: "center",
              }}
            >
              Flujo en movimiento. Soluciones tubulares eficientes.
            </Text>
          </View>
        </View>

        {/* Especialidades */}
        <Title title="ESPECIALIDADES" />

        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <HomeCard
              title="Cotización de tuberías"
              icon={require("@/assets/images/logo.png")}
            />
            <HomeCard
              title="Preguntas frecuentes"
              icon={require("@/assets/images/logo.png")}
            />
          </View>
        </View>

        {/* Productos */}
        <Title title="PRODUCTOS" />

        <View style={{ paddingVertical: 20 }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              paddingHorizontal: 16,
            }}
          >
            <HomeCard
              title="Alcantarillado"
              icon={require("@/assets/images/logo.png")}
            />
            <HomeCard
              title="Desagüe"
              icon={require("@/assets/images/logo.png")}
            />
            <HomeCard
              title="Fluidos de presión UF"
              icon={require("@/assets/images/logo.png")}
            />
            <HomeCard
              title="Fluidos de presión UP"
              icon={require("@/assets/images/logo.png")}
            />
            <HomeCard
              title="Instalaciones eléctricas"
              icon={require("@/assets/images/logo.png")}
            />
          </View>
        </View>

        {/* Footer */}
        <View
          style={{
            backgroundColor: "#0f1828",
            paddingVertical: 14,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 12 }}>
            © 2025 Tuberías Peruanito S.A.C.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
