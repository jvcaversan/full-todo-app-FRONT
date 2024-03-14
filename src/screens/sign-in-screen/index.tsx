import { useNavigation } from "@react-navigation/native";
import Button from "components/shared/button";
import Input from "components/shared/input";
import SafeAreaWrapper from "components/shared/safe-area-wrapper";
import { AuthScreenNavigationType } from "navigation/types";
import React from "react";
import { Pressable } from "react-native";
import { Box, Text } from "utils/theme";

const SignInScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>();
  const navigateToSignUpScreen = () => {
    navigation.navigate("SignUp");
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} px="5.5" justifyContent="center">
        <Text variant="textXl" fontWeight="700" mb="6">
          Bem-Vindo
        </Text>

        <Input label="Email" />
        <Box mb="6" />
        <Input label="Senha" />
        <Box mt="5.5" />
        <Pressable onPress={navigateToSignUpScreen}>
          <Text color="primary" textAlign="right">
            Faça o Cadastro
          </Text>
        </Pressable>

        <Box mb="5.5" />
        <Button label="Login" uppercase onPress={navigateToSignUpScreen} />
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignInScreen;
