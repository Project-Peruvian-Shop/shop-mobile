import { Icons } from "@/assets/images/icons";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Redes() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };
  const RRSS = {
    facebook: "https://www.facebook.com/share/17ah7ixGMp/",
    instagram: "https://www.instagram.com/tuberias_peruanito_s.a.c/",
    whatsapp:
      "https://api.whatsapp.com/send/?phone=51922723633&text=Hola+Tuber%C3%ADas+Peruanito%2C+vengo+de+la+p%C3%A1gina+web%2C+tengo+una+consulta+&type=phone_number&app_absent=0",
    tiktok: "https://www.tiktok.com/@tuberias_peruanito_s.a.c",
    email:
      "https://outlook.office.com/mail/deeplink/compose?to=wilmer.guevara@tuberiasperuanito.com&subject&body=Hola Tuberías Peruanito, vengo de la página web, tengo una consulta",
    maps: "https://maps.app.goo.gl/hMFTmbMHwx1EPy8C8",
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
      <View style={styles.containerContacto}>
        {/* WhatsApp */}
        <View style={styles.containerRedes}>
          <Text style={styles.label}>Whatsapp</Text>
          <Text style={styles.value}>+51 922 723 633</Text>
        </View>

        {/* Email */}
        <View style={styles.containerRedes}>
          <Text style={styles.label}>Email</Text>
          <TouchableOpacity onPress={() => openLink(RRSS.email)}>
            <Text style={styles.value}>wilmer.guevara@tuberiasperuanito.com</Text>
          </TouchableOpacity>
        </View>

        {/* Redes Sociales */}
        <View style={styles.containerRedes}>
          <Text style={styles.label}>Redes Sociales</Text>

          <View style={styles.iconsRow}>
            <TouchableOpacity onPress={() => openLink(RRSS.whatsapp)}>
              <Image source={Icons.whatsappPri} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => openLink(RRSS.facebook)}>
              <Image source={Icons.facebook} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => openLink(RRSS.instagram)}>
              <Image source={Icons.instagram} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => openLink(RRSS.tiktok)}>
              <Image source={Icons.tiktok} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  containerContacto: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: 20,
    width: "100%",
    maxWidth: 1200,
    alignSelf: "center",
  },

  containerRedes: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 150,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1b2f33",
    marginBottom: 4,
  },

  value: {
    fontSize: 15,
    color: "#3a3a3a",
    textAlign: "center",
  },

  iconsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 12,
  },

  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
});
