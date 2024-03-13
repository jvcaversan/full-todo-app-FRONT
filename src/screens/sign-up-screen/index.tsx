import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationType } from "navigation/types";
import React from "react";
import { Button } from "react-native";
import { Box, Text } from "utils/theme";

const SignUpScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>();
  const navigateToSignUpScreen = () => {
    navigation.navigate("SignIn");
  };

  return (
    <Box>
      <Text>SignUpScreen</Text>
      <Button title="Navigate to Sign In" onPress={navigateToSignUpScreen} />
    </Box>
  );
};

export default SignUpScreen;
