/**
 * 支持的平台配置
 */

export interface PlatformConfig {
    name: string;
    icon: string; // emoji 图标（备用）
    logo?: string; // logo 图片路径
    regex: RegExp;
    color: string;
}

export const SUPPORTED_PLATFORMS: Record<string, PlatformConfig> = {
    douyin: {
        name: '抖音',
        icon: '🎶',
        logo: '/images/抖音.png',
        regex: /douyin\.com\/video\/|v\.douyin\.com\//,
        color: '#000000'
    },
    tiktok: {
        name: 'TikTok',
        icon: '🎵',
        logo: '/images/tiktok.png',
        regex: /tiktok\.com\/@.*\/video\/|vm\.tiktok\.com\//,
        color: '#000000'
    },
    youtube: {
        name: 'YouTube',
        icon: '▶️',
        logo: '/images/youtube.png',
        regex: /youtube\.com\/watch|youtu\.be\/|youtube\.com\/shorts\//,
        color: '#FF0000'
    },
    facebook: {
        name: 'Facebook',
        icon: '👤',
        logo: '/images/Facebook.png',
        regex: /facebook\.com\/.*\/videos\/|fb\.watch\//,
        color: '#1877F2'
    },
    instagram: {
        name: 'Instagram',
        icon: '📷',
        regex: /instagram\.com\/(p|reel|tv)\//,
        color: '#E4405F'
    },
    twitter: {
        name: 'Twitter/X',
        icon: '🐦',
        logo: '/images/Twitter:X.png',
        regex: /twitter\.com\/.*\/status\/|x\.com\/.*\/status\//,
        color: '#000000'
    },
    bilibili: {
        name: 'Bilibili',
        icon: '📺',
        logo: '/images/bilibili.png',
        regex: /bilibili\.com\/video\/|b23\.tv\//,
        color: '#00A1D6'
    },
    pinterest: {
        name: 'Pinterest',
        icon: '📌',
        logo: '/images/Pinterest.png',
        regex: /pinterest\.com\/pin\/|pin\.it\//,
        color: '#E60023'
    },
    reddit: {
        name: 'Reddit',
        icon: '🔴',
        logo: '/images/reddit.png',
        regex: /reddit\.com\/r\/.*\/comments\//,
        color: '#FF4500'
    },
    threads: {
        name: 'Threads',
        icon: '🧵',
        logo: '/images/threads.png',
        regex: /threads\.net\//,
        color: '#000000'
    },
    suno: {
        name: 'Suno',
        icon: '🎵',
        logo: '/images/suno.png',
        regex: /suno\.com\/|suno\.ai\//,
        color: '#FF6B6B'
    },
    kuaishou: {
        name: '更多',
        icon: '🎬',
        regex: /kuaishou\.com\/short-video\/|v\.kuaishou\.com\//,
        color: '#FF4906'
    }
};

/**
 * 检测视频平台
 */
export function detectPlatform(url: string): string | null {
    for (const [platform, config] of Object.entries(SUPPORTED_PLATFORMS)) {
        if (config.regex.test(url)) {
            return platform;
        }
    }

    return null;
}

/**
 * 获取平台配置
 */
export function getPlatformConfig(platform: string): PlatformConfig | null {
    return SUPPORTED_PLATFORMS[platform] || null;
}

/**
 * 获取所有支持的平台列表
 */
export function getAllPlatforms(): Array<{ key: string; config: PlatformConfig }> {
    return Object.entries(SUPPORTED_PLATFORMS).map(([key, config]) => ({
        key,
        config
    }));
}
