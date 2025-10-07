'use client';

import { useRef, useState } from 'react';

import type { VideoInfo } from '@/lib/api/types';
import { detectPlatform } from '@/lib/video/platforms';
import { Alert, AlertDescription } from '@/registry/new-york-v4/ui/alert';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card } from '@/registry/new-york-v4/ui/card';
import { Input } from '@/registry/new-york-v4/ui/input';

import { VideoPreview } from './video-preview';
import { AlertCircle, Loader2, Music, Video } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export function VideoDownloadSection() {
    const locale = useLocale();
    const t = useTranslations('videoDownloader');
    const tCommon = useTranslations('common');
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
    const resultRef = useRef<HTMLDivElement>(null);
    console.log('Current locale:', locale, tCommon('appName'));
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setVideoInfo(null);

        console.log('🚀 开始解析视频...', 'Locale:', locale);

        // 验证URL
        const trimmedUrl = url.trim();
        if (!trimmedUrl) {
            console.log('❌ URL 为空');
            setError(t('errors.emptyUrl'));

            return;
        }

        console.log('📝 URL:', trimmedUrl);

        // 检测平台
        const platform = detectPlatform(trimmedUrl);
        if (!platform) {
            console.log('❌ 不支持的平台');
            setError(t('errors.unsupportedPlatform'));

            return;
        }

        console.log('✅ 检测到平台:', platform);

        setLoading(true);
        console.log('🔄 开始调用 API...');

        try {
            // 调用API解析视频
            const response = await fetch('/api/video/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: trimmedUrl, platform })
            });

            console.log('📡 API 响应状态:', response.status);

            const data = await response.json();
            console.log('📦 API 响应数据:', data);

            if (!response.ok) {
                throw new Error(data.error || 'Parse failed');
            }

            // 设置结果
            if (data.data) {
                setVideoInfo(data.data);
                console.log('✅ 解析成功！');

                // 滚动到结果区域
                setTimeout(() => {
                    resultRef.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 150);
            }

            // 追踪成功事件
            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'video_parsed', {
                    platform: platform,
                    success: true
                });
            }
        } catch (err: any) {
            console.error('❌ 解析失败:', err);
            setError(err.message || t('errors.parseFailed'));

            // 追踪错误
            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'video_parse_error', {
                    error: err.message
                });
            }
        } finally {
            setLoading(false);
            console.log('🏁 解析流程结束');
        }
    };

    const handleClear = () => {
        setUrl('');
        setError('');
        setVideoInfo(null);
    };

    return (
        <div className='space-y-6'>
            {/* 输入表单 - 玻璃态设计 */}
            <Card className='border-border/50 bg-card/50 relative overflow-hidden p-6 backdrop-blur-xl sm:p-8'>
                {/* 装饰性渐变背景 */}
                <div className='bg-primary/5 absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl' />
                <div className='bg-primary/5 absolute -bottom-10 -left-10 h-40 w-40 rounded-full blur-3xl' />

                <form onSubmit={handleSubmit} className='relative space-y-4'>
                    <div>
                        <div className='mb-3 flex items-center justify-between'>
                            <div className='text-muted-foreground flex items-center gap-3 text-xs'>
                                <div className='flex items-center gap-1'>
                                    <Video className='h-3.5 w-3.5' />
                                    <span>{t('form.video')}</span>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <Music className='h-3.5 w-3.5' />
                                    <span>{t('form.music')}</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 sm:flex-row'>
                            <div className='relative flex-1'>
                                <Input
                                    type='text'
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder={t('inputPlaceholder')}
                                    className='border-primary/20 bg-background/50 focus:border-primary/50 focus:bg-background/80 focus:shadow-primary/10 h-12 border-2 pr-10 pl-4 backdrop-blur-sm transition-all duration-200 focus:shadow-lg'
                                    disabled={loading}
                                />
                                {url && (
                                    <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                                        <div className='bg-primary/10 h-2 w-2 animate-pulse rounded-full' />
                                    </div>
                                )}
                            </div>
                            <Button
                                type='submit'
                                disabled={loading}
                                size='lg'
                                className='from-primary to-primary/80 shadow-primary/20 hover:shadow-primary/30 h-12 w-full bg-gradient-to-r shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl sm:w-auto sm:px-8'>
                                {loading ? (
                                    <>
                                        <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                                        {t('parsing')}
                                    </>
                                ) : (
                                    <>
                                        <span>{t('parseButton')}</span>
                                        <svg
                                            className='ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'>
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={2}
                                                d='M13 7l5 5m0 0l-5 5m5-5H6'
                                            />
                                        </svg>
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* 清空按钮 */}
                    {url && !loading && (
                        <Button
                            type='button'
                            variant='ghost'
                            onClick={handleClear}
                            size='sm'
                            className='hover:bg-muted/50 h-9 transition-all duration-200'>
                            {tCommon('clear')}
                        </Button>
                    )}

                    {/* 支持类型提示 */}
                    {!url && !loading && (
                        <div className='animate-in fade-in mt-4 rounded-lg bg-gradient-to-r from-blue-50/50 to-purple-50/50 p-3 dark:from-blue-950/20 dark:to-purple-950/20'>
                            <p className='text-muted-foreground text-center text-xs'>💡 {t('form.supportTip')}</p>
                        </div>
                    )}
                </form>

                {/* 错误提示 */}
                {error && (
                    <Alert
                        variant='destructive'
                        className='animate-in fade-in slide-in-from-top-2 mt-4 border-red-500/50 bg-red-500/10 backdrop-blur-sm duration-300'>
                        <AlertCircle className='h-4 w-4' />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </Card>

            {/* 视频预览 */}
            {videoInfo && (
                <div ref={resultRef} className='animate-in fade-in slide-in-from-bottom-4 scroll-mt-4 duration-500'>
                    <VideoPreview videoInfo={videoInfo} />
                </div>
            )}
        </div>
    );
}
