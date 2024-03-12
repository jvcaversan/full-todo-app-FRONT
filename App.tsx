import { ThemeProvider } from "@shopify/restyle";
import Button from "components/button";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import theme, { Text } from "utils/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Text variant="textXl">Abre seu aplicativo agora</Text>
        <Button />
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
