'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';

import { type Locale, localeNames, locales } from '@/i18n/config';
import { Button } from '@/registry/new-york-v4/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/registry/new-york-v4/ui/dropdown-menu';

import { Check, Languages } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function LanguageSwitcher() {
    const t = useTranslations('common');
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const currentLocale = (params.locale as Locale) || 'zh-CN';

    const handleLocaleChange = (newLocale: Locale) => {
        // 替换当前路径中的语言代码
        const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
        const newPath = `/${newLocale}${pathWithoutLocale}`;

        router.push(newPath);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                    <Languages className='h-5 w-5' />
                    <span className='sr-only'>{t('switchLanguage')}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                {locales.map((locale) => (
                    <DropdownMenuItem
                        key={locale}
                        onClick={() => handleLocaleChange(locale)}
                        className='cursor-pointer'>
                        <Check className={`mr-2 h-4 w-4 ${currentLocale === locale ? 'opacity-100' : 'opacity-0'}`} />
                        {localeNames[locale]}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
