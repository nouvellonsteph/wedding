// utils/translations.js

import enTranslations from '../i18/lang/en.json';
import frTranslations from '../i18/lang/fr.json';

const translations = {
  en: enTranslations,
  fr: frTranslations,
};

export const getTranslations = (locale) => translations[locale] || translations.en;