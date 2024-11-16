import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import ckb from "./locales/ckb";
import ar from "./locales/ar";

i18n.use(initReactI18next).init({
	resources: {
		en: { translation: en },
		ckb: { translation: ckb },
		ar: { translation: ar },
	},
	lng: "en", // Default language
	fallbackLng: "en",
	interpolation: {
		escapeValue: false, // React already escapes values
	},
});

export default i18n;
