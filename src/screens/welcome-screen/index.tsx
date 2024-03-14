import { useNavigation } from "@react-navigation/native";
import Button from "components/shared/button";
import SafeAreaWrapper from "components/shared/safe-area-wrapper";
import { LinearGradient } from "expo-linear-gradient";
import { AuthScreenNavigationType } from "navigation/types";
import React from "react";
import { Image } from "react-native";
import { Box, Text } from "utils/theme";

const WelcomeScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"Welcome">>();
  const navigateToSignUpScreen = () => {
    navigation.navigate("SignUp");
  };
  const navigateToSignInScreen = () => {
    navigation.navigate("SignIn");
  };

  const BLOSSOM_IMAGE =
    "https://res.cloudinary.com/dooxt2sgsdooxt2sgs23233/image/upload/v1676809769/youtube/2023/february/blossom/icon_fb36u3.png";

  return (
    <SafeAreaWrapper>
      <LinearGradient
        colors={[
          "#ffffff",
          "#fcecff",
          "#f8daff",
          "#fad2ff",
          "#fad2ff",
          "#ffffff",
        ]}
        style={{ flex: 1 }}
      >
        <Box flex={1} justifyContent="center">
          <Box alignItems="center" mb="3.5">
            <Image
              source={{
                uri: BLOSSOM_IMAGE,
                width: 120,
                height: 120,
              }}
            />
          </Box>
          <Text textAlign="center" fontWeight="700" variant="textXl">
            Você quer ser mais produtivo?
          </Text>
          <Box my="3.5" mx="10">
            <Button
              label="Começe sua jornada"
              onPress={navigateToSignUpScreen}
            />
          </Box>
          <Text
            textAlign="center"
            fontWeight="700"
            variant="textXs"
            color="gray5"
          >
            28.500 registros hoje
          </Text>
        </Box>
      </LinearGradient>
    </SafeAreaWrapper>
  );
};

export default WelcomeScreen;
