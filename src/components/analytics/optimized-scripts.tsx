'use client';

import { useEffect, useState } from 'react';

import Script from 'next/script';

const GA_MEASUREMENT_ID = 'G-2K4QQ6SDRY';
const ADSENSE_CLIENT_ID = 'ca-pub-6374049973848571';

export function OptimizedScripts() {
    const [isAdSenseLoaded, setIsAdSenseLoaded] = useState(false);
    const [isAnalyticsLoaded, setIsAnalyticsLoaded] = useState(false);

    // 延迟加载 AdSense 脚本 - 只在用户交互后加载
    useEffect(() => {
        const loadAdSense = () => {
            if (!isAdSenseLoaded) {
                setIsAdSenseLoaded(true);
            }
        };

        // 监听用户交互事件
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

        const addEventListeners = () => {
            events.forEach((event) => {
                document.addEventListener(event, loadAdSense, { once: true, passive: true });
            });
        };

        // 延迟 3 秒后开始监听用户交互
        const timer = setTimeout(addEventListeners, 3000);

        return () => {
            clearTimeout(timer);
            events.forEach((event) => {
                document.removeEventListener(event, loadAdSense);
            });
        };
    }, [isAdSenseLoaded]);

    // 延迟加载 Analytics - 使用更轻量的方式
    useEffect(() => {
        const loadAnalytics = () => {
            if (!isAnalyticsLoaded) {
                setIsAnalyticsLoaded(true);
            }
        };

        // 延迟 2 秒后加载 Analytics
        const timer = setTimeout(loadAnalytics, 2000);

        return () => clearTimeout(timer);
    }, [isAnalyticsLoaded]);

    return (
        <>
            {/* 优化的 Google Analytics - 使用 lazyOnload 策略 */}
            {isAnalyticsLoaded && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                        strategy='lazyOnload'
                    />
                    <Script id='google-analytics' strategy='lazyOnload'>
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${GA_MEASUREMENT_ID}', {
                                page_title: document.title,
                                page_location: window.location.href
                            });
                        `}
                    </Script>
                </>
            )}

            {/* 优化的 Google AdSense - 延迟加载 */}
            {isAdSenseLoaded && (
                <Script
                    async
                    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
                    crossOrigin='anonymous'
                    strategy='lazyOnload'
                />
            )}
        </>
    );
}

// 轻量级的 Analytics 组件 - 只加载核心功能
export function LightweightAnalytics() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // 延迟 5 秒后加载，确保页面主要内容已加载
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (!isLoaded) return null;

    return (
        <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy='lazyOnload' />
            <Script id='lightweight-analytics' strategy='lazyOnload'>
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_MEASUREMENT_ID}', {
                        send_page_view: false,
                        anonymize_ip: true
                    });
                `}
            </Script>
        </>
    );
}

// 条件加载的 AdSense 组件
export function ConditionalAdSense() {
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        // 只在用户滚动到页面底部或停留超过 10 秒时加载
        let scrollTimer: NodeJS.Timeout;
        let stayTimer: NodeJS.Timeout;

        const handleScroll = () => {
            if (window.scrollY > window.innerHeight * 0.5) {
                setShouldLoad(true);
                clearTimeout(scrollTimer);
            }
        };

        const handleStay = () => {
            stayTimer = setTimeout(() => {
                setShouldLoad(true);
            }, 10000);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleStay();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimer);
            clearTimeout(stayTimer);
        };
    }, []);

    if (!shouldLoad) return null;

    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin='anonymous'
            strategy='lazyOnload'
        />
    );
}
