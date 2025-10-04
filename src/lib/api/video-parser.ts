/**
 * 视频解析 API 包装层
 */
import type { VideoInfo, VideoParseRequest, VideoParseResponse } from './types';
import axios, { AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_VIDEO_API_URL;
const API_KEY = process.env.VIDEO_API_KEY;

/**
 * 解析视频 URL
 */
export async function parseVideoUrl(request: VideoParseRequest): Promise<VideoParseResponse> {
    try {
        if (!API_BASE_URL) {
            throw new Error('Video API URL not configured');
        }
        console.log('调用视频解析 API', API_BASE_URL);
        // 调用视频解析 API
        const response = await axios.post(
            `${API_BASE_URL}/parse`,
            { url: request.url }, // API 只需要 url 参数
            {
                headers: {
                    'Content-Type': 'application/json',
                    ...(API_KEY && { Authorization: `Bearer ${API_KEY}` })
                },
                timeout: 30000 // 30秒超时
            }
        );

        // 转换 API 响应为我们的格式
        const apiData = response.data;
        console.log('🔍 原始 API 数据:', JSON.stringify(apiData, null, 2));

        // 提取视频、音频和图片资源
        const videoMedia = apiData.medias?.find((m: any) => m.media_type === 'video');
        const audioMedia = apiData.medias?.find((m: any) => m.media_type === 'audio');
        const imageMedia = apiData.medias?.find((m: any) => m.media_type === 'image');

        console.log('📹 视频媒体:', videoMedia);
        console.log('🎵 音频媒体:', audioMedia);
        console.log('🖼️  图片媒体:', imageMedia);

        // 如果是纯音频类型（只有音频，没有视频），直接返回音频信息
        if (audioMedia && !videoMedia && !imageMedia) {
            console.log('✅ 检测到纯音频类型');
            const videoInfo: VideoInfo = {
                platform: request.platform || 'unknown',
                title: apiData.text || apiData.title || '音频',
                author: {
                    name: apiData.author || apiData.nickname || apiData.authorName || '未知作者',
                    avatar: apiData.avatar || apiData.authorAvatar,
                    url: apiData.authorUrl
                },
                thumbnail:
                    apiData.cover ||
                    apiData.preview_url ||
                    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
                duration: apiData.duration || 0,
                downloadUrls: {
                    standard: audioMedia.resource_url,
                    audio: audioMedia.resource_url
                },
                formats: [],
                watermarkFree: true,
                stats: {
                    views: apiData.playCount || apiData.views,
                    likes: apiData.diggCount || apiData.likes,
                    comments: apiData.commentCount || apiData.comments
                },
                description: apiData.text || apiData.description || apiData.desc,
                createdAt: apiData.createTime || apiData.createdAt,
                mediaType: 'audio'
            };

            console.log('✅ 转换后的音频信息:', JSON.stringify(videoInfo, null, 2));

            return {
                success: true,
                data: videoInfo
            };
        }

        // 如果是图片类型，直接返回图片信息
        if (imageMedia && !videoMedia) {
            console.log('✅ 检测到图片类型');
            const videoInfo: VideoInfo = {
                platform: request.platform || 'unknown',
                title: apiData.text || '图片',
                author: {
                    name: apiData.author || apiData.nickname || apiData.authorName || '未知作者',
                    avatar: apiData.avatar || apiData.authorAvatar,
                    url: apiData.authorUrl
                },
                thumbnail: imageMedia.resource_url,
                duration: 0,
                downloadUrls: {
                    standard: imageMedia.resource_url,
                    hd: imageMedia.resource_url
                },
                formats: [],
                watermarkFree: true,
                stats: {
                    views: apiData.playCount || apiData.views,
                    likes: apiData.diggCount || apiData.likes,
                    comments: apiData.commentCount || apiData.comments
                },
                description: apiData.text || apiData.description || apiData.desc,
                createdAt: apiData.createTime || apiData.createdAt,
                mediaType: 'image'
            };

            console.log('✅ 转换后的图片信息:', JSON.stringify(videoInfo, null, 2));

            return {
                success: true,
                data: videoInfo
            };
        }

        // 从 formats 数组中提取不同画质的视频
        let standardUrl = '';
        let hdUrl = '';

        if (videoMedia?.formats && Array.isArray(videoMedia.formats)) {
            console.log('🎬 可用画质列表:', videoMedia.formats.length, '个');

            // 打印所有可用画质
            videoMedia.formats.forEach((fmt: any) => {
                console.log(`  - ${fmt.quality_note || fmt.quality}p: ${fmt.video_url ? '有视频' : '无视频'}`);
            });

            // 根据 quality 字段排序（从高到低）
            const sortedFormats = [...videoMedia.formats].sort((a: any, b: any) => {
                const qualityA = a.quality || 0;
                const qualityB = b.quality || 0;

                return qualityB - qualityA; // 从高到低排序
            });

            // 高清：最高画质（第一个）
            const hdFormat = sortedFormats[0];
            hdUrl = hdFormat?.video_url || '';
            console.log(`📺 高清: ${hdFormat?.quality_note || hdFormat?.quality}p`, hdUrl ? '✅' : '❌');

            // 标清：选择 360p 或 480p 的画质
            // 如果没有，选择中等画质
            let standardFormat = sortedFormats.find((fmt: any) => fmt.quality === 360 || fmt.quality === 480);

            if (!standardFormat && sortedFormats.length > 1) {
                // 如果没有 360p/480p，选择中间画质
                const midIndex = Math.floor(sortedFormats.length / 2);
                standardFormat = sortedFormats[midIndex];
            } else if (!standardFormat) {
                // 如果只有一个画质，使用最高画质
                standardFormat = hdFormat;
            }

            standardUrl = standardFormat?.video_url || '';
            console.log(
                `📺 标清: ${standardFormat?.quality_note || standardFormat?.quality}p`,
                standardUrl ? '✅' : '❌'
            );
        }

        // 如果 formats 为空或没有找到，使用默认的 resource_url
        if (!standardUrl && !hdUrl) {
            standardUrl = videoMedia?.resource_url || '';
            hdUrl = videoMedia?.resource_url || ''; // 高清用同一个
            console.log('⚠️ 使用默认视频 URL');
        }

        const videoInfo: VideoInfo = {
            platform: request.platform || 'unknown',
            title: apiData.text || apiData.title || apiData.desc || '未知标题',
            author: {
                name: apiData.author || apiData.nickname || apiData.authorName || '未知作者',
                avatar: apiData.avatar || apiData.authorAvatar,
                url: apiData.authorUrl
            },
            thumbnail: videoMedia?.preview_url || apiData.cover || apiData.thumbnail || '',
            duration: apiData.duration || 0,
            downloadUrls: {
                standard: standardUrl,
                hd: hdUrl || standardUrl, // 如果没有高清，回退到标清
                audio: audioMedia?.resource_url
            },
            formats: videoMedia?.formats || [], // 传递所有可用的画质格式
            watermarkFree: true,
            stats: {
                views: apiData.playCount || apiData.views,
                likes: apiData.diggCount || apiData.likes,
                comments: apiData.commentCount || apiData.comments
            },
            description: apiData.text || apiData.description || apiData.desc,
            createdAt: apiData.createTime || apiData.createdAt
        };

        console.log('✅ 转换后的视频信息:', JSON.stringify(videoInfo, null, 2));

        return {
            success: true,
            data: videoInfo
        };
    } catch (error) {
        console.error('Video parse error:', error);

        let errorMessage = '解析失败，请稍后重试';

        if (error instanceof AxiosError) {
            if (error.code === 'ECONNABORTED') {
                errorMessage = '请求超时，请重试';
            } else if (error.response?.status === 429) {
                errorMessage = '请求过于频繁，请稍后再试';
            } else if (error.response?.status === 404) {
                errorMessage = '视频不存在或已被删除';
            } else if (error.response?.data?.message || error.response?.data?.msg) {
                errorMessage = error.response.data.message || error.response.data.msg;
            } else if (error.message) {
                errorMessage = error.message;
            }
        }

        return {
            success: false,
            error: errorMessage
        };
    }
}

/**
 * 验证 URL 格式
 */
export function isValidUrl(url: string): boolean {
    try {
        new URL(url);

        return true;
    } catch {
        return false;
    }
}
