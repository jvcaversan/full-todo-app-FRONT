import { useNavigation } from "@react-navigation/native";
import { CategoriesNavigationType } from "navigation/types";
import React from "react";
import { Pressable } from "react-native";
import theme, { Box, Text } from "utils/theme";
import { Feather } from "@expo/vector-icons";

const CreateNewList = () => {
  const navigation = useNavigation<CategoriesNavigationType>();

  const navigateToCreateCategory = () => {
    navigation.navigate("CreateCategory", {});
  };

  return (
    <Pressable onPress={navigateToCreateCategory}>
      <Box
        p="4"
        bg="gray300"
        borderRadius="rounded-5xl"
        flexDirection="row"
        alignItems="center"
      >
        <Feather name="plus" size={24} />

        <Text variant="textXl" fontWeight="600" ml="3">
          Create New List
        </Text>
      </Box>
    </Pressable>
  );
};

export default CreateNewList;
