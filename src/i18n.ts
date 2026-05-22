import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/locales/en/translation.json";
import vi from "@/locales/vi/translation.json";

const savedLang =
  typeof window !== "undefined" ? localStorage.getItem("app-language") : null;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: savedLang || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("app-language", lng);
    document.documentElement.lang = lng;
  }
});

export default i18n;
