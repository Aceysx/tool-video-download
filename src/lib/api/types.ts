/**
 * API 类型定义
 */

export interface VideoParseRequest {
    url: string;
    platform?: string;
}

export interface VideoFormat {
    quality: number; // 画质数值 (如 1080, 720, 480)
    quality_note: string; // 画质标签 (如 "1080p", "720p")
    video_url: string; // 视频下载地址
    video_ext: string; // 视频格式 (如 "mp4", "webm")
    video_size?: number; // 视频文件大小
    audio_url?: string; // 音频下载地址（如果分离）
    audio_ext?: string; // 音频格式
    audio_size?: number; // 音频文件大小
    separate: number; // 0=视频音频合并，1=分离
    video_proxy_url?: string; // 代理下载地址
    audio_proxy_url?: string; // 音频代理地址
}

export interface VideoInfo {
    platform: string;
    title: string;
    author: {
        name: string;
        avatar?: string;
        url?: string;
    };
    thumbnail: string;
    duration?: number;
    downloadUrls: {
        standard: string;
        hd?: string;
        audio?: string;
    };
    formats?: VideoFormat[]; // 所有可用的画质格式
    watermarkFree: boolean;
    stats?: {
        views?: number;
        likes?: number;
        comments?: number;
    };
    description?: string;
    createdAt?: string;
    mediaType?: 'video' | 'audio' | 'image'; // 媒体类型
}

export interface VideoParseResponse {
    success: boolean;
    data?: VideoInfo;
    error?: string;
    fromCache?: boolean;
}
