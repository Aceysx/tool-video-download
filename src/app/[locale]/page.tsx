import { LazyAdUnit, useAdSensePreload } from '@/components/ads/lazy-ad-unit';
import { PlatformLogo } from '@/components/platform-logo';
import { FAQPageSchema, HowToSchema, WebApplicationSchema } from '@/components/seo/structured-data';
import { VideoDownloadSection } from '@/components/video-downloader/video-download-section';
import { getAllPlatforms } from '@/lib/video/platforms';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Analytics } from '@vercel/analytics/next';

import { CheckCircle, Download, Globe, Shield, Zap } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'home' });
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yourdomain.com';
    const currentUrl = locale === 'zh-CN' ? baseUrl : `${baseUrl}/${locale}`;

    return {
        title: t('title'),
        description: t('description'),
        keywords:
            locale === 'zh-CN'
                ? '视频下载,去水印,抖音下载,tiktok下载,instagram下载,suno音乐下载,视频解析,无水印视频,在线视频下载'
                : 'video downloader,watermark remover,tiktok downloader,instagram downloader,suno music download,video parser,no watermark,online video downloader',
        authors: [{ name: locale === 'zh-CN' ? '视频下载工具' : 'Video Downloader' }],
        creator: locale === 'zh-CN' ? '视频下载工具' : 'Video Downloader',
        publisher: locale === 'zh-CN' ? '视频下载工具' : 'Video Downloader',
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1
            }
        },
        alternates: {
            canonical: currentUrl,
            languages: {
                'zh-CN': baseUrl,
                'en': `${baseUrl}/en`,
                'x-default': baseUrl
            }
        },
        openGraph: {
            type: 'website',
            locale: locale === 'zh-CN' ? 'zh_CN' : 'en_US',
            url: currentUrl,
            title: t('title'),
            description: t('description'),
            siteName: locale === 'zh-CN' ? '视频下载工具' : 'Video Downloader',
            images: [
                {
                    url: `${baseUrl}/og-image.jpg`,
                    width: 1200,
                    height: 630,
                    alt: t('title')
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
            images: [`${baseUrl}/og-image.jpg`]
        }
    };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'home' });
    const tVideo = await getTranslations({ locale, namespace: 'videoDownloader' });
    const platforms = getAllPlatforms();

    return (
        <>
            {/* 结构化数据 - SEO */}
            <WebApplicationSchema locale={locale} />
            <FAQPageSchema locale={locale} />
            <HowToSchema locale={locale} />

            <div className='flex flex-col'>
                {/* Hero Section with Gradient Background */}
                <section className='relative overflow-hidden'>
                    {/* Gradient Background */}
                    <div className='from-primary/5 via-background to-primary/10 absolute inset-0 -z-10 bg-gradient-to-br' />
                    <div className='from-primary/20 absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] via-transparent to-transparent' />

                    <div className='container mx-auto max-w-7xl px-4 md:px-6 lg:px-8'>
                        <div className='flex flex-col items-center justify-center space-y-6 py-12 text-center md:py-20'>
                            <h1 className='animate-in fade-in slide-in-from-bottom-4 from-foreground to-foreground/60 bg-gradient-to-br bg-clip-text text-3xl font-bold tracking-tight text-transparent duration-1000 sm:text-4xl md:text-5xl lg:text-6xl'>
                                {t('title')}
                            </h1>

                            <p className='animate-in fade-in slide-in-from-bottom-4 text-muted-foreground max-w-[700px] text-sm delay-200 duration-1000 sm:text-base md:text-lg'>
                                {t('description')}
                            </p>

                            {/* 支持的平台 - 网格布局 */}
                            <div className='animate-in fade-in slide-in-from-bottom-4 w-full max-w-5xl pt-4 delay-300 duration-1000'>
                                <p className='text-muted-foreground mb-4 text-xs sm:text-sm'>
                                    {t('supportedPlatforms.title')}
                                </p>
                                <div className='grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6'>
                                    {platforms.map((p, index) => (
                                        <div
                                            key={p.key}
                                            className='group border-border/50 bg-card/50 hover:border-primary/50 hover:bg-card/80 hover:shadow-primary/20 relative overflow-hidden rounded-xl border p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg'
                                            style={{ animationDelay: `${index * 50}ms` }}>
                                            <div className='flex flex-col items-center gap-2'>
                                                <div className='transition-transform duration-300 group-hover:scale-110'>
                                                    <PlatformLogo
                                                        name={p.config.name}
                                                        icon={p.config.icon}
                                                        logo={p.config.logo}
                                                        size={32}
                                                    />
                                                </div>
                                                <span className='text-muted-foreground group-hover:text-foreground text-xs font-medium transition-colors'>
                                                    {p.config.name}
                                                </span>
                                            </div>
                                            {/* Glow effect on hover */}
                                            <div className='from-primary/0 via-primary/0 to-primary/0 absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-20' />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 视频下载工具 */}
                <section className='container mx-auto max-w-7xl px-4 pb-12 md:px-6 md:pb-16 lg:px-8'>
                    <div className='mx-auto max-w-4xl'>
                        <VideoDownloadSection />

                        {/* 懒加载广告单元 - 在下载工具下方 */}
                        <div className='mt-8'>
                            <LazyAdUnit
                                adSlot='1234567890'
                                adFormat='auto'
                                className='overflow-hidden rounded-lg'
                                fallbackHeight={200}
                            />
                        </div>
                    </div>
                </section>

                {/* Features Section with Modern Cards */}
                <section className='border-border/40 relative border-t py-12 md:py-20'>
                    {/* Background Pattern */}
                    <div className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]' />

                    <div className='container mx-auto max-w-7xl px-4 md:px-6 lg:px-8'>
                        <div className='mb-12 text-center'>
                            <h2 className='from-foreground to-foreground/60 mb-3 bg-gradient-to-br bg-clip-text text-2xl font-bold text-transparent md:text-3xl'>
                                {t('features.title')}
                            </h2>
                            <div className='bg-primary mx-auto h-1 w-20 rounded-full' />
                        </div>

                        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                            <Card className='group border-border/50 bg-card/50 hover:border-primary/50 hover:shadow-primary/10 relative overflow-hidden backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl'>
                                <div className='from-primary/0 via-primary/5 to-primary/0 absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                                <CardHeader className='space-y-3'>
                                    <div className='bg-primary/10 text-primary inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3'>
                                        <Download className='h-6 w-6' />
                                    </div>
                                    <CardTitle className='text-lg'>{t('features.noWatermark.title')}</CardTitle>
                                    <CardDescription className='text-sm'>
                                        {t('features.noWatermark.description')}
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className='group border-border/50 bg-card/50 hover:border-primary/50 hover:shadow-primary/10 relative overflow-hidden backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl'>
                                <div className='from-primary/0 via-primary/5 to-primary/0 absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                                <CardHeader className='space-y-3'>
                                    <div className='bg-primary/10 text-primary inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3'>
                                        <Globe className='h-6 w-6' />
                                    </div>
                                    <CardTitle className='text-lg'>{t('features.multiPlatform.title')}</CardTitle>
                                    <CardDescription className='text-sm'>
                                        {t('features.multiPlatform.description')}
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className='group border-border/50 bg-card/50 hover:border-primary/50 hover:shadow-primary/10 relative overflow-hidden backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl'>
                                <div className='from-primary/0 via-primary/5 to-primary/0 absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                                <CardHeader className='space-y-3'>
                                    <div className='bg-primary/10 text-primary inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3'>
                                        <CheckCircle className='h-6 w-6' />
                                    </div>
                                    <CardTitle className='text-lg'>{t('features.highQuality.title')}</CardTitle>
                                    <CardDescription className='text-sm'>
                                        {t('features.highQuality.description')}
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className='group border-border/50 bg-card/50 hover:border-primary/50 hover:shadow-primary/10 relative overflow-hidden backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl'>
                                <div className='from-primary/0 via-primary/5 to-primary/0 absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                                <CardHeader className='space-y-3'>
                                    <Badge className='w-fit bg-gradient-to-r from-green-500 to-emerald-600 text-white'>
                                        FREE
                                    </Badge>
                                    <CardTitle className='text-lg'>{t('features.free.title')}</CardTitle>
                                    <CardDescription className='text-sm'>
                                        {t('features.free.description')}
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className='group border-border/50 bg-card/50 hover:border-primary/50 hover:shadow-primary/10 relative overflow-hidden backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl'>
                                <div className='from-primary/0 via-primary/5 to-primary/0 absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                                <CardHeader className='space-y-3'>
                                    <div className='bg-primary/10 text-primary inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3'>
                                        <Zap className='h-6 w-6' />
                                    </div>
                                    <CardTitle className='text-lg'>{t('features.fast.title')}</CardTitle>
                                    <CardDescription className='text-sm'>
                                        {t('features.fast.description')}
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className='group border-border/50 bg-card/50 hover:border-primary/50 hover:shadow-primary/10 relative overflow-hidden backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl'>
                                <div className='from-primary/0 via-primary/5 to-primary/0 absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                                <CardHeader className='space-y-3'>
                                    <div className='bg-primary/10 text-primary inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3'>
                                        <Shield className='h-6 w-6' />
                                    </div>
                                    <CardTitle className='text-lg'>{t('features.privacy.title')}</CardTitle>
                                    <CardDescription className='text-sm'>
                                        {t('features.privacy.description')}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className='container mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8'>
                    <div className='mx-auto max-w-3xl'>
                        <div className='mb-12 text-center'>
                            <h2 className='from-foreground to-foreground/60 mb-3 bg-gradient-to-br bg-clip-text text-2xl font-bold text-transparent md:text-3xl'>
                                {tVideo('faq.title')}
                            </h2>
                            <div className='bg-primary mx-auto h-1 w-20 rounded-full' />
                        </div>

                        <div className='space-y-4'>
                            <Card className='border-border/50 bg-card/50 hover:border-primary/30 backdrop-blur-sm transition-all duration-200 hover:shadow-md'>
                                <CardHeader>
                                    <h3 className='flex items-start gap-2 font-semibold'>
                                        <span className='text-primary mt-0.5'>Q:</span>
                                        {tVideo('faq.q1.question')}
                                    </h3>
                                    <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>
                                        {tVideo('faq.q1.answer')}
                                    </p>
                                </CardHeader>
                            </Card>

                            <Card className='border-border/50 bg-card/50 hover:border-primary/30 backdrop-blur-sm transition-all duration-200 hover:shadow-md'>
                                <CardHeader>
                                    <h3 className='flex items-start gap-2 font-semibold'>
                                        <span className='text-primary mt-0.5'>Q:</span>
                                        {tVideo('faq.q2.question')}
                                    </h3>
                                    <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>
                                        {tVideo('faq.q2.answer')}
                                    </p>
                                </CardHeader>
                            </Card>

                            <Card className='border-border/50 bg-card/50 hover:border-primary/30 backdrop-blur-sm transition-all duration-200 hover:shadow-md'>
                                <CardHeader>
                                    <h3 className='flex items-start gap-2 font-semibold'>
                                        <span className='text-primary mt-0.5'>Q:</span>
                                        {tVideo('faq.q3.question')}
                                    </h3>
                                    <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>
                                        {tVideo('faq.q3.answer')}
                                    </p>
                                </CardHeader>
                            </Card>

                            <Card className='border-border/50 bg-card/50 hover:border-primary/30 backdrop-blur-sm transition-all duration-200 hover:shadow-md'>
                                <CardHeader>
                                    <h3 className='flex items-start gap-2 font-semibold'>
                                        <span className='text-primary mt-0.5'>Q:</span>
                                        {tVideo('faq.q4.question')}
                                    </h3>
                                    <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>
                                        {tVideo('faq.q4.answer')}
                                    </p>
                                </CardHeader>
                            </Card>

                            <Card className='border-border/50 bg-card/50 hover:border-primary/30 backdrop-blur-sm transition-all duration-200 hover:shadow-md'>
                                <CardHeader>
                                    <h3 className='flex items-start gap-2 font-semibold'>
                                        <span className='text-primary mt-0.5'>Q:</span>
                                        {tVideo('faq.q5.question')}
                                    </h3>
                                    <p className='text-muted-foreground mt-2 text-sm leading-relaxed'>
                                        {tVideo('faq.q5.answer')}
                                    </p>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </section>
            </div>
            <Analytics />
        </>
    );
}
