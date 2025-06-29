import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { getInitials } from '@/lib/utils';
import type { User } from '@/types';
import { Link } from '@inertiajs/react';
import { BellIcon } from 'lucide-react';

interface UserMenuProps {
    user: User | null;
    isAuthenticated: boolean;
}

export function UserMenu({ user, isAuthenticated }: UserMenuProps) {
    if (!isAuthenticated || !user) {
        return (
            <div className="hidden sm:flex sm:items-center sm:gap-x-2">
                <Button variant="ghost" className="text-background hover:bg-white/10 hover:text-white" asChild>
                    <Link href={route('login')}>Masuk</Link>
                </Button>
                <Button variant="secondary" className="text-blue-900 shadow-sm" asChild>
                    <Link href={route('register')}>Daftar</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="hidden sm:flex sm:items-center sm:gap-x-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full text-background hover:bg-white/10 hover:text-background">
                        <BellIcon className="size-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-80 rounded-lg" align="end" side="bottom">
                    <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <h3 className="font-semibold">Notifikasi</h3>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* TODO: Still placeholder data */}
                    <div className="py-8 text-center text-muted-foreground">
                        <BellIcon className="mx-auto mb-2 size-8 opacity-50" />
                        <p className="text-sm">Belum ada notifikasi</p>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="size-9 cursor-pointer overflow-hidden rounded-full ring-2 ring-white/20 transition-all hover:ring-white/40">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            {user.name ? getInitials(user.name) : ''}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" align="end" side="bottom">
                    <UserMenuContent user={user} />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
