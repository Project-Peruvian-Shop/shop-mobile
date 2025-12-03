import { Icons } from "@/assets/images/icons";
import { ContactCard } from "@/components/app/contact/card";
import FormContactenos from "@/components/app/contact/FormContact";
import Redes from "@/components/app/contact/Redes";
import { TitlePage } from "@/components/app/titlepage/titlepage";
import { ScrollView, View } from "react-native";

export default function ContactUs() {
  const RRSS = {
    whatsapp:
      "https://api.whatsapp.com/send/?phone=51922723633&text=Hola+Tuber%C3%ADas+Peruanito%2C+vengo+de+la+p%C3%A1gina+web%2C+tengo+una+consulta+&type=phone_number&app_absent=0",
    email:
      "https://outlook.office.com/mail/deeplink/compose?to=wilmer.guevara@tuberiasperuanito.com&subject&body=Hola Tuberías Peruanito, vengo de la página web, tengo una consulta",
    maps: "https://maps.app.goo.gl/hMFTmbMHwx1EPy8C8",
  };
  return (
    <ScrollView  style={{ flex: 1, }}>
      <TitlePage title="Contáctanos" />
        <View style={{ flex: 1, padding: 16, }}>
        <Redes />
        <FormContactenos />
        </View>
        <TitlePage title="Canales de atención" img={false} />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <ContactCard
            title="Teléfono"
            icon={Icons.facebook}
            route={RRSS.whatsapp}
          />
          <ContactCard
            title="Correo"
            icon={Icons.infoIcon}
            route={RRSS.email}
          />
          <ContactCard
            title="Dirección"
            icon={Icons.locationContact}
            route={RRSS.maps}
          />
        </View>
    </ScrollView>
  );
}
