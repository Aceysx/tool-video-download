import Script from 'next/script';

const GA_MEASUREMENT_ID = 'G-2K4QQ6SDRY';

export function GoogleAnalytics() {
    return (
        <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy='lazyOnload' />
            <Script id='google-analytics' strategy='lazyOnload'>
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_MEASUREMENT_ID}');
                `}
            </Script>
        </>
    );
}
