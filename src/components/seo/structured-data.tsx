import Script from 'next/script';

interface StructuredDataProps {
    type: 'WebApplication' | 'FAQPage' | 'HowTo' | 'BreadcrumbList';
    data: any;
}

/**
 * 结构化数据组件 - 用于 SEO 优化
 */
export function StructuredData({ type, data }: StructuredDataProps) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': type,
        ...data
    };

    return (
        <Script
            id={`structured-data-${type.toLowerCase()}`}
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}

/**
 * WebApplication 结构化数据 - 用于首页
 */
export function WebApplicationSchema({ locale }: { locale: string }) {
    const data = {
        name: locale === 'zh-CN' ? '视频下载工具' : 'Video Downloader',
        description:
            locale === 'zh-CN'
                ? '免费在线视频下载工具，支持抖音、TikTok、Instagram、Suno音乐等平台无水印下载'
                : 'Free online video downloader, support TikTok, Instagram, Douyin, Suno Music and more platforms without watermarks',
        url: process.env.NEXT_PUBLIC_APP_URL || 'https://yourdomain.com',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
        },
        featureList: [
            locale === 'zh-CN' ? '无水印下载' : 'Watermark-free download',
            locale === 'zh-CN' ? '多平台支持' : 'Multi-platform support',
            locale === 'zh-CN' ? '高清画质' : 'HD quality',
            locale === 'zh-CN' ? '完全免费' : 'Completely free'
        ]
    };

    return <StructuredData type='WebApplication' data={data} />;
}

/**
 * FAQ 结构化数据
 */
export function FAQPageSchema({ locale }: { locale: string }) {
    const faqs =
        locale === 'zh-CN'
            ? [
                  {
                      question: '如何下载抖音视频？',
                      answer: '打开抖音APP，找到想要下载的视频，点击分享按钮，选择【复制链接】，然后将链接粘贴到本工具的输入框中，点击【解析视频】即可。'
                  },
                  {
                      question: '下载的视频有水印吗？',
                      answer: '我们的工具会自动去除视频水印，下载的视频是无水印的高清原片。'
                  },
                  {
                      question: '是否需要登录或注册？',
                      answer: '完全不需要！我们的工具100%免费，无需注册或登录即可使用。'
                  },
                  {
                      question: '支持哪些平台？',
                      answer: '目前支持：抖音(Douyin)、TikTok、Instagram、Suno音乐、快手、YouTube Shorts、Facebook等主流平台。'
                  }
              ]
            : [
                  {
                      question: 'How to download TikTok videos?',
                      answer: "Open TikTok app, find the video you want to download, tap the share button, select 'Copy Link', then paste the link into our tool's input box and click 'Parse Video'."
                  },
                  {
                      question: 'Do downloaded videos have watermarks?',
                      answer: 'Our tool automatically removes video watermarks. Downloaded videos are watermark-free HD originals.'
                  },
                  {
                      question: 'Do I need to login or register?',
                      answer: 'Not at all! Our tool is 100% free and requires no registration or login.'
                  },
                  {
                      question: 'Which platforms are supported?',
                      answer: 'Currently supports: Douyin, TikTok, Instagram, Suno Music, Kuaishou, YouTube Shorts, Facebook and other mainstream platforms.'
                  }
              ];

    const data = {
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    };

    return <StructuredData type='FAQPage' data={data} />;
}

/**
 * HowTo 结构化数据 - 使用教程
 */
export function HowToSchema({ locale }: { locale: string }) {
    const steps =
        locale === 'zh-CN'
            ? [
                  {
                      name: '复制视频链接',
                      text: '打开抖音/TikTok等APP，找到想要下载的视频，点击分享按钮，选择【复制链接】'
                  },
                  {
                      name: '粘贴链接',
                      text: '将复制的链接粘贴到本工具的输入框中'
                  },
                  {
                      name: '解析视频',
                      text: '点击【立即解析】按钮，等待解析完成'
                  },
                  {
                      name: '下载视频',
                      text: '解析完成后，点击下载按钮即可保存无水印视频'
                  }
              ]
            : [
                  {
                      name: 'Copy video link',
                      text: "Open TikTok/Douyin app, find the video you want to download, tap the share button, select 'Copy Link'"
                  },
                  {
                      name: 'Paste link',
                      text: "Paste the copied link into our tool's input box"
                  },
                  {
                      name: 'Parse video',
                      text: "Click 'Parse Now' button and wait for parsing to complete"
                  },
                  {
                      name: 'Download video',
                      text: 'After parsing is complete, click the download button to save the watermark-free video'
                  }
              ];

    const data = {
        name: locale === 'zh-CN' ? '如何下载无水印视频' : 'How to download watermark-free videos',
        description:
            locale === 'zh-CN'
                ? '使用我们的工具下载抖音、TikTok等平台的无水印视频'
                : 'Download watermark-free videos from TikTok, Douyin and other platforms using our tool',
        step: steps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: step.name,
            text: step.text
        }))
    };

    return <StructuredData type='HowTo' data={data} />;
}

/**
 * Breadcrumb 结构化数据
 */
export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
    const data = {
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
        }))
    };

    return <StructuredData type='BreadcrumbList' data={data} />;
}
