import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface TitlePageProps {
  title: string;
}

export const TitlePage: React.FC<TitlePageProps> = ({ title }) => {
  const router = useRouter();

  const handlePress = () => {

    router.push("/");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.logo}
        contentFit="contain"
      />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
