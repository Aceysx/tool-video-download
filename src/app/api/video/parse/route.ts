import { NextRequest, NextResponse } from 'next/server';

import { getMockVideoData } from '@/lib/api/mock-data';
import { parseVideoUrl } from '@/lib/api/video-parser';
import { detectPlatform } from '@/lib/video/platforms';

import { z } from 'zod';

// Mock 模式开关（开发测试用）
// 现在使用真实 API: https://firstool.online/parse
const MOCK_MODE = false;

// 请求参数验证
const RequestSchema = z.object({
    url: z.string().url('Invalid URL format'),
    platform: z.string().optional()
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log('📥 收到请求:', body);

        // 验证请求参数
        const validationResult = RequestSchema.safeParse(body);
        if (!validationResult.success) {
            console.log('❌ 参数验证失败:', validationResult.error);

            return NextResponse.json(
                {
                    success: false,
                    error: validationResult.error.issues[0]?.message || 'Invalid request'
                },
                { status: 400 }
            );
        }

        const { url, platform: providedPlatform } = validationResult.data;

        // 检测平台
        const platform = providedPlatform || detectPlatform(url);
        console.log('🎯 检测到平台:', platform);
        if (!platform) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Unsupported platform'
                },
                { status: 400 }
            );
        }

        // Mock 模式：返回测试数据
        if (MOCK_MODE) {
            console.log('🔧 Using MOCK mode for testing');

            return NextResponse.json({
                success: true,
                data: getMockVideoData(platform)
            });
        }

        // 调用视频解析API
        console.log('🔄 调用外部 API...');
        const result = await parseVideoUrl({ url, platform });

        if (!result.success) {
            console.log('❌ API 返回错误:', result.error);

            return NextResponse.json(
                {
                    success: false,
                    error: result.error
                },
                { status: 500 }
            );
        }

        console.log('✅ API 调用成功，返回数据');

        return NextResponse.json({
            success: true,
            data: result.data
        });
    } catch (error: any) {
        console.error('API route error:', error);

        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Internal server error'
            },
            { status: 500 }
        );
    }
}
