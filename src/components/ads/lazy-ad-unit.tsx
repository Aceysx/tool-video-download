'use client';

import { useEffect, useRef, useState } from 'react';

interface LazyAdUnitProps {
    adSlot: string;
    adFormat?: string;
    adStyle?: React.CSSProperties;
    className?: string;
    fallbackHeight?: number;
}

export function LazyAdUnit({
    adSlot,
    adFormat = 'auto',
    adStyle = { display: 'block' },
    className = '',
    fallbackHeight = 250
}: LazyAdUnitProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 延迟加载 AdSense 脚本
        const loadAdSense = () => {
            if (isLoaded) {
                return;
            }

            // 检查 AdSense 是否已加载
            if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
                setIsLoaded(true);

                return;
            }

            // 动态加载 AdSense 脚本
            const script = document.createElement('script');
            script.async = true;
            script.src =
                'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6374049973848571';
            script.crossOrigin = 'anonymous';
            script.onload = () => {
                setIsLoaded(true);
            };
            document.head.appendChild(script);
        };

        // 使用 Intersection Observer 检测广告单元是否可见
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isVisible) {
                        setIsVisible(true);
                        // 延迟 1 秒后加载 AdSense
                        setTimeout(loadAdSense, 1000);
                    }
                });
            },
            {
                rootMargin: '100px', // 提前 100px 开始加载
                threshold: 0.1
            }
        );

        if (adRef.current) {
            observer.observe(adRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [isLoaded, isVisible]);

    useEffect(() => {
        // 当 AdSense 加载完成且广告单元可见时，推送广告
        if (isLoaded && isVisible && adRef.current) {
            try {
                ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            } catch (error) {
                console.warn('AdSense push failed:', error);
            }
        }
    }, [isLoaded, isVisible]);

    return (
        <div
            ref={adRef}
            className={`ad-container ${className}`}
            style={{
                minHeight: fallbackHeight,
                ...adStyle
            }}>
            {!isVisible && (
                <div
                    className='flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800'
                    style={{ height: fallbackHeight }}>
                    <div className='text-sm text-gray-500'>广告加载中...</div>
                </div>
            )}

            {isVisible && (
                <ins
                    className='adsbygoogle'
                    style={adStyle}
                    data-ad-client='ca-pub-6374049973848571'
                    data-ad-slot={adSlot}
                    data-ad-format={adFormat}
                    data-full-width-responsive='true'
                />
            )}
        </div>
    );
}

// 预加载 AdSense 脚本的 Hook
export function useAdSensePreload() {
    useEffect(() => {
        // 在页面加载完成后预加载 AdSense 脚本
        const timer = setTimeout(() => {
            if (typeof window !== 'undefined' && !(window as any).adsbygoogle) {
                const script = document.createElement('script');
                script.async = true;
                script.src =
                    'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6374049973848571';
                script.crossOrigin = 'anonymous';
                document.head.appendChild(script);
            }
        }, 3000); // 3 秒后预加载

        return () => clearTimeout(timer);
    }, []);
}
