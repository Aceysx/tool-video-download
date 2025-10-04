'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { LanguageSwitcher } from '@/components/language-switcher';
import { ModeToggle } from '@/components/mode-toggle';

import { useTranslations } from 'next-intl';

export function Navbar() {
    const t = useTranslations('nav');
    const params = useParams();
    const locale = params.locale as string;

    return (
        <nav className='border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
            <div className='container mx-auto flex h-16 max-w-7xl items-center px-4 md:px-6 lg:px-8'>
                <div className='mr-4 flex'>
                    <Link href={`/${locale}`} className='flex items-center space-x-2'>
                        <span className='text-lg font-bold md:text-xl'>🎬 {t('appName')}</span>
                    </Link>
                </div>

                <div className='flex flex-1 items-center justify-end space-x-2'>
                    <div className='flex items-center space-x-2'>
                        <LanguageSwitcher />
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}
