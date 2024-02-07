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
          more: "More information",
          check: "Checking results",
          check_info:
            "Comparing the answers of the model and real answers from dataset",
          acc: "accuracy rate",
          id: "Transaction ID",
          correct: "Correct",
          fraud: "Is it Fraud or not ?",
          ModelPrediction: "Model Prediction",
          RealData: "Real Data",
        },
      },
      uz: {
        translation: {
          frauddetect: "Firibgarlikni aniqlash",
          drop: "Bu yerga .csv yoki .xlsx faylini tashlang",
          start: "Tahlil qilishni boshlang",
          select: "Fayl turini tanlang",
          more: "Batafsil ma'lumot",
          check: "Natijalarni tekshirish",
          check_info:
            "Modelning javoblarini va ma'lumotlar to'plamidan haqiqiy javoblarni solishtirish",
          acc: "aniqlik darajasi",
          id: "Tranzaksiya identifikatori",
          correct: "To'gri",
          fraud: "Bu Firibgarlikmi yoki yo'qmi?",
          ModelPrediction: "Modal bashorat",
          RealData: "Haqiqiy ma'lumotlar",
        },
      },
      ru: {
        translation: {
          frauddetect: "Обнаружение мошенничества",
          drop: "Перетащите сюда файл .csv или .xlsx.",
          start: "Начните анализировать",
          select: "Выберите тип файла",
          more: "Больше информации",
          check: "Проверка результатов",
          check_info:
            "Сравнение ответов модели и реальных ответов из набора данных",
          acc: "точность",
          id: "ID транзакции",
          correct: "Правильный",
          fraud: "Это мошенничество или нет?",
          ModelPrediction: "Модальное предсказание",
          RealData: "Реальные данные",
        },
      },
    },
  });
