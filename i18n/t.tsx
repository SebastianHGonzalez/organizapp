import { getLocales } from "expo-localization";
import { Fragment, ReactNode } from "react";

export const DEFAULT_LANGUAGE = "es";

export const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require("../assets/locales/en.json"),
  es: () => require("../assets/locales/es.json"),
};

export function getCurrentLocale() {
  const locales = getLocales();
  return locales[0]?.languageCode || DEFAULT_LANGUAGE;
}

function getTranslations(): Record<string, string> {
  const currentLocale = getCurrentLocale();
  const translationGetter =
    (translationGetters as any)[currentLocale] ??
    translationGetters[DEFAULT_LANGUAGE];
  return translationGetter();
}

export function t(
  key: string,
  params?: Record<string, string | number>,
): string;
export function t(
  key: string,
  params?: Record<string, string | number | ReactNode>,
): ReactNode;
export function t(
  key: string,
  params?: Record<string, string | number | ReactNode>,
): string | ReactNode {
  // Traverse the JSON to get nested keys (e.g., "tabs.projects.title")
  const translation = get(getTranslations(), key);

  if (!translation) {
    console.warn(`Translation for key "${key}" not found.`);
    return key; // Fallback to the key itself if translation is missing
  }

  if (!params) return translation;

  const str = Object.keys(params).reduce((result, paramKey) => {
    if (
      typeof params[paramKey] === "string" ||
      typeof params[paramKey] === "number"
    ) {
      return result.replace(`{${paramKey}}`, params[paramKey].toString());
    }
    return result;
  }, translation);

  if (Object.values(params).some((p) => typeof p === "object")) {
    return str
      .split(/[{}]/)
      .map((strPart, i) => (
        <Fragment key={strPart + i}>{params[strPart] || strPart}</Fragment>
      ));
  }

  return str;
}

function get(translations: any, key: string) {
  return key.split(".").reduce((o, k) => o?.[k] ?? undefined, translations);
}
