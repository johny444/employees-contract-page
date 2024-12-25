// src/lang/translator.js
import { createI18n } from "vue-i18n";
import messages from "./index";

const locale = localStorage.getItem("i18n") || "en";
export const i18n = createI18n({
  locale,
  fallbackLocale: "en",
  messages,
});
