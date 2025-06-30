import { Link } from '@inertiajs/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { getInitials } from '@/lib/utils';
import type { Role, User } from '@/types';

interface UserMenuProps {
    user: User | null;
    role: Role | null;
    isAuthenticated: boolean;
}

export function UserMenu({ user, isAuthenticated, role }: UserMenuProps) {
    if (!isAuthenticated || !user || !role) {
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
                    <Avatar className="size-9 cursor-pointer overflow-hidden rounded-full ring-2 ring-white/20 transition-all hover:ring-white/40">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            {user.name ? getInitials(user.name) : ''}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" align="end" side="bottom">
                    <UserMenuContent user={user} role={role} />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
