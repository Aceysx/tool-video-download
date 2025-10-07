import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'legal' });
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yourdomain.com';
    const currentUrl = locale === 'zh-CN' ? `${baseUrl}/legal/disclaimer` : `${baseUrl}/${locale}/legal/disclaimer`;
    const canonicalUrl = `${baseUrl}/legal/disclaimer`; // 所有语言版本都指向中文版本作为 canonical

    return {
        title: t('disclaimer.title'),
        description: locale === 'zh-CN' ? '重要免责声明' : 'Important disclaimer',
        alternates: {
            canonical: canonicalUrl,
            languages: {
                'zh-CN': `${baseUrl}/legal/disclaimer`,
                en: `${baseUrl}/en/legal/disclaimer`,
                'x-default': `${baseUrl}/legal/disclaimer`
            }
        }
    };
}

export default async function DisclaimerPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'legal' });
    const isZhCN = locale === 'zh-CN';

    return (
        <div className='container mx-auto max-w-4xl px-4 py-12 md:px-6 lg:px-8'>
            <div className='prose prose-gray dark:prose-invert max-w-none'>
                <h1>{t('disclaimer.title')}</h1>

                <div className='bg-primary/10 border-primary/20 my-6 rounded-lg border p-6'>
                    <h2 className='text-primary mt-0'>{t('disclaimer.content.title')}</h2>
                    <ul className='mb-0'>
                        <li>{t('disclaimer.content.point1')}</li>
                        <li>{t('disclaimer.content.point2')}</li>
                        <li>{t('disclaimer.content.point3')}</li>
                        <li>{t('disclaimer.content.point4')}</li>
                        <li>{t('disclaimer.content.point5')}</li>
                    </ul>
                </div>

                <h2>{isZhCN ? '1. 服务性质' : '1. Service Nature'}</h2>
                <p>
                    {isZhCN
                        ? '本网站提供的视频下载服务仅作为技术工具，用于帮助用户获取公开可访问的视频内容。我们不存储、托管或拥有任何视频内容。'
                        : 'The video download service provided by this website is only a technical tool to help users obtain publicly accessible video content. We do not store, host, or own any video content.'}
                </p>

                <h2>{isZhCN ? '2. 版权声明' : '2. Copyright Statement'}</h2>
                <p>
                    {isZhCN
                        ? '所有通过本服务下载的视频内容，其版权归原作者或版权所有者所有。用户应当遵守相关的版权法律法规，尊重原作者的合法权益。'
                        : 'The copyright of all video content downloaded through this service belongs to the original author or copyright owner. Users should comply with relevant copyright laws and regulations and respect the legitimate rights of original authors.'}
                </p>

                <h2>{isZhCN ? '3. 用途限制' : '3. Usage Restrictions'}</h2>
                <p>
                    {isZhCN
                        ? '本服务仅供个人学习、研究和欣赏使用。严禁将下载的内容用于：'
                        : 'This service is for personal learning, research, and appreciation only. It is strictly prohibited to use downloaded content for:'}
                </p>
                <ul>
                    <li>{isZhCN ? '商业用途或盈利目的' : 'Commercial use or profit purposes'}</li>
                    <li>{isZhCN ? '公开发布或二次传播' : 'Public release or secondary dissemination'}</li>
                    <li>{isZhCN ? '侵犯他人版权的行为' : 'Acts that infringe on the copyright of others'}</li>
                    <li>{isZhCN ? '任何违法或不道德的活动' : 'Any illegal or unethical activities'}</li>
                </ul>

                <h2>{isZhCN ? '4. 免责范围' : '4. Scope of Disclaimer'}</h2>
                <p>{isZhCN ? '我们不对以下情况承担任何责任：' : 'We are not responsible for the following:'}</p>
                <ul>
                    <li>
                        {isZhCN
                            ? '用户使用本服务下载内容所产生的任何法律后果'
                            : 'Any legal consequences arising from users using this service to download content'}
                    </li>
                    <li>
                        {isZhCN ? '因视频内容本身引起的任何纠纷' : 'Any disputes arising from the video content itself'}
                    </li>
                    <li>
                        {isZhCN
                            ? '因网络问题、平台限制等技术原因导致的服务中断或失败'
                            : 'Service interruption or failure due to technical reasons such as network issues and platform restrictions'}
                    </li>
                    <li>
                        {isZhCN
                            ? '用户因使用或无法使用本服务而遭受的任何直接或间接损失'
                            : 'Any direct or indirect losses suffered by users due to using or inability to use this service'}
                    </li>
                </ul>

                <h2>{isZhCN ? '5. 第三方内容' : '5. Third-party Content'}</h2>
                <p>
                    {isZhCN
                        ? '本服务解析和下载的内容来自第三方平台。我们不对这些内容的准确性、完整性、合法性或质量做任何保证。'
                        : 'The content parsed and downloaded by this service comes from third-party platforms. We do not guarantee the accuracy, completeness, legality, or quality of this content.'}
                </p>

                <h2>{isZhCN ? '6. 服务可用性' : '6. Service Availability'}</h2>
                <p>
                    {isZhCN
                        ? '我们不保证服务的持续可用性、稳定性或可靠性。服务可能会因维护、升级、第三方平台变更或其他原因而暂时中断。'
                        : 'We do not guarantee the continuous availability, stability, or reliability of the service. The service may be temporarily interrupted due to maintenance, upgrades, third-party platform changes, or other reasons.'}
                </p>

                <h2>{isZhCN ? '7. 法律合规' : '7. Legal Compliance'}</h2>
                <p>
                    {isZhCN
                        ? '用户应确保其使用本服务的行为符合所在地区的法律法规。如因用户违法使用而产生任何法律责任，由用户自行承担。'
                        : 'Users should ensure that their use of this service complies with the laws and regulations of their region. If any legal liability arises from illegal use by users, users shall bear it themselves.'}
                </p>

                <h2>{isZhCN ? '8. 争议解决' : '8. Dispute Resolution'}</h2>
                <p>
                    {isZhCN
                        ? '如果原作者认为本服务侵犯了其权益，请及时联系我们。我们将在收到通知后尽快处理。'
                        : 'If the original author believes that this service infringes on their rights, please contact us promptly. We will handle it as soon as possible after receiving the notification.'}
                </p>

                <h2>{isZhCN ? '9. 联系方式' : '9. Contact Information'}</h2>
                <p>
                    {isZhCN
                        ? '如有任何疑问或需要报告侵权行为，请通过以下方式联系我们：'
                        : 'If you have any questions or need to report infringement, please contact us:'}
                </p>
                <p>Email: acey@163.com</p>
            </div>
        </div>
    );
}
