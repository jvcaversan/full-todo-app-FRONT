import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import theme, { Box, Text } from "utils/theme";
import { Ionicons } from "@expo/vector-icons";

const NavigateBack = () => {
  const navigation = useNavigation();
  const navigateBack = () => {
    navigation.goBack();
  };
  return (
    <Pressable onPress={navigateBack}>
      <Box bg="gray300" p="2" borderRadius="rounded-7xl">
        <Ionicons name="chevron-back" size={24} color={theme.colors.gray9} />
      </Box>
    </Pressable>
  );
};

export default NavigateBack;
