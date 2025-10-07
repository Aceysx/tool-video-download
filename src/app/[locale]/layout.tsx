import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';

import { ThemeProvider } from 'next-themes';

import '@/app/globals.css';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { Toaster } from '@/registry/new-york-v4/ui/sonner';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'common' });

    return {
        title: {
            default: t('appName'),
            template: `%s | ${t('appName')}`
        },
        description: t('appDescription'),
        manifest: '/manifest.json',
        viewport: {
            width: 'device-width',
            initialScale: 1,
            maximumScale: 5
        },
        themeColor: [
            { media: '(prefers-color-scheme: light)', color: '#ffffff' },
            { media: '(prefers-color-scheme: dark)', color: '#000000' }
        ]
    };
}

export default async function LocaleLayout({
    children,
    params
}: Readonly<{
    children: ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    // 获取翻译消息
    const { locale } = await params;
    const messages = await getMessages({ locale });

    return (
        <html suppressHydrationWarning lang={locale}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground overscroll-none antialiased`}>
                {/* Google Analytics */}
                <GoogleAnalytics />

                {/* Google AdSense */}
                <Script
                    async
                    src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6374049973848571'
                    crossOrigin='anonymous'
                    strategy='afterInteractive'
                />

                <NextIntlClientProvider locale={locale} messages={messages}>
                    <ThemeProvider attribute='class'>
                        <div className='flex min-h-screen flex-col'>
                            <Navbar />
                            <main className='flex-1'>{children}</main>
                            <Footer />
                        </div>
                        <Toaster />
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
