import { defaultLocale, locales } from './i18n/config';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'as-needed'
});

export const config = {
    // 匹配所有路径，除了 api, _next, _vercel 和静态文件
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
