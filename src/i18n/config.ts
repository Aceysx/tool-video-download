/**
 * 国际化配置
 */

export const locales = ['zh-CN', 'en'] as const;
export const defaultLocale = 'zh-CN' as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
    'zh-CN': '简体中文',
    en: 'English'
};
