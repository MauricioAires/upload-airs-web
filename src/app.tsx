import { Home } from "@/pages/home";
import { GenerateCompletionProvider } from "@/context/generate-completion";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster as ToasterProvider } from "@/components/ui/toaster";

export function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <GenerateCompletionProvider>
          <Home />
        </GenerateCompletionProvider>
      </ThemeProvider>

      <ToasterProvider />
    </>
  );
}
