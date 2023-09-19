import React, { createContext, useContext, useEffect, useState } from "react";
import { useCompletion } from "ai/react";
import { api } from "@/lib/axios";

/**
 * NOTE: Se você está olhando esse contexto e pensou - Esse contexto tem muitas responsabilidades (S - OLID)
 * sim, eu concordo, tem muitas responsabilidades, mas eu estou com preguiça de refatorar, se você
 * tiver um tempinho me envia um PR :)
 */
type VideoId = string | null;

interface Prompt {
  id: string;
  title: string;
  template: string;
}
interface GenerateCompletionContextDefaultValue {
  videoId: VideoId;
  setVideoId: (videoId: VideoId) => void;
  temperature: number;
  setTemperature: (temperature: number) => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  completion: string;
  isLoading: boolean;
  prompts: Prompt[] | null;
  promptSelectedId: string | undefined;
  setPromptSelectedId: (promptSelectedId: string | undefined) => void;
  videoFile: File | null;
  setVideoFile: (file: File) => void;
  promptTranscription: string | undefined;
  setPromptTranscription: (promptTranscription: string | undefined) => void;
}

const GenerateCompletionContext = createContext(
  {} as GenerateCompletionContextDefaultValue,
);

interface GenerateCompletionProviderProps {
  children: React.ReactNode;
}

export function GenerateCompletionProvider({
  children,
}: GenerateCompletionProviderProps) {
  const [videoId, setVideoId] = useState<VideoId>(null);
  const [temperature, setTemperature] = useState(0.5);
  const [prompts, setPrompts] = useState<Prompt[] | null>(null);
  const [promptSelectedId, setPromptSelectedId] = useState<undefined | string>(
    undefined,
  );
  const [promptTranscription, setPromptTranscription] = useState<
    string | undefined
  >("");

  const [videoFile, setVideoFile] = useState<File | null>(null);

  useEffect(() => {
    api.get("/prompts").then((response) => {
      setPrompts(response.data);
    });
  }, []);

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: `${import.meta.env.VITE_BASE_URL}/ai/complete`,
    body: {
      videoId,
      temperature,
    },
    headers: {
      "Content-type": "application/json",
    },
  });

  return (
    <GenerateCompletionContext.Provider
      value={{
        videoId,
        setVideoId,
        temperature,
        setTemperature,
        input,
        setInput,
        handleInputChange,
        handleSubmit,
        completion,
        isLoading,
        prompts,
        promptSelectedId,
        setPromptSelectedId,
        videoFile,
        setVideoFile,
        promptTranscription,
        setPromptTranscription,
      }}
    >
      {children}
    </GenerateCompletionContext.Provider>
  );
}

export const useGenerateCompletion = () =>
  useContext(GenerateCompletionContext);
