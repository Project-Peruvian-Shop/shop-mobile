import { Image } from "expo-image";
import { Text, View } from "react-native";
import { styles } from "./styles";

interface TitlePageProps {
  title: string;
}

export const TitlePage: React.FC<TitlePageProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.logo}
        contentFit="contain"
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
