import i18n from "i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initReactI18next } from "react-i18next";
import enTranslation from "@/locales/en";
import hrTranslation from "@/locales/hr";
import twemoji from "@twemoji/api";

const resources = {
    en: { translation: enTranslation },
    hr: { translation: hrTranslation },
};

export const languageMap = {
    en: "English",
    hr: "Hrvatski",
    de: "Deutsch",
    es: "Español",
    fr: "Français",
    it: "Italiano",
    pt: "Português",
    nl: "Nederlands",
    pl: "Polski",
    sv: "Svenska",
};

export const languageCodeMap = {
    English: "en",
    Hrvatski: "hr",
    Deutsch: "de",
    Español: "es",
    Français: "fr",
    Italiano: "it",
    Português: "pt",
    Nederlands: "nl",
    Polski: "pl",
    Svenska: "sv",
};

export type CourseLanguage = {
    code: string;
    flag: string;
};

export let courseLanguages: CourseLanguage[] = [
    {
        code: "en",
        flag: `${twemoji.base}svg/1f1ec-1f1e7.svg`,
    },
    {
        code: "hr",
        flag: `${twemoji.base}svg/1f1ed-1f1f7.svg`,
    },
    {
        code: "de",
        flag: `${twemoji.base}svg/1f1e9-1f1ea.svg`,
    },
    {
        code: "es",
        flag: `${twemoji.base}svg/1f1ea-1f1f8.svg`,
    },
    {
        code: "fr",
        flag: `${twemoji.base}svg/1f1eb-1f1f7.svg`,
    },
    {
        code: "it",
        flag: `${twemoji.base}svg/1f1ee-1f1f9.svg`,
    },
    {
        code: "pt",
        flag: `${twemoji.base}svg/1f1f5-1f1f9.svg`,
    },
    {
        code: "nl",
        flag: `${twemoji.base}svg/1f1f3-1f1f1.svg`,
    },
    {
        code: "pl",
        flag: `${twemoji.base}svg/1f1f5-1f1f1.svg`,
    },
    {
        code: "sv",
        flag: `${twemoji.base}svg/1f1f8-1f1ea.svg`,
    },
];

export const appLanguages = ["en", "hr"];

export function findFlag(code: string) {
    return courseLanguages.find((lang) => lang.code === code)?.flag;
}

let localizations: any;

export default async function loadLocales() {
    let savedLanguage = await AsyncStorage.getItem("language");

    if (!savedLanguage) {
        savedLanguage = Localization.getLocales()[0].languageCode;
    }

    await i18n.use(initReactI18next).init({
        resources,
        lng: savedLanguage || "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

    i18n.services.formatter?.add("lowercase", (value, lng, options) => {
        return value.toLowerCase();
    });

    i18n.services.formatter?.add("capitalize", (value, lng, options) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
    });
}

export { localizations };

export async function saveLocale(language: string | null) {
    if (!language) {
        await AsyncStorage.removeItem("language");
        return;
    }
    await AsyncStorage.setItem("language", language!);
}

export function compareTexts(text1: string, text2: string) {
    // Replace all extended characters with their base characters
    let t1 = text1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let t2 = text2.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Remove commas and periods
    t1 = t1.replace(/,/g, "").replace(/\./g, "");
    t2 = t2.replace(/,/g, "").replace(/\./g, "");

    return t1.trim().toLowerCase() === t2.trim().toLowerCase();
}
