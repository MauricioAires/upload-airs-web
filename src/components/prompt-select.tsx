import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { useGenerateCompletion } from "@/context/generate-completion";

export function PromptSelect() {
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
        <SelectValue placeholder="Selecione um prompt..." />
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
