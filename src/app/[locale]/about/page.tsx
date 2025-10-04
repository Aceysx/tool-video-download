import type { Metadata } from 'next';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';

import { CheckCircle, Download, Globe, Shield, Zap } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yourdomain.com';
    const currentUrl = locale === 'zh-CN' ? `${baseUrl}/about` : `${baseUrl}/${locale}/about`;

    const title = locale === 'zh-CN' ? '关于我们 - 视频下载工具' : 'About Us - Video Downloader';
    const description =
        locale === 'zh-CN'
            ? '了解我们的视频下载工具，我们致力于提供最好的免费在线视频下载服务'
            : 'Learn about our video downloader tool, we are committed to providing the best free online video download service';

    return {
        title,
        description,
        alternates: {
            canonical: currentUrl
        }
    };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const isZhCN = locale === 'zh-CN';

    return (
        <div className='container mx-auto max-w-4xl px-4 py-12 md:px-6 lg:px-8'>
            {/* 页面标题 */}
            <div className='mb-12 text-center'>
                <h1 className='from-foreground to-foreground/60 mb-4 bg-gradient-to-br bg-clip-text text-3xl font-bold text-transparent md:text-4xl'>
                    {isZhCN ? '关于我们' : 'About Us'}
                </h1>
                <p className='text-muted-foreground mx-auto max-w-2xl text-lg'>
                    {isZhCN
                        ? '我们致力于为用户提供最好的免费在线视频下载服务'
                        : 'We are committed to providing users with the best free online video download service'}
                </p>
            </div>

            {/* 网站介绍 */}
            <Card className='mb-8'>
                <CardHeader>
                    <CardTitle>{isZhCN ? '我们的使命' : 'Our Mission'}</CardTitle>
                    <CardDescription>
                        {isZhCN ? '让视频下载变得简单、快速、免费' : 'Make video downloading simple, fast, and free'}
                    </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <p className='text-muted-foreground'>
                        {isZhCN
                            ? '我们的视频下载工具支持抖音、TikTok、Instagram、Suno音乐等多个主流平台。无需安装任何软件，只需粘贴链接即可快速下载无水印的高清视频。'
                            : 'Our video downloader supports multiple mainstream platforms such as Douyin, TikTok, Instagram, and Suno Music. No software installation required, just paste the link to quickly download watermark-free HD videos.'}
                    </p>
                    <p className='text-muted-foreground'>
                        {isZhCN
                            ? '我们相信每个人都应该能够方便地保存和分享自己喜欢的内容。因此，我们提供完全免费的服务，无需注册，无需付费，永久免费使用。'
                            : 'We believe everyone should be able to easily save and share their favorite content. Therefore, we provide a completely free service with no registration, no payment, and free forever.'}
                    </p>
                </CardContent>
            </Card>

            {/* 功能特点 */}
            <div className='mb-8'>
                <h2 className='mb-6 text-2xl font-bold'>{isZhCN ? '为什么选择我们？' : 'Why Choose Us?'}</h2>
                <div className='grid gap-6 sm:grid-cols-2'>
                    <Card>
                        <CardHeader>
                            <div className='bg-primary/10 text-primary mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl'>
                                <Download className='h-6 w-6' />
                            </div>
                            <CardTitle className='text-lg'>
                                {isZhCN ? '无水印下载' : 'Watermark-free Download'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-muted-foreground text-sm'>
                                {isZhCN
                                    ? '下载的视频不含任何平台水印，保持原始画质'
                                    : 'Downloaded videos contain no platform watermarks and maintain original quality'}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className='bg-primary/10 text-primary mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl'>
                                <Globe className='h-6 w-6' />
                            </div>
                            <CardTitle className='text-lg'>
                                {isZhCN ? '多平台支持' : 'Multi-platform Support'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-muted-foreground text-sm'>
                                {isZhCN
                                    ? '支持抖音、TikTok、Instagram等10+主流平台'
                                    : 'Support 10+ mainstream platforms like Douyin, TikTok, Instagram'}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className='bg-primary/10 text-primary mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl'>
                                <Zap className='h-6 w-6' />
                            </div>
                            <CardTitle className='text-lg'>{isZhCN ? '极速解析' : 'Lightning Fast'}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-muted-foreground text-sm'>
                                {isZhCN ? '秒级解析速度，即时下载' : 'Parse in seconds, instant download'}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className='bg-primary/10 text-primary mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl'>
                                <Shield className='h-6 w-6' />
                            </div>
                            <CardTitle className='text-lg'>{isZhCN ? '隐私保护' : 'Privacy Protected'}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-muted-foreground text-sm'>
                                {isZhCN
                                    ? '不保存任何用户数据，保护您的隐私'
                                    : 'No user data stored, protect your privacy'}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* 使用提示 */}
            <Card className='bg-primary/5 border-primary/20'>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <CheckCircle className='text-primary h-5 w-5' />
                        {isZhCN ? '重要提示' : 'Important Notice'}
                    </CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                    <p className='text-muted-foreground text-sm'>
                        {isZhCN
                            ? '• 本工具仅供个人学习和研究使用，请勿用于商业用途'
                            : '• This tool is for personal learning and research only, not for commercial use'}
                    </p>
                    <p className='text-muted-foreground text-sm'>
                        {isZhCN
                            ? '• 下载的内容请尊重原作者的版权和知识产权'
                            : '• Please respect the copyright and intellectual property of original authors'}
                    </p>
                    <p className='text-muted-foreground text-sm'>
                        {isZhCN
                            ? '• 我们不存储任何视频文件，所有内容均来自原平台'
                            : '• We do not store any video files, all content comes from the original platform'}
                    </p>
                </CardContent>
            </Card>

            {/* 联系信息 */}
            <div className='mt-12 text-center'>
                <h2 className='mb-4 text-2xl font-bold'>{isZhCN ? '联系我们' : 'Contact Us'}</h2>
                <p className='text-muted-foreground'>
                    {isZhCN
                        ? '如有任何问题或建议，欢迎通过以下方式联系我们：'
                        : 'If you have any questions or suggestions, please contact us:'}
                </p>
                <div className='text-muted-foreground mt-4 space-y-2'>
                    <p>Email: acey@163.com</p>
                </div>
            </div>
        </div>
    );
}
