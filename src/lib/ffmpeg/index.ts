import { FFmpeg } from "@ffmpeg/ffmpeg";

/**
 * [?url] => faz a importação do arquivo de forma
 * assíncrona, só vai baixar o arquivo se ele for
 * requisitado
 */
import coreURL from "./ffmpeg-core.js?url";
import wasmURL from "./ffmpeg-core.wasm?url";
import workerURL from "./ffmpeg-worker.js?url";

let ffmpeg: FFmpeg | null;

/**
 *
 * @returns singleton
 */

export async function getFFmpeg() {
  if (ffmpeg) {
    return ffmpeg;
  }

  ffmpeg = new FFmpeg();

  if (!ffmpeg.loaded) {
    await ffmpeg.load({
      coreURL,
      wasmURL,
      workerURL,
    });
  }

  return ffmpeg;
}
