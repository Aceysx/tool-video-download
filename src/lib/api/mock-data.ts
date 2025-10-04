/**
 * Mock 数据用于测试
 * 在没有真实 API 的情况下测试功能
 */
import type { VideoInfo } from './types';

export const MOCK_VIDEO_DATA: Record<string, VideoInfo> = {
    douyin: {
        platform: 'douyin',
        title: '【抖音测试】超火的舞蹈视频 #抖音热门',
        author: {
            name: '测试用户_抖音',
            avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
            url: 'https://www.douyin.com/@testuser'
        },
        thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800',
        duration: 15,
        downloadUrls: {
            standard: 'https://www.w3schools.com/html/mov_bbb.mp4',
            hd: 'https://www.w3schools.com/html/mov_bbb.mp4',
            audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        },
        watermarkFree: true,
        stats: {
            views: 1234567,
            likes: 123456,
            comments: 12345
        },
        description: '这是一个抖音测试视频，用于演示视频下载功能。包含音乐、舞蹈和特效。',
        createdAt: '2025-10-04T10:00:00Z'
    },
    tiktok: {
        platform: 'tiktok',
        title: 'Amazing Dance Challenge 🔥 #TikTok #Viral',
        author: {
            name: 'test_user_tiktok',
            avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
            url: 'https://www.tiktok.com/@testuser'
        },
        thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800',
        duration: 30,
        downloadUrls: {
            standard: 'https://www.w3schools.com/html/movie.mp4',
            hd: 'https://www.w3schools.com/html/movie.mp4'
        },
        watermarkFree: true,
        stats: {
            views: 2345678,
            likes: 234567,
            comments: 23456
        },
        description: 'TikTok viral dance challenge video for testing purposes.',
        createdAt: '2025-10-03T15:30:00Z'
    },
    instagram: {
        platform: 'instagram',
        title: 'Beautiful Sunset Timelapse 🌅',
        author: {
            name: 'photography_test',
            avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
            url: 'https://www.instagram.com/testuser'
        },
        thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800',
        duration: 60,
        downloadUrls: {
            standard: 'https://www.w3schools.com/html/mov_bbb.mp4'
        },
        watermarkFree: true,
        stats: {
            views: 987654,
            likes: 98765
        },
        description: 'Instagram reel test video showcasing beautiful sunset.',
        createdAt: '2025-10-02T18:00:00Z'
    },
    suno: {
        platform: 'suno',
        title: '【Suno AI】夏日海边的浪漫旋律 ✨',
        author: {
            name: 'AI Music Creator',
            avatar: 'https://avatars.githubusercontent.com/u/4?v=4'
        },
        thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
        duration: 180,
        downloadUrls: {
            standard: 'https://www.w3schools.com/html/horse.mp3',
            audio: 'https://www.w3schools.com/html/horse.mp3'
        },
        watermarkFree: true,
        stats: {
            views: 567890,
            likes: 56789,
            comments: 5678
        },
        description: 'Suno AI 生成的音乐作品，夏日海边主题。',
        createdAt: '2025-10-01T12:00:00Z',
        mediaType: 'audio'
    },
    youtube: {
        platform: 'youtube',
        title: 'How to Build a Next.js App - Tutorial',
        author: {
            name: 'Tech Tutorial Channel',
            avatar: 'https://avatars.githubusercontent.com/u/5?v=4',
            url: 'https://www.youtube.com/@testchannel'
        },
        thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800',
        duration: 600,
        downloadUrls: {
            standard: 'https://www.w3schools.com/html/mov_bbb.mp4',
            hd: 'https://www.w3schools.com/html/mov_bbb.mp4',
            audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        },
        watermarkFree: true,
        stats: {
            views: 3456789,
            likes: 345678,
            comments: 34567
        },
        description: 'Complete Next.js tutorial for beginners. Learn how to build modern web applications.',
        createdAt: '2025-09-30T09:00:00Z'
    },
    pinterest: {
        platform: 'pinterest',
        title: 'Beautiful Landscape Photography',
        author: {
            name: 'Nature Photographer',
            avatar: 'https://avatars.githubusercontent.com/u/6?v=4'
        },
        thumbnail: 'https://i.pinimg.com/originals/b4/43/eb/b443ebdcc16d274a7c50e05e48defbcc.jpg',
        duration: 0,
        downloadUrls: {
            standard: 'https://i.pinimg.com/originals/b4/43/eb/b443ebdcc16d274a7c50e05e48defbcc.jpg',
            hd: 'https://i.pinimg.com/originals/b4/43/eb/b443ebdcc16d274a7c50e05e48defbcc.jpg'
        },
        watermarkFree: true,
        description: 'A stunning landscape photography from Pinterest.',
        createdAt: '2025-10-02T10:00:00Z',
        mediaType: 'image'
    }
};

/**
 * 获取 Mock 数据
 */
export function getMockVideoData(platform: string): VideoInfo {
    return MOCK_VIDEO_DATA[platform] || MOCK_VIDEO_DATA.douyin;
}
