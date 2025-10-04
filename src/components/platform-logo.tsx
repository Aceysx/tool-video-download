import Image from 'next/image';

interface PlatformLogoProps {
    name: string;
    icon: string;
    logo?: string;
    size?: number;
    className?: string;
}

export function PlatformLogo({ name, icon, logo, size = 24, className = '' }: PlatformLogoProps) {
    if (logo) {
        return (
            <Image
                src={logo}
                alt={name}
                width={size}
                height={size}
                className={`inline-block ${className}`}
                unoptimized
            />
        );
    }

    // 如果没有 logo 图片，使用 emoji 作为后备
    return <span className={`inline-block text-[${size}px] ${className}`}>{icon}</span>;
}
