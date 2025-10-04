import type { NextConfig } from 'next';

import initializeBundleAnalyzer from '@next/bundle-analyzer';

import createNextIntlPlugin from 'next-intl/plugin';

// https://next-intl-docs.vercel.app/docs/getting-started/app-router
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// https://www.npmjs.com/package/@next/bundle-analyzer
const withBundleAnalyzer = initializeBundleAnalyzer({
    enabled: process.env.BUNDLE_ANALYZER_ENABLED === 'true'
});

// https://nextjs.org/docs/pages/api-reference/next-config-js
const nextConfig: NextConfig = {
    output: 'standalone',
    outputFileTracingIncludes: {
        '/*': ['./registry/**/*', './src/i18n/locales/**/*']
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
            },
            // 抖音 (Douyin)
            {
                protocol: 'https',
                hostname: 'p3-sign.douyinpic.com'
            },
            {
                protocol: 'https',
                hostname: 'p9-sign.douyinpic.com'
            },
            // TikTok
            {
                protocol: 'https',
                hostname: 'p16-sign-va.tiktokcdn.com'
            },
            {
                protocol: 'https',
                hostname: 'p16-sign.tiktokcdn-us.com'
            },
            // Instagram
            {
                protocol: 'https',
                hostname: 'scontent.cdninstagram.com'
            },
            {
                protocol: 'https',
                hostname: 'scontent-*.cdninstagram.com'
            },
            // YouTube
            {
                protocol: 'https',
                hostname: 'i.ytimg.com'
            },
            {
                protocol: 'https',
                hostname: 'img.youtube.com'
            },
            // Facebook
            {
                protocol: 'https',
                hostname: 'scontent.xx.fbcdn.net'
            },
            {
                protocol: 'https',
                hostname: 'scontent-*.xx.fbcdn.net'
            },
            // Twitter/X
            {
                protocol: 'https',
                hostname: 'pbs.twimg.com'
            },
            // Bilibili
            {
                protocol: 'https',
                hostname: 'i0.hdslb.com'
            },
            {
                protocol: 'https',
                hostname: 'i1.hdslb.com'
            },
            {
                protocol: 'https',
                hostname: 'i2.hdslb.com'
            },
            // Pinterest
            {
                protocol: 'https',
                hostname: 'i.pinimg.com'
            },
            // Reddit
            {
                protocol: 'https',
                hostname: 'preview.redd.it'
            },
            {
                protocol: 'https',
                hostname: 'external-preview.redd.it'
            },
            // Threads
            {
                protocol: 'https',
                hostname: 'scontent.cdninstagram.com'
            }
        ]
    }
};

export default withNextIntl(withBundleAnalyzer(nextConfig));
