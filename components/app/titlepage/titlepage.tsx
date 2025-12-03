import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface TitlePageProps {
  title: string;
  img?: boolean;
}

export const TitlePage: React.FC<TitlePageProps> = ({ title, img = true }) => {
  const router = useRouter();

  const handlePress = () => {

    router.push("/");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
      {img && (
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          contentFit="contain"
        />
      )}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
