import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SelectLanguage } from "./components/select-language";
import { SwitchTheme } from "./components/switch-theme";
import { ResultGenerated } from "./components/result-generated";
import { Parameters } from "./components/parameters";

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.airs</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden lg:block">
            Desenvolvido com 💙 no NLW da Rocketseat
          </span>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="outline">
            <Github className="w-4 h-4 lg:mr-2" />
            <span className="hidden lg:block">Github</span>
          </Button>
          <SwitchTheme />
          <SelectLanguage />
        </div>
      </div>
      <main className="flex-1 p-6 flex gap-6 flex-col-reverse md:flex-row">
        <ResultGenerated />
        <Parameters />
      </main>
    </div>
  );
}
