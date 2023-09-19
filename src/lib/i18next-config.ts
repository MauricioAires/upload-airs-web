import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { languageDetector, languageDetectorOptions } from "./lang-detector";

const resources = {
  en: {
    translation: {
      powered_by: "Powered by 💙 in NLW by Rocketseat",
      languages: {
        brazil: "Brazil",
        united_states: "United States",
      },
    },
  },
  pt: {
    translation: {
      powered_by: "Desenvolvido com 💙 no NLW da Rocketseat",
      languages: {
        brazil: "Brasil",
        united_states: "Estados Unidos",
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
