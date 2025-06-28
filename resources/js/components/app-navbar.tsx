import { Link, usePage } from '@inertiajs/react';
import { ClassValue } from 'clsx';
import { MenuIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { SharedData } from '@/types';
import AppLogoIcon from './app-logo-icon';
import { MobileMenu } from './navbar/mobile-menu';
import { UserMenu } from './navbar/user-menu';

export default function AppNavbar({ className }: { className?: ClassValue }) {
    const { auth } = usePage<SharedData>().props;

    const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 50);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Collapsible
            asChild
            open={isMobileMenuOpen}
            onOpenChange={setIsMobileMenuOpen}
            className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-screen-lg -translate-x-1/2"
        >
            <nav>
                <div
                    className={cn(
                        'flex items-center justify-between rounded-full ring-1 ring-transparent transition-all duration-300 ease-in-out',
                        isScrolled || isMobileMenuOpen
                            ? 'bg-blue-900/80 px-4 py-2 shadow-lg ring-white/10 backdrop-blur-md'
                            : 'bg-transparent px-2 py-1',
                        className,
                    )}
                >
                    <div className="flex items-center gap-x-4">
                        {/* Logo */}
                        <Link className="block shrink-0" href={route('home')}>
                            <AppLogoIcon className="h-8 w-auto fill-background" />
                        </Link>

                        {/* Nav Links */}
                        <div className="hidden items-center gap-x-2 text-sm font-medium text-blue-100 sm:flex lg:gap-x-4">
                            <Link href={route('home')} className="rounded-full px-4 py-2 transition-colors hover:bg-white/10 hover:text-white">
                                Cari Lowongan
                            </Link>
                            <Link href={route('home')} className="rounded-full px-4 py-2 transition-colors hover:bg-white/10 hover:text-white">
                                Cari Talenta
                            </Link>
                        </div>
                    </div>

                    {/* Auth & Actions */}
                    <div className="flex flex-shrink-0 items-center justify-end gap-x-2">
                        <UserMenu isAuthenticated={auth.isAuthenticated} user={auth.user} />

                        {/* Hamburger Menu Button */}
                        <div className="sm:hidden">
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full text-background hover:bg-white/10 hover:text-background">
                                    <span className="sr-only">Open main menu</span>
                                    {isMobileMenuOpen ? <XIcon className="block size-6" /> : <MenuIcon className="block size-6" />}
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                    </div>
                </div>

                <CollapsibleContent className="sm:hidden">
                    <MobileMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                        isAuthenticated={auth.isAuthenticated}
                        user={auth.user}
                    />
                </CollapsibleContent>
            </nav>
        </Collapsible>
    );
}
