'use client';

import type { VideoInfo } from '@/lib/api/types';
import { Button } from '@/registry/new-york-v4/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/registry/new-york-v4/ui/dropdown-menu';

import { ChevronDown, Download, Image as ImageIcon, Music, Volume2, VolumeX } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Props {
    videoInfo: VideoInfo;
}

export function VideoPreview({ videoInfo }: Props) {
    const t = useTranslations('videoDownloader');
    const tCommon = useTranslations('common');

    const handleDownload = (url: string, filename: string) => {
        // 追踪下载事件
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'video_download', {
                platform: videoInfo.platform,
                filename: filename
            });
        }

        // 创建下载链接
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // 获取视频格式（用于主要按钮的下拉菜单）
    const videoFormats = videoInfo.formats?.filter((f) => f.quality >= 720) || [];
    const audioFormats = videoInfo.formats?.filter((f) => f.audio_url) || [];

    // 判断媒体类型
    const isImage = videoInfo.mediaType === 'image';
    const isAudio = videoInfo.mediaType === 'audio';

    return (
        <div className='space-y-8'>
            {/* 标题区域 - 优化样式 */}
            <div className='border-primary/20 rounded-xl border bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 p-6 text-center shadow-sm dark:from-blue-950/20 dark:to-purple-950/20'>
                <h2 className='text-xl font-bold text-gray-900 sm:text-2xl dark:text-gray-100'>{videoInfo.title}</h2>
                {videoInfo.author && (
                    <p className='text-muted-foreground mt-2 text-sm'>
                        {t('preview.author')}: <span className='font-medium'>{videoInfo.author.name}</span>
                    </p>
                )}
            </div>

            {/* 音频预览区域 */}
            {isAudio && (
                <div className='border-primary/20 rounded-2xl border-2 bg-gradient-to-br from-purple-50/50 via-transparent to-pink-50/50 p-6 shadow-lg sm:p-8 dark:from-purple-950/20 dark:to-pink-950/20'>
                    <div className='mx-auto max-w-2xl space-y-6'>
                        {/* 音频封面 */}
                        {videoInfo.thumbnail && (
                            <div className='relative mx-auto h-64 w-64 overflow-hidden rounded-2xl shadow-2xl'>
                                {}
                                <img
                                    src={videoInfo.thumbnail}
                                    alt={videoInfo.title}
                                    className='h-full w-full object-cover'
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent' />
                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <Music className='h-20 w-20 text-white/90 drop-shadow-lg' />
                                </div>
                            </div>
                        )}

                        {/* 音频播放器 */}
                        {videoInfo.downloadUrls.audio && (
                            <div className='rounded-xl bg-white/80 p-4 shadow-md backdrop-blur-sm dark:bg-gray-900/80'>
                                <audio controls className='w-full' src={videoInfo.downloadUrls.audio}>
                                    {t('preview.audioPlayerNotSupported')}
                                </audio>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 图片预览区域 */}
            {isImage && videoInfo.thumbnail && (
                <div className='border-primary/20 overflow-hidden rounded-2xl border-2 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent p-4 shadow-lg sm:p-6 dark:from-blue-950/20'>
                    <div className='relative mx-auto max-w-4xl'>
                        {}
                        <img
                            src={videoInfo.thumbnail}
                            alt={videoInfo.title}
                            className='h-auto w-full rounded-lg object-contain shadow-xl'
                            style={{ maxHeight: '70vh' }}
                        />
                        <div className='absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity hover:opacity-100' />
                    </div>
                </div>
            )}

            {/* 主要下载按钮 */}
            <div className='flex flex-wrap items-center justify-center gap-4'>
                {/* 音频类型：只显示下载音频按钮 */}
                {isAudio ? (
                    <Button
                        size='lg'
                        className='min-w-[180px] gap-2'
                        onClick={() =>
                            handleDownload(
                                videoInfo.downloadUrls.audio || videoInfo.downloadUrls.standard,
                                `${videoInfo.title}.${
                                    (videoInfo.downloadUrls.audio || videoInfo.downloadUrls.standard)
                                        .split('.')
                                        .pop() || 'm4a'
                                }`
                            )
                        }>
                        <Download className='h-5 w-5' />
                        {t('preview.downloadAudio')}
                    </Button>
                ) : isImage ? (
                    /* 图片类型：只显示下载图片按钮 */
                    <Button
                        size='lg'
                        className='min-w-[180px] gap-2'
                        onClick={() =>
                            handleDownload(
                                videoInfo.downloadUrls.standard,
                                `${videoInfo.title}.${videoInfo.downloadUrls.standard.split('.').pop() || 'jpg'}`
                            )
                        }>
                        <Download className='h-5 w-5' />
                        {t('preview.downloadImage')}
                    </Button>
                ) : (
                    <>
                        {/* 下载视频（带下拉菜单） */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size='lg' className='min-w-[180px] gap-2'>
                                    <Download className='h-5 w-5' />
                                    {t('preview.downloadVideo')}
                                    <ChevronDown className='h-4 w-4' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='center' className='w-56'>
                                {videoFormats.length > 0 ? (
                                    videoFormats.map((format) => (
                                        <DropdownMenuItem
                                            key={format.quality}
                                            onClick={() =>
                                                handleDownload(
                                                    format.video_url,
                                                    `${videoInfo.title}-${format.quality_note}.${format.video_ext}`
                                                )
                                            }>
                                            {format.quality_note} ({format.video_ext})
                                        </DropdownMenuItem>
                                    ))
                                ) : (
                                    <DropdownMenuItem
                                        onClick={() =>
                                            handleDownload(
                                                videoInfo.downloadUrls.hd || videoInfo.downloadUrls.standard,
                                                `${videoInfo.title}.mp4`
                                            )
                                        }>
                                        {t('preview.standardQuality')}
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* 下载封面 */}
                        {videoInfo.thumbnail && (
                            <Button
                                variant='outline'
                                size='lg'
                                className='min-w-[180px] gap-2'
                                onClick={() => handleDownload(videoInfo.thumbnail, `${videoInfo.title}-cover.jpg`)}>
                                <ImageIcon className='h-5 w-5' />
                                {t('preview.downloadCover')}
                            </Button>
                        )}

                        {/* 下载音频（带下拉菜单） */}
                        {videoInfo.downloadUrls.audio && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant='secondary' size='lg' className='min-w-[180px] gap-2'>
                                        <Music className='h-5 w-5' />
                                        {t('preview.downloadAudio')}
                                        <ChevronDown className='h-4 w-4' />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='center' className='w-56'>
                                    {audioFormats.length > 0 ? (
                                        audioFormats.map((format) => (
                                            <DropdownMenuItem
                                                key={`audio-${format.quality}`}
                                                onClick={() =>
                                                    handleDownload(
                                                        format.audio_url || '',
                                                        `${videoInfo.title}-audio.${format.audio_ext || 'm4a'}`
                                                    )
                                                }>
                                                {format.quality_note} ({format.audio_ext || 'm4a'})
                                            </DropdownMenuItem>
                                        ))
                                    ) : (
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleDownload(
                                                    videoInfo.downloadUrls.audio!,
                                                    `${videoInfo.title}-audio.m4a`
                                                )
                                            }>
                                            {t('preview.audio')}
                                        </DropdownMenuItem>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </>
                )}
            </div>

            {/* 更多视频分辨率下载选项（仅视频类型显示） */}
            {!isImage && videoInfo.formats && videoInfo.formats.length > 0 && (
                <div className='border-primary/20 rounded-2xl border-2 border-dashed bg-gradient-to-br from-blue-50/50 via-transparent to-transparent p-6 shadow-sm sm:p-8 dark:from-blue-950/20'>
                    <h3 className='mb-6 text-center text-base font-semibold text-blue-600 sm:text-lg dark:text-blue-400'>
                        🎬 {t('preview.moreResolutions')}
                    </h3>

                    {/* 画质按钮网格 */}
                    <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                        {videoInfo.formats
                            .sort((a, b) => b.quality - a.quality)
                            .map((format) => (
                                <Button
                                    key={format.quality}
                                    variant='outline'
                                    className='group relative flex h-auto flex-col items-center gap-2 overflow-hidden border-gray-200 bg-white p-4 transition-all hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-500 dark:hover:bg-blue-950/30'
                                    onClick={() =>
                                        handleDownload(
                                            format.video_url,
                                            `${videoInfo.title}-${format.quality_note}.${format.video_ext}`
                                        )
                                    }>
                                    {/* 背景装饰 */}
                                    <div className='absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/0 to-purple-500/0 opacity-0 transition-opacity group-hover:opacity-10' />

                                    <div className='flex items-center gap-2'>
                                        <Download className='h-4 w-4 transition-transform group-hover:scale-110' />
                                        <span className='font-bold text-gray-900 dark:text-gray-100'>
                                            {format.quality_note}
                                        </span>
                                    </div>
                                    <div className='text-muted-foreground flex items-center gap-2 text-xs'>
                                        <span className='text-gray-600 dark:text-gray-400'>({format.video_ext})</span>
                                        {format.separate === 0 ? (
                                            <span title={t('preview.withAudio')} className='flex items-center'>
                                                <Volume2 className='h-3 w-3 text-green-600 dark:text-green-500' />
                                            </span>
                                        ) : (
                                            <span title={t('preview.noAudio')} className='flex items-center'>
                                                <VolumeX className='h-3 w-3 text-gray-400' />
                                            </span>
                                        )}
                                    </div>
                                </Button>
                            ))}
                    </div>

                    <div className='mt-6 rounded-lg bg-yellow-50/50 p-4 dark:bg-yellow-950/20'>
                        <p className='text-center text-sm text-yellow-800 dark:text-yellow-200'>
                            💡 <span className='font-medium'>{t('preview.tip')}：</span>
                            {t('preview.resolutionTip')}
                            <Volume2 className='mx-1 inline h-3 w-3 text-green-600' />
                            {t('preview.audioIconTip')}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
