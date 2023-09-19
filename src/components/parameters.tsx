import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { VideoInputForm } from "./video-input-form";
import { PromptSelect } from "./prompt-select";
import { useGenerateCompletion } from "@/context/generate-completion";

export function Parameters() {
  const { temperature, setTemperature, handleSubmit, isLoading } =
    useGenerateCompletion();

  return (
    <aside className="md:w-80 w-full md:mb-0  mb-4 md:mt-0 mt-4  space-y-6">
      <VideoInputForm />
      <Separator />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label>Prompt</Label>
          <PromptSelect />
        </div>
        <div className="space-y-2">
          <Label>Modelo</Label>
          <Select defaultValue="gpt3.5" disabled>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
            </SelectContent>
          </Select>
          <span className="block text-xs text-muted-foreground italic">
            Você poderá customizar essa opção em breve
          </span>
        </div>
        <Separator />

        <div className="space-y-4">
          <Label>Temperatura</Label>

          <Slider
            min={0}
            max={1}
            step={0.1}
            defaultValue={[temperature]}
            onValueChange={(value) => setTemperature(value[0])}
          />
          <span className="block text-xs text-muted-foreground italic leading-relaxed">
            Valores mais altos tendem a deixar o resultado mais criativos e com
            possíveis erros.
          </span>
        </div>

        <Separator />

        <Button disabled={isLoading} type="submit" className="w-full">
          Executar <Wand2 className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </aside>
  );
}
