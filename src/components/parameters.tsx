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
import { useTranslation } from "react-i18next";

export function Parameters() {
  const { t } = useTranslation();
  const {
    temperature,
    setTemperature,
    handleSubmit,
    isLoading,
    videoId,
    input,
    completion,
    setSelectedSession,
  } = useGenerateCompletion();

  const videoNotYetTranscription = !videoId;
  const promptNotYetSelected = !input;

  return (
    <aside className="md:w-80 px-1 md:px-0 w-full md:mb-0  mb-4 md:mt-0 mt-4  space-y-6">
      <VideoInputForm />
      <Separator />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label>{t("form_parameters.prompt")}</Label>
          <PromptSelect />
        </div>
        <div className="space-y-2">
          <Label>{t("form_parameters.model")}</Label>
          <Select defaultValue="gpt3.5" disabled>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
            </SelectContent>
          </Select>
          <span className="block text-xs text-muted-foreground italic">
            {t("form_parameters.model_tip")}
          </span>
        </div>
        <Separator />

        <div className="space-y-4">
          <Label className="flex justify-between w-full">
            {t("form_parameters.temperature")} <span>{temperature * 100}</span>
          </Label>

          <Slider
            min={0}
            max={1}
            step={0.1}
            defaultValue={[temperature]}
            onValueChange={(value) => setTemperature(value[0])}
          />
          <span className="block text-xs text-muted-foreground italic leading-relaxed">
            {t("form_parameters.temperature_tip")}
          </span>
        </div>

        <Separator />

        <Button
          disabled={
            isLoading || videoNotYetTranscription || promptNotYetSelected
          }
          type="submit"
          className="w-full"
          onClick={() => setSelectedSession("generated-response")}
        >
          {completion
            ? t("form_parameters.btn_submit.regenerate_response")
            : t("form_parameters.btn_submit.execute")}
          <Wand2 className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </aside>
  );
}
