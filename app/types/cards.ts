export interface CardsInfo {
    patch: string;
    classes: string[];
    sets: string[];
    standard: string[];
    wild: string[];
    types: string[];
    factions: string[];
    qualities: string[];
    races: string[];
    locales: Locales;
}

export interface Locales {
    DE_DE: string;
    EN_GB: string;
    EN_US: string;
    ES_ES: string;
    ES_MX: string;
    FR_FR: string;
    IT_IT: string;
    KO_KR: string;
    PL_PL: string;
    PT_BR: string;
    RU_RU: string;
    ZH_CN: string;
    ZH_TW: string;
    JA_JP: string;
    TH_TH: string;
}

export interface Cards {
    [key: string]: string[];
}
