'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

export function Footer() {
    const t = useTranslations('footer');
    const params = useParams();
    const locale = params.locale as string;

    return (
        <footer className='border-border/40 bg-muted/30 mt-auto border-t'>
            <div className='container mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8'>
                <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
                    {/* 网站信息 */}
                    <div className='space-y-4'>
                        <div className='flex items-center space-x-2'>
                            <span className='text-xl font-bold'>🎬</span>
                            <span className='text-lg font-bold'>{t('description').split('，')[0]}</span>
                        </div>
                        <p className='text-muted-foreground text-sm'>{t('description')}</p>
                    </div>

                    {/* 快速链接 */}
                    <div className='space-y-4'>
                        <h3 className='text-sm font-semibold'>{t('links.title')}</h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link
                                    href={`/${locale}`}
                                    className='text-muted-foreground hover:text-foreground text-sm transition-colors'>
                                    {t('links.home')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/tools/video-downloader`}
                                    className='text-muted-foreground hover:text-foreground text-sm transition-colors'>
                                    {t('links.tools')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/about`}
                                    className='text-muted-foreground hover:text-foreground text-sm transition-colors'>
                                    {t('links.about')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 法律信息 */}
                    <div className='space-y-4'>
                        <h3 className='text-sm font-semibold'>{t('legal.title')}</h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link
                                    href={`/${locale}/legal/privacy`}
                                    className='text-muted-foreground hover:text-foreground text-sm transition-colors'>
                                    {t('legal.privacy')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/legal/terms`}
                                    className='text-muted-foreground hover:text-foreground text-sm transition-colors'>
                                    {t('legal.terms')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/legal/disclaimer`}
                                    className='text-muted-foreground hover:text-foreground text-sm transition-colors'>
                                    {t('legal.disclaimer')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 社交媒体 / 其他 */}
                    <div className='space-y-4'>
                        <h3 className='text-sm font-semibold'>{t('social.title')}</h3>
                        <div className='text-muted-foreground space-y-2 text-sm'>
                            <p>Twitter</p>
                            <p>Email</p>
                        </div>
                    </div>
                </div>

                {/* 版权信息 */}
                <div className='border-border/40 mt-8 border-t pt-8'>
                    <p className='text-muted-foreground text-center text-sm'>{t('copyright')}</p>
                </div>
            </div>
        </footer>
    );
}
