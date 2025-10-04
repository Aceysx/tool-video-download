import { defaultLocale, locales } from './config';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
    // 验证 locale 是否在支持列表中，提供默认值
    const validLocale = locale && locales.includes(locale as any) ? locale : defaultLocale;

    return {
        locale: validLocale,
        messages: (await import(`./locales/${validLocale}.json`)).default
    };
});
