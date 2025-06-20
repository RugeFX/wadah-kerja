import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

import AppLogoIcon from '@/components/app-logo-icon';
import { Separator } from '@/components/ui/separator';

interface AuthLayoutProps {
    title?: string;
    description?: string;
    image?: string;
    imagePosition?: 'left' | 'right';
}

export default function AuthSimpleLayout({ children, title, description, image, imagePosition = 'right' }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <main className="grid h-svh min-h-[768px] grid-cols-1 justify-between bg-background p-4 md:grid-cols-2">
            {imagePosition === 'left' && (
                <div className="hidden rounded-xl bg-cover bg-center md:block" style={{ backgroundImage: `url(${image})` }} />
            )}
            <div className="mx-auto flex size-full max-w-md flex-col justify-center gap-8 px-8">
                <div className="flex flex-col gap-4">
                    <Link href={route('home')} className="flex flex-col gap-2 font-medium">
                        <div className="mb-1 flex h-8 items-center rounded-md">
                            <AppLogoIcon className="h-full w-auto fill-current text-(--foreground) dark:text-white" />
                        </div>
                        <span className="sr-only">{title}</span>
                    </Link>

                    <Separator />

                    <div className="space-y-2">
                        <h1 className="text-xl font-bold">{title}</h1>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                </div>
                {children}

                <Separator />

                <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} WadahKerja</p>
            </div>
            {imagePosition === 'right' && (
                <div className="hidden rounded-xl bg-cover bg-center md:block" style={{ backgroundImage: `url(${image})` }} />
            )}
        </main>
    );
}
