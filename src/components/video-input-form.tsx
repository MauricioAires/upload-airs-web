import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { FileVideo, Upload } from "lucide-react";

import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { getFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { api } from "@/lib/axios";

type Status = "waiting" | "converting" | "uploading" | "generating" | "success";

const statusMessages = {
  converting: "Convertendo",
  generating: "Transcrevendo",
  uploading: "Carregando",
  success: "Sucesso",
};

interface VideoInputFormProps {
  onVideoUploaded: (videoId: string) => void;
}

export function VideoInputForm({ onVideoUploaded }: VideoInputFormProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const promptElementRef = useRef<HTMLTextAreaElement | null>(null);
  const [status, setStatus] = useState<Status>("waiting");

  function handleFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.currentTarget;

    if (!files) {
      return;
    }

    const selectedFile = files[0];

    setVideoFile(selectedFile);
  }

  async function convertVideoToAudio(video: File) {
    console.log("Convert started");

    const ffmpeg = await getFFmpeg();

    await ffmpeg.writeFile("input.mp4", await fetchFile(video));

    // ffmpeg.on("log", (log) => {
    //   console.log(log);
    // });
    ffmpeg.on("progress", (progress) => {
      console.log(`Convert progress: ${Math.round(progress.progress * 100)}}`);
    });

    ffmpeg.exec([
      "-i",
      "input.mp4",
      "-map",
      "0:a",
      "-b:a",
      "20K",
      "-acodec",
      "libmp3lame",
      "output.mp3",
    ]);

    const data = await ffmpeg.readFile("output.mp3");

    const audioFileBlob = new Blob([data], { type: "audio/mpeg" });

    const audioFile = new File([audioFileBlob], "audio.mp3", {
      type: "audio/mpeg",
    });

    console.log("Convert finished.");

    return audioFile;
  }

  async function handleUploadVideo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const prompt = promptElementRef.current?.value;

    if (!videoFile) {
      return;
    }

    setStatus("converting");

    const audioFile = await convertVideoToAudio(videoFile);

    const data = new FormData();

    data.append("file", audioFile);

    setStatus("uploading");

    const response = await api.post("/videos", data);

    const videoId = response.data.video.id;

    setStatus("generating");

    await api.post(`/videos/${videoId}/transcription`, {
      prompt,
    });

    setStatus("success");

    onVideoUploaded(videoId);
  }

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null;
    }

    return URL.createObjectURL(videoFile);
  }, [videoFile]);
  return (
    <form onSubmit={handleUploadVideo} className="space-y-6">
      <label
        htmlFor="video"
        className="relative overflow-hidden border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
      >
        {previewURL ? (
          <>
            <video
              src={previewURL}
              className="absolute aspect-video object-cover inset-0 pointer-events-none"
            />
          </>
        ) : (
          <>
            <FileVideo className="w-4 h-4" />
            Selecione um vídeo
          </>
        )}
      </label>
      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={handleFileSelected}
      />
      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>
        <Textarea
          disabled={status != "waiting"}
          ref={promptElementRef}
          id="transcription_prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder="Inclua palavras-chave mencionadas no vídeo separadas por virgula ( , ) "
        ></Textarea>
      </div>

      <Button
        disabled={status != "waiting"}
        type="submit"
        className="w-full data-[success]:bg-emerald-400"
        data-success={status === "success"}
      >
        {status == "waiting" ? (
          <>
            Carregar vídeo
            <Upload className="w-4 h-4 ml-2" />
          </>
        ) : (
          statusMessages[status]
        )}
      </Button>
    </form>
  );
}
