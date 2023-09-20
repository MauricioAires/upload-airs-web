import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { useGenerateCompletion } from "@/context/generate-completion";

export function PromptSelect() {
  const { t } = useTranslation();
  const { setInput, prompts, promptSelectedId, setPromptSelectedId } =
    useGenerateCompletion();

  function handlePromptSelected(promptId: string) {
    const selectedPrompt = prompts?.find((prompt) => prompt.id === promptId);

    if (!selectedPrompt) {
      return;
    }

    setPromptSelectedId(promptId);

    setInput(selectedPrompt.template);
  }

  return (
    <Select
      defaultValue={promptSelectedId}
      onValueChange={handlePromptSelected}
    >
      <SelectTrigger>
        <SelectValue placeholder={t("form_parameters.prompt_placeholder")} />
      </SelectTrigger>

      <SelectContent>
        {prompts?.map((prompt) => (
          <SelectItem key={prompt.id} value={prompt.id}>
            {prompt.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
