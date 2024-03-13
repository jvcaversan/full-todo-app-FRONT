import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import Navigation from "navigation";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useUserGlobalStore from "store/useUserGlobalStore";
import theme from "utils/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar translucent />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
