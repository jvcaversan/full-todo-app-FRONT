import { useNavigation } from "@react-navigation/native";
import Button from "components/shared/button";
import Input from "components/shared/input";
import SafeAreaWrapper from "components/shared/safe-area-wrapper";
import { AuthScreenNavigationType } from "navigation/types";
import React from "react";
import { Pressable } from "react-native";
import { Box, Text } from "utils/theme";

const SignUpScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>();
  const navigateToSignInScreen = () => {
    navigation.navigate("SignIn");
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} px="5.5" mt={"13"}>
        <Text variant="textXl" fontWeight="700">
          Bem Vindo ao Blossom!
        </Text>
        <Text variant="textXl" fontWeight="700" mb="6">
          Sua jornada começa aqui
        </Text>

        <Input label="Nome" />
        <Box mb="6" />
        <Input label="Email" />
        <Box mb="6" />
        <Input label="Senha" />

        <Box mt="5.5" />

        <Pressable onPress={navigateToSignInScreen}>
          <Text color="primary" textAlign="right">
            Faça o Login
          </Text>
        </Pressable>

        <Box mb="5.5" />
        <Button label="Cadastrar" uppercase onPress={navigateToSignInScreen} />
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignUpScreen;
