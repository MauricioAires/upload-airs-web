import { Home } from "@/pages/home";
import { GenerateCompletionProvider } from "@/context/generate-completion";
import { ThemeProvider } from "@/components/theme-provider";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <GenerateCompletionProvider>
        <Home />
      </GenerateCompletionProvider>
    </ThemeProvider>
  );
}
