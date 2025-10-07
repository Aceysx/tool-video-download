import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'legal' });
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.quickvideo.online';
    const currentUrl = locale === 'zh-CN' ? `${baseUrl}/legal/terms` : `${baseUrl}/${locale}/legal/terms`;
    // 每个语言版本都使用自己的 URL 作为 canonical

    return {
        title: t('terms.title'),
        description: locale === 'zh-CN' ? '我们的服务条款说明' : 'Our terms of service statement',
        alternates: {
            canonical: currentUrl,
            languages: {
                'zh-CN': `${baseUrl}/legal/terms`,
                en: `${baseUrl}/en/legal/terms`,
                'x-default': `${baseUrl}/legal/terms`
            }
        }
    };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'legal' });
    const isZhCN = locale === 'zh-CN';

    return (
        <div className='container mx-auto max-w-4xl px-4 py-12 md:px-6 lg:px-8'>
            <div className='prose prose-gray dark:prose-invert max-w-none'>
                <h1>{t('terms.title')}</h1>
                <p className='text-muted-foreground'>{t('terms.lastUpdated')}</p>

                <h2>{isZhCN ? '1. 接受条款' : '1. Acceptance of Terms'}</h2>
                <p>
                    {isZhCN
                        ? '使用本网站即表示您同意遵守这些服务条款。如果您不同意这些条款，请不要使用本服务。'
                        : 'By using this website, you agree to comply with these Terms of Service. If you do not agree to these terms, please do not use this service.'}
                </p>

                <h2>{isZhCN ? '2. 服务说明' : '2. Service Description'}</h2>
                <p>
                    {isZhCN
                        ? '我们提供免费的在线视频解析和下载服务。我们不保证服务的持续可用性，可能会在不事先通知的情况下修改或终止服务。'
                        : 'We provide free online video parsing and download services. We do not guarantee continuous availability of the service and may modify or terminate the service without prior notice.'}
                </p>

                <h2>{isZhCN ? '3. 用户责任' : '3. User Responsibilities'}</h2>
                <p>{isZhCN ? '使用本服务时，您同意：' : 'When using this service, you agree to:'}</p>
                <ul>
                    <li>
                        {isZhCN
                            ? '仅将下载的内容用于个人学习和研究目的'
                            : 'Use downloaded content only for personal learning and research purposes'}
                    </li>
                    <li>
                        {isZhCN
                            ? '不将下载的内容用于任何商业目的'
                            : 'Not use downloaded content for any commercial purposes'}
                    </li>
                    <li>
                        {isZhCN
                            ? '尊重原作者的版权和知识产权'
                            : 'Respect the copyright and intellectual property of original authors'}
                    </li>
                    <li>
                        {isZhCN ? '不使用本服务进行任何非法活动' : 'Not use this service for any illegal activities'}
                    </li>
                </ul>

                <h2>{isZhCN ? '4. 知识产权' : '4. Intellectual Property'}</h2>
                <p>
                    {isZhCN
                        ? '本网站的所有内容（包括但不限于文本、图形、代码）均受版权保护。下载的视频内容的版权归原作者所有。'
                        : 'All content on this website (including but not limited to text, graphics, code) is protected by copyright. Copyright of downloaded video content belongs to the original author.'}
                </p>

                <h2>{isZhCN ? '5. 免责声明' : '5. Disclaimer'}</h2>
                <p>
                    {isZhCN
                        ? '本服务按"现状"提供，不提供任何明示或暗示的保证。我们不对使用本服务造成的任何直接或间接损失承担责任。'
                        : 'This service is provided "as is" without any express or implied warranties. We are not responsible for any direct or indirect damages caused by using this service.'}
                </p>

                <h2>{isZhCN ? '6. 服务限制' : '6. Service Limitations'}</h2>
                <p>
                    {isZhCN
                        ? '我们可能会对服务使用实施合理的限制，包括但不限于每日下载次数限制。滥用服务可能导致访问被限制。'
                        : 'We may impose reasonable restrictions on service usage, including but not limited to daily download limits. Service abuse may result in restricted access.'}
                </p>

                <h2>{isZhCN ? '7. 服务变更' : '7. Service Changes'}</h2>
                <p>
                    {isZhCN
                        ? '我们保留随时修改或终止服务的权利，恕不另行通知。我们也可能随时更新这些服务条款。'
                        : 'We reserve the right to modify or terminate the service at any time without notice. We may also update these Terms of Service at any time.'}
                </p>

                <h2>{isZhCN ? '8. 适用法律' : '8. Applicable Law'}</h2>
                <p>
                    {isZhCN
                        ? '这些服务条款受相关法律管辖。任何争议应通过友好协商解决。'
                        : 'These Terms of Service are governed by applicable law. Any disputes should be resolved through friendly negotiation.'}
                </p>

                <h2>{isZhCN ? '9. 联系我们' : '9. Contact Us'}</h2>
                <p>
                    {isZhCN
                        ? '如果您对这些服务条款有任何疑问，请通过电子邮件联系我们：acey@163.com'
                        : 'If you have any questions about these Terms of Service, please contact us by email: acey@163.com'}
                </p>
            </div>
        </div>
    );
}
