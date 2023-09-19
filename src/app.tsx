import { Home } from "@/pages/home";
import { GenerateCompletionProvider } from "@/context/generate-completion";

export function App() {
  return (
    <GenerateCompletionProvider>
      <Home />
    </GenerateCompletionProvider>
  );
}
