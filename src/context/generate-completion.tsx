import React, { createContext, useContext, useEffect, useState } from "react";
import { useCompletion } from "ai/react";

type VideoId = string | null;

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
      }}
    >
      {children}
    </GenerateCompletionContext.Provider>
  );
}

export const useGenerateCompletion = () =>
  useContext(GenerateCompletionContext);
