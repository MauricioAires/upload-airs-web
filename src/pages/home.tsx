import { Bot, Github, Wand2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SelectLanguage } from "@/components/select-language";
import { ResultGenerated } from "@/components/result-generated";
import { Parameters } from "@/components/parameters";
import { ModeToggle } from "@/components/mode-toggle";
import { useGenerateCompletion } from "@/context/generate-completion";

export function Home() {
  const { selectedSession, setSelectedSession } = useGenerateCompletion();
  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.airs</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden lg:block">
            Desenvolvido com 💙 no NLW da Rocketseat
          </span>
          <Separator orientation="vertical" className="h-6" />
          <a
            className="appearance-none"
            href="https://github.com/MauricioAires/upload-airs-web"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            <Button variant="outline">
              <Github className="w-4 h-4 lg:mr-2" />
              <span className="hidden lg:block">Github</span>
            </Button>
          </a>
          <ModeToggle />
          <SelectLanguage />
        </div>
      </div>

      {/* Mobile */}
      <main className="flex-1 p-6 flex  gap-6  md:flex-row md:hidden">
        <Accordion
          type="single"
          value={selectedSession}
          onValueChange={(value) => setSelectedSession(value)}
          collapsible
          className="w-full md:hidden"
        >
          <AccordionItem value="parameterization">
            <AccordionTrigger>
              <span className="flex  gap-2">
                <Wand2 className="w-4 h-4 ml-2" /> Parametrização
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <Parameters />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="generated-response">
            <AccordionTrigger>
              <span className="flex  gap-2">
                <Bot className="w-4 h-4 ml-2" /> Resposta gerada
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ResultGenerated />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
      {/* Desktop */}
      <main className="flex-1 p-6  gap-6  hidden md:flex">
        <ResultGenerated />
        <Parameters />
      </main>
    </div>
  );
}
