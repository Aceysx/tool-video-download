import type { MetadataRoute } from 'next';

import { locales } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yourdomain.com';

    // 生成所有语言版本的页面
    const routes = ['', '/tools/video-downloader', '/about', '/legal/privacy', '/legal/terms', '/legal/disclaimer'];

    const sitemap: MetadataRoute.Sitemap = [];

    // 为每个路由生成所有语言版本
    routes.forEach((route) => {
        locales.forEach((locale) => {
            const url = locale === 'zh-CN' ? `${baseUrl}${route}` : `${baseUrl}/${locale}${route}`;

            sitemap.push({
                url: url,
                lastModified: new Date(),
                changeFrequency: route === '' ? 'daily' : 'weekly',
                priority: route === '' ? 1.0 : route.includes('video-downloader') ? 0.9 : 0.5,
                alternates: {
                    languages: Object.fromEntries(
                        locales.map((l) => [l, l === 'zh-CN' ? `${baseUrl}${route}` : `${baseUrl}/${l}${route}`])
                    )
                }
            });
        });
    });

    return sitemap;
}
