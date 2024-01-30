import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: "uz",
    resources: {
      en: {
        translation: {
          frauddetect: "Fraud Detection",
          drop: "Drop .csv or .xlsx file here",
          start: "Start analyzing",
          select: "Select filetype",
        },
      },
      uz: {
        translation: {
          frauddetect: "Firibgarlikni aniqlash",
          drop: "Bu yerga .csv yoki .xlsx faylini tashlang",
          start: "Tahlil qilishni boshlang",
          select: "Fayl turini tanlang",
        },
      },
      ru: {
        translation: {
          frauddetect: "Обнаружение мошенничества",
          drop: "Перетащите сюда файл .csv или .xlsx.",
          start: "Начните анализировать",
          select: "Выберите тип файла",
        },
      },
    },
  });
