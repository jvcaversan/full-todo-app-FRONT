import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationType } from "navigation/types";
import React from "react";
import { Button } from "react-native";
import { Box, Text } from "utils/theme";

const WelcomeScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"Welcome">>();
  const navigateToSignUpScreen = () => {
    navigation.navigate("SignUp");
  };
  const navigateToSignInScreen = () => {
    navigation.navigate("SignIn");
  };
  return (
    <Box>
      <Text>Welcome</Text>
      <Button title="Navigate to Sign In" onPress={navigateToSignInScreen} />
      <Button title="Navigate to Sign Up" onPress={navigateToSignUpScreen} />
    </Box>
  );
};

export default WelcomeScreen;
