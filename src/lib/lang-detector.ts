import LanguageDetector, {
  DetectorOptions,
} from "i18next-browser-languagedetector";

export const languageDetectorOptions = {
  // order and from where user language should be detected
  order: [
    "querystring",
    "cookie",
    "localStorage",
    "sessionStorage",
    "navigator",
    "htmlTag",
    "path",
    "subdomain",
  ],

  // keys or params to lookup language from
  lookupQuerystring: "lng",
  lookupCookie: "i18next",
  lookupLocalStorage: "i18nextLng",
  lookupSessionStorage: "i18nextLng",
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ["localStorage", "cookie"],
  excludeCacheFor: ["cimode"], // languages to not persist (cookie, localStorage)
};

export const languageDetector = new LanguageDetector();
languageDetector.addDetector({
  name: "fbLangDetector",

  lookup(options: DetectorOptions) {
    console.log("lookup", options);
    return "pt";
  },

  cacheUserLanguage(lng, options) {
    // options -> are passed in options
    // lng -> current language, will be called after init and on changeLanguage
    // store it
    console.log("cacheUserLanguage", lng, options);
  },
});
