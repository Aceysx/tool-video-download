import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'legal' });
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yourdomain.com';
    const currentUrl = locale === 'zh-CN' ? `${baseUrl}/legal/privacy` : `${baseUrl}/${locale}/legal/privacy`;
    const canonicalUrl = `${baseUrl}/legal/privacy`; // 所有语言版本都指向中文版本作为 canonical

    return {
        title: t('privacy.title'),
        description: locale === 'zh-CN' ? '我们的隐私政策说明' : 'Our privacy policy statement',
        alternates: {
            canonical: canonicalUrl,
            languages: {
                'zh-CN': `${baseUrl}/legal/privacy`,
                'en': `${baseUrl}/en/legal/privacy`,
                'x-default': `${baseUrl}/legal/privacy`
            }
        }
    };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'legal' });
    const isZhCN = locale === 'zh-CN';

    return (
        <div className='container mx-auto max-w-4xl px-4 py-12 md:px-6 lg:px-8'>
            <div className='prose prose-gray dark:prose-invert max-w-none'>
                <h1>{t('privacy.title')}</h1>
                <p className='text-muted-foreground'>{t('privacy.lastUpdated')}</p>

                <h2>{isZhCN ? '1. 信息收集' : '1. Information Collection'}</h2>
                <p>
                    {isZhCN
                        ? '我们不会收集、存储或分享您的任何个人信息。我们的服务完全在您的浏览器中运行，不会将您输入的视频链接或其他数据发送到我们的服务器永久存储。'
                        : 'We do not collect, store, or share any of your personal information. Our service runs entirely in your browser and does not send the video links or other data you enter to our servers for permanent storage.'}
                </p>

                <h2>{isZhCN ? '2. Cookie 使用' : '2. Cookie Usage'}</h2>
                <p>
                    {isZhCN
                        ? '我们可能使用 Cookie 来改善用户体验，包括：保存语言偏好设置和主题选择。这些 Cookie 仅用于功能性目的，不用于跟踪或广告。'
                        : 'We may use Cookies to improve user experience, including: saving language preferences and theme selections. These Cookies are only used for functional purposes, not for tracking or advertising.'}
                </p>

                <h2>{isZhCN ? '3. 第三方服务' : '3. Third-party Services'}</h2>
                <p>
                    {isZhCN
                        ? '我们的网站可能包含第三方服务，如 Google Analytics 和 Google AdSense。这些服务可能会收集某些匿名数据用于分析和广告目的。'
                        : 'Our website may include third-party services such as Google Analytics and Google AdSense. These services may collect certain anonymous data for analysis and advertising purposes.'}
                </p>

                <h2>{isZhCN ? '4. 数据安全' : '4. Data Security'}</h2>
                <p>
                    {isZhCN
                        ? '由于我们不收集或存储用户数据，因此不存在数据泄露的风险。所有处理都在您的本地设备上进行。'
                        : 'Since we do not collect or store user data, there is no risk of data breaches. All processing is done on your local device.'}
                </p>

                <h2>{isZhCN ? '5. 儿童隐私' : "5. Children's Privacy"}</h2>
                <p>
                    {isZhCN
                        ? '我们的服务面向所有年龄段的用户。由于我们不收集任何个人信息，因此不会特别针对儿童收集数据。'
                        : 'Our service is for users of all ages. Since we do not collect any personal information, we do not specifically collect data from children.'}
                </p>

                <h2>{isZhCN ? '6. 隐私政策更新' : '6. Privacy Policy Updates'}</h2>
                <p>
                    {isZhCN
                        ? '我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，并在页面顶部注明最后更新日期。'
                        : 'We may update this privacy policy from time to time. The updated policy will be posted on this page with the last updated date at the top.'}
                </p>

                <h2>{isZhCN ? '7. 联系我们' : '7. Contact Us'}</h2>
                <p>
                    {isZhCN
                        ? '如果您对本隐私政策有任何疑问，请通过电子邮件联系我们：acey@163.com'
                        : 'If you have any questions about this privacy policy, please contact us by email: acey@163.com'}
                </p>
            </div>
        </div>
    );
}
