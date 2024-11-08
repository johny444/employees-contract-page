// src/lang/translator.js
import { createI18n } from "vue-i18n";
import messages from "./index";

// Get the current language from localStorage (if set)
const locale = localStorage.getItem("i18n") || "en"; // Default to 'en' if not set

// Create the i18n instance
export const i18n = createI18n({
  locale, // Set the initial language from localStorage or fallback
  fallbackLocale: "en", // Fallback language
  messages, // Your translations
});
