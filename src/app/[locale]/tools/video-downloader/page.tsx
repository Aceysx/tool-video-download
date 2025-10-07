import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'videoDownloader' });

    return {
        title: t('title'),
        description: t('subtitle'),
        keywords: '视频下载,去水印,抖音下载,tiktok下载,instagram下载,suno音乐下载,视频解析,音乐下载',
        alternates: {
            canonical: `/${locale}/tools/video-downloader`,
            languages: {
                'zh-CN': '/zh-CN/tools/video-downloader',
                en: '/en/tools/video-downloader',
                ja: '/ja/tools/video-downloader',
                es: '/es/tools/video-downloader'
            }
        },
        openGraph: {
            title: t('title'),
            description: t('subtitle'),
            type: 'website',
            locale: locale
        }
    };
}