import { Link } from '@inertiajs/react';
import { LogOutIcon, SettingsIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import { cn, getInitials } from '@/lib/utils';
import type { User } from '@/types';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    isAuthenticated: boolean;
    user: User | null;
}

export function MobileMenu({ isOpen, onClose, isAuthenticated, user }: MobileMenuProps) {
    return (
        <div
            className={cn(
                'mt-2 space-y-1 rounded-2xl bg-blue-900/90 p-4 ring-1 ring-white/10 backdrop-blur-md',
                isOpen ? 'animate-in fade-in-0 slide-in-from-top-2' : 'animate-out fade-out-0 slide-out-to-top-2',
            )}
        >
            <div className="space-y-1">
                <Link
                    href={route('home')}
                    className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'w-full justify-start text-base leading-7 font-semibold text-blue-100 hover:bg-white/10 hover:text-white',
                    )}
                    onClick={onClose}
                >
                    Cari Lowongan
                </Link>
                <Link
                    href={route('home')}
                    className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'w-full justify-start text-base leading-7 font-semibold text-blue-100 hover:bg-white/10 hover:text-white',
                    )}
                    onClick={onClose}
                >
                    Cari Talenta
                </Link>
            </div>

            <div className="!mt-4 border-t border-blue-800/50 pt-4">
                {isAuthenticated && user ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 px-3">
                            <Avatar className="size-10">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="text-base font-semibold text-white">{user.name}</div>
                                <div className="text-sm font-medium text-blue-300">{user.email}</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Link
                                href={route('profile.edit')}
                                className={cn(
                                    buttonVariants({ variant: 'outline' }),
                                    'w-full justify-start gap-3 border-white/20 bg-transparent text-blue-100 hover:bg-white/10 hover:text-white',
                                )}
                                onClick={onClose}
                            >
                                <SettingsIcon className="size-5" />
                                <span>Pengaturan</span>
                            </Link>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className={cn(
                                    buttonVariants({ variant: 'outline' }),
                                    'w-full justify-start gap-3 border-red-400/30 bg-transparent text-red-400 hover:border-red-400/80 hover:bg-red-400/10 hover:text-red-300',
                                )}
                                onClick={onClose}
                            >
                                <LogOutIcon className="size-5" />
                                <span>Keluar</span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('login')}
                            className={cn(
                                buttonVariants({ variant: 'outline' }),
                                'flex-1 border-white/20 text-white hover:bg-white/10 hover:text-white',
                            )}
                            onClick={onClose}
                        >
                            Masuk
                        </Link>
                        <Link href={route('register')} className={cn(buttonVariants({ variant: 'secondary' }), 'flex-1')} onClick={onClose}>
                            Daftar
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
