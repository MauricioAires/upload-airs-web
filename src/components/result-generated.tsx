import { useGenerateCompletion } from "@/context/generate-completion";
import { Textarea } from "./ui/textarea";

export function ResultGenerated() {
  const { input, handleInputChange, completion } = useGenerateCompletion();

  return (
    <div className="flex mx-1 md:mx-0 md:mt-0 mt-4 flex-col md:h-auto h-[70dvh] flex-1  gap-4">
      <div className="grid grid-rows-2 gap-4 flex-1">
        <Textarea
          placeholder="Inclua o prompt para a IA..."
          className="resize-none p-4 leading-relaxed"
          value={input}
          onChange={handleInputChange}
        ></Textarea>
        <Textarea
          placeholder="Resultado gerado pela IA..."
          readOnly
          className="resize-none p-4 leading-relaxed"
          value={completion}
        ></Textarea>
      </div>
      <p className="text-sm px-2 text-center text-muted-foreground">
        Lembre-se: você pode utilizar a variável
        <code className="text-primary">{" {transcription} "}</code>
        no seu prompt para adicionar o conteúdo da transcrição do vídeo
        selecionado
      </p>
    </div>
  );
}
