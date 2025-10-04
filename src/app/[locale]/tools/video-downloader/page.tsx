import type { Metadata } from 'next';

import { DownloadForm } from '@/components/video-downloader/download-form';

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

export default async function VideoDownloaderPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'videoDownloader' });

    return (
        <div className='container mx-auto px-4 py-8'>
            {/* 页面标题 */}
            <div className='mb-8 text-center'>
                <h1 className='mb-4 text-4xl font-bold'>🎬 {t('title')}</h1>
                <p className='text-muted-foreground text-lg'>{t('subtitle')}</p>
            </div>

            {/* 主内容 */}
            <div className='mx-auto max-w-4xl'>
                <DownloadForm />
            </div>

            {/* SEO 内容 */}
            <div className='prose prose-lg dark:prose-invert mx-auto mt-12 max-w-4xl'>
                <h2>{t('howToUse.title')}</h2>
                <ol>
                    <li>{t('howToUse.step1')}</li>
                    <li>{t('howToUse.step2')}</li>
                    <li>{t('howToUse.step3')}</li>
                    <li>{t('howToUse.step4')}</li>
                </ol>

                <h2>{t('features.title')}</h2>
                <ul>
                    <li>✅ {t('features.item1')}</li>
                    <li>✅ {t('features.item2')}</li>
                    <li>✅ {t('features.item3')}</li>
                    <li>✅ {t('features.item4')}</li>
                    <li>✅ {t('features.item5')}</li>
                    <li>✅ {t('features.item6')}</li>
                </ul>

                <h2>{t('faq.title')}</h2>

                <h3>{t('faq.q1.question')}</h3>
                <p>{t('faq.q1.answer')}</p>

                <h3>{t('faq.q2.question')}</h3>
                <p>{t('faq.q2.answer')}</p>

                <h3>{t('faq.q3.question')}</h3>
                <p>{t('faq.q3.answer')}</p>

                <h3>{t('faq.q4.question')}</h3>
                <p>{t('faq.q4.answer')}</p>

                <h3>{t('faq.q5.question')}</h3>
                <p>{t('faq.q5.answer')}</p>
            </div>
        </div>
    );
}
