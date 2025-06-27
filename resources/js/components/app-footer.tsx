import { Link } from '@inertiajs/react';

import AppLogoIcon from './app-logo-icon';

export default function AppFooter() {
    return (
        <footer className="bg-secondary">
            <div className="container mx-auto w-full space-y-6 px-6 py-14">
                <Link className="inline-block" href={route('home')}>
                    <AppLogoIcon className="h-10 w-auto" />
                </Link>
                <div className="flex gap-4">
                    <a href="#contact" className="text-xs text-muted-foreground hover:text-foreground">
                        Kontak
                    </a>
                    <a href="#contact" className="text-xs text-muted-foreground hover:text-foreground">
                        Privasi
                    </a>
                    <a href="#contact" className="text-xs text-muted-foreground hover:text-foreground">
                        Kebijakan
                    </a>
                </div>
                <p className="max-w-3xl text-xs text-muted-foreground">
                    Menghubungkan kebutuhan usaha dengan talenta lokal untuk membangun ekonomi komunitas yang lebih kuat dan mandiri.
                </p>
            </div>
        </footer>
    );
}
