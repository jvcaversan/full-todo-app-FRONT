import { ThemeProvider } from "@shopify/restyle";
import Navigation from "navigation";
import theme from "utils/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
    </ThemeProvider>
  );
}
