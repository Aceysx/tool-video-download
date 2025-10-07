import type { Metadata } from 'next';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';

import { CheckCircle, Download, Globe, Shield, Zap } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'about' });
    const tCommon = await getTranslations({ locale, namespace: 'common' });
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yourdomain.com';
    const currentUrl = locale === 'zh-CN' ? `${baseUrl}/about` : `${baseUrl}/${locale}/about`;
    // 每个语言版本都使用自己的 URL 作为 canonical

    return {
        title: `${t('title')} - ${tCommon('appName')}`,
        description: t('subtitle'),
        alternates: {
            canonical: currentUrl,
            languages: {
                'zh-CN': `${baseUrl}/about`,
                en: `${baseUrl}/en/about`,
                'x-default': `${baseUrl}/about`
            }
        }
    };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'about' });

    return (
        <div className='container mx-auto max-w-4xl px-4 py-12 md:px-6 lg:px-8'>
            {/* 页面标题 */}
            <div className='mb-12 text-center'>
                <h1 className='from-foreground to-foreground/60 mb-4 bg-gradient-to-br bg-clip-text text-3xl font-bold text-transparent md:text-4xl'>
                    {t('title')}
                </h1>
                <p className='text-muted-foreground mx-auto max-w-2xl text-lg'>{t('subtitle')}</p>
            </div>

            {/* 网站介绍 */}
            <Card className='mb-8'>
                <CardHeader>
                    <CardTitle>{t('mission.title')}</CardTitle>
                    <CardDescription>{t('mission.description')}</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <p className='text-muted-foreground'>{t('mission.content1')}</p>
                    <p className='text-muted-foreground'>{t('mission.content2')}</p>
                </CardContent>
            </Card>

            {/* 功能特点 */}
            <div className='mb-8'>
                <h2 className='mb-6 text-2xl font-bold'>{t('whyChooseUs.title')}</h2>
                <div className='grid gap-6 sm:grid-cols-2'>
                    <Card>
                        <CardHeader>
                            <div className='bg-primary/10 text-primary mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl'>
                                <Download className='h-6 w-6' />
                            </div>
                            <CardTitle className='text-lg'>{t('whyChooseUs.noWatermark.title')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-muted-foreground text-sm'>{t('whyChooseUs.noWatermark.description')}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className='bg-primary/10 text-primary mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl'>
                                <Globe className='h-6 w-6' />
                            </div>
                            <CardTitle className='text-lg'>{t('whyChooseUs.multiPlatform.title')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-muted-foreground text-sm'>
                                {t('whyChooseUs.multiPlatform.description')}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className='bg-primary/10 text-primary mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl'>
                                <Zap className='h-6 w-6' />
                            </div>
                            <CardTitle className='text-lg'>{t('whyChooseUs.fast.title')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-muted-foreground text-sm'>{t('whyChooseUs.fast.description')}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className='bg-primary/10 text-primary mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl'>
                                <Shield className='h-6 w-6' />
                            </div>
                            <CardTitle className='text-lg'>{t('whyChooseUs.privacy.title')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-muted-foreground text-sm'>{t('whyChooseUs.privacy.description')}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* 使用提示 */}
            <Card className='bg-primary/5 border-primary/20'>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <CheckCircle className='text-primary h-5 w-5' />
                        {t('notice.title')}
                    </CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                    <p className='text-muted-foreground text-sm'>• {t('notice.point1')}</p>
                    <p className='text-muted-foreground text-sm'>• {t('notice.point2')}</p>
                    <p className='text-muted-foreground text-sm'>• {t('notice.point3')}</p>
                </CardContent>
            </Card>

            {/* 联系信息 */}
            <div className='mt-12 text-center'>
                <h2 className='mb-4 text-2xl font-bold'>{t('contact.title')}</h2>
                <p className='text-muted-foreground'>{t('contact.description')}</p>
                <div className='text-muted-foreground mt-4 space-y-2'>
                    <p>Email: acey@163.com</p>
                </div>
            </div>
        </div>
    );
}
