import { ThemeProvider } from "@shopify/restyle";
import Navigation from "navigation";
import { StyleSheet, View } from "react-native";
import theme from "utils/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
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
