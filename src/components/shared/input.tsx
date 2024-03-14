import { TextInput, TextInputProps } from "react-native";
import React from "react";
import theme, { Box, Text } from "utils/theme";

type InputProps = {
  label: string;
  error?: undefined;
} & TextInputProps;

const Input = ({ label }: InputProps) => {
  return (
    <Box flexDirection="column">
      <Text variant="textSm" textTransform="uppercase" mb="3.5">
        {label}
      </Text>
      <TextInput
        style={{
          padding: 16,
          borderWidth: 1,
          borderColor: theme.colors.grey,
          borderRadius: theme.borderRadii["rounded-7xl"],
        }}
        placeholder={label}
      />
    </Box>
  );
};

export default Input;
