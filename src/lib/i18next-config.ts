import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { languageDetector, languageDetectorOptions } from "./lang-detector";

const resources = {
  "en-US": {
    translation: {
      powered_by: "Powered by 💙 in NLW by Rocketseat",
      languages: {
        placeholder: "Select a language",
        brazil: "Brazil",
        united_states: "United States",
      },
      form_parameters: {
        prompt: "Prompt",
        prompt_placeholder: "Select a prompt...",
        model: "Model",
        model_tip: "You will be able to customize this option soon",
        temperature: "Temperature",
        temperature_tip:
          "Higher values tend to make the result more creative and with possible errors.",
        btn_submit: {
          execute: "Generate",
          regenerate_response: "Regenerate response",
        },
      },
      form_video: {
        video: "Select a video",
        video_placeholder: "Transcribe another video",
        transcription_prompt: "Transcription prompt",
        transcription_prompt_placeholder:
          "Include keywords mentioned in the video separated by commas ( , )",
        btn_submit_waiting: "Generated transcript",
        btn_submit_converting: "Convertendo",
        btn_submit_generating: "Converting",
        btn_submit_uploading: "Loading",
        btn_submit_success: "Success",
        btn_submit_default: "Transcribe video",
      },
      result_generated: {
        prompt: "Prompt",
        prompt_placeholder: "Include the prompt for the AI...",
        result: "Result",
        result_placeholder: "Result generated by AI...",
        tip: "Remember: you can use the  <code className='text-primary'>{transcription}</code> variable in your prompt to add the transcript content of the selected video",
      },
      accordion: {
        parameterization: "Parameterization",
        generated_response: "Generated Response",
      },
      api_transcription: {
        success: "Video transcribed successfully!",
        error: "Uh oh! Something went wrong.",
      },
    },
  },
  "pt-BR": {
    translation: {
      powered_by: "Desenvolvido com 💙 no NLW da Rocketseat",
      languages: {
        placeholder: "Selecione um idioma",
        brazil: "Brasil",
        united_states: "Estados Unidos",
      },
      form_parameters: {
        prompt: "Prompt",
        prompt_placeholder: "Selecione um prompt...",
        model: "Modelo",
        model_tip: "Você poderá customizar essa opção em breve",
        temperature: "Temperatura",
        temperature_tip:
          "Valores mais altos tendem a deixar o resultado mais criativos e com possíveis erros.",
        btn_submit: {
          execute: "Gerar",
          regenerate_response: "Regenerar resposta",
        },
      },
      form_video: {
        video: "Selecione um vídeo",
        video_placeholder: "Transcrever outro video",
        transcription_prompt: "Prompt de transcrição",
        transcription_prompt_placeholder:
          "Inclua palavras-chave mencionadas no vídeo separadas por virgula ( , ) ",
        btn_submit_waiting: "Transcrição gerada",
        btn_submit_converting: "Convertendo",
        btn_submit_generating: "Transcrevendo",
        btn_submit_uploading: "Carregando",
        btn_submit_success: "Sucesso",
        btn_submit_default: "Transcrever vídeo",
      },
      result_generated: {
        prompt: "Prompt",
        prompt_placeholder: "Inclua o prompt para a IA...",
        result: "Resultado",
        result_placeholder: "Resultado gerado pela IA...",
        tip: "Lembre-se: você pode utilizar a variável  <code className='text-primary'>{transcription}</code> no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado",
      },
      accordion: {
        parameterization: "Parametrização",
        generated_response: "Resposta gerada",
      },
      api_transcription: {
        success: "Vídeo transcrito com sucesso!",
        error: "Ah, ah! Algo deu errado.",
      },
    },
  },
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    detection: languageDetectorOptions,
    resources,
    fallbackLng: ["pt", "en"],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
