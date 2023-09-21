import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FileVideo, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { getFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { api } from "@/lib/axios";
import { useGenerateCompletion } from "@/context/generate-completion";
import { useTranslation } from "react-i18next";

type Status = "waiting" | "converting" | "uploading" | "generating" | "success";

export function VideoInputForm() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const statusMessages = {
    waiting: t("form_video.btn_submit_waiting"),
    converting: t("form_video.btn_submit_converting"),
    generating: t("form_video.btn_submit_generating"),
    uploading: t("form_video.btn_submit_uploading"),
    success: t("form_video.btn_submit_success"),
  };

  const {
    setVideoId,
    setVideoFile,
    videoFile,
    promptTranscription,
    videoId,
    setPromptTranscription,
  } = useGenerateCompletion();

  const [status, setStatus] = useState<Status>("waiting");

  const handleFileSelected = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;

    setVideoId(null);
    setPromptTranscription("");
    setStatus("waiting");

    if (!files) {
      return;
    }

    const selectedFile = files[0];

    setVideoFile(selectedFile);
  }, []);

  async function convertVideoToAudio(video: File) {
    console.log("Convert started");

    const ffmpeg = await getFFmpeg();

    await ffmpeg.writeFile("input.mp4", await fetchFile(video));

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

    const responseTranscription = await api
      .post(`/videos/${videoId}/transcription`, {
        prompt: promptTranscription,
      })
      .then(() => {
        toast({
          description: t("api_transcription.success"),
        });

        return true;
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: t("api_transcription.error"),
          description: err.response.data.error,
          duration: 8000, // 8 seconds
        });

        return false;
      });

    if (!responseTranscription) {
      setStatus("waiting");
      setVideoId(null);
      setVideoFile(null);

      return;
    }

    setStatus("success");

    setVideoId(videoId);
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
              className="video-preview absolute z-20 hover:z-10 aspect-video object-cover inset-0"
            />
            <div className="absolute hidden md:flex bg-gray-700/30  z-10  hover:z-20 justify-center items-center  text-white   inset-0  ">
              <span className="font-semibold">
                {t("form_video.video_placeholder")}
              </span>
            </div>
          </>
        ) : (
          <>
            <FileVideo className="w-4 h-4" />
            {t("form_video.video")}
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
        <Label htmlFor="transcription_prompt">
          {t("form_video.transcription_prompt")}
        </Label>
        <Textarea
          disabled={status !== "waiting" || videoId !== null}
          id="transcription_prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder={t("form_video.transcription_prompt_placeholder")}
          value={promptTranscription}
          onChange={(e) => setPromptTranscription(e.target.value)}
        ></Textarea>
      </div>

      <Button
        disabled={status !== "waiting" || videoId !== null || !videoFile}
        type="submit"
        className="w-full data-[status=success]:bg-emerald-400"
        data-status={videoId !== null ? "success" : status}
      >
        {status === "waiting" && videoId === null ? (
          <>
            {t("form_video.btn_submit_default")}
            <Upload className="w-4 h-4 ml-2" />
          </>
        ) : (
          statusMessages[status]
        )}
      </Button>
    </form>
  );
}
