import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from "../app/locales/en.json";
import es from "../app/locales/es.json";

import ptBR from "../app/locales/pt-BR.json";

const i18n = new I18n({
  en,
  es,
  pt: ptBR,      
  "pt-BR": ptBR, 
});

const locales = Localization.getLocales();

const deviceLocale =
  locales && locales.length > 0
    ? "locales[0].languageTag"
    : "en";



i18n.locale = deviceLocale;
i18n.enableFallback = true;

export default i18n;