import { Link, router } from '@inertiajs/react';
import { LayoutDashboardIcon, LogOutIcon, SettingsIcon } from 'lucide-react';

import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { cn, getInitials } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import type { Role, User } from '@/types';
import { buttonVariants } from './ui/button';

interface UserMenuContentProps {
    user: User;
    role: Role;
}

export function UserMenuContent({ user, role }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-3 px-3 py-3">
                    <Avatar className="size-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="text-base font-semibold">{user.name}</div>
                        <div className="text-sm font-medium text-muted-foreground">{user.email}</div>
                    </div>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="space-y-2 p-1">
                {/* TODO: Make role enum? */}
                {role.name === 'admin' && (
                    <DropdownMenuItem
                        asChild
                        className={cn(
                            buttonVariants({ variant: 'ghost' }),
                            'w-full justify-start gap-3 bg-transparent text-blue-600 ring-blue-600/20! hover:bg-blue-50! hover:text-blue-700!',
                        )}
                    >
                        <Link href={route('dashboard')} as="button" prefetch onClick={cleanup}>
                            <LayoutDashboardIcon className="size-5 text-blue-600" />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem
                    asChild
                    className={cn(buttonVariants({ variant: 'ghost' }), 'w-full justify-start gap-3 bg-transparent hover:bg-accent')}
                >
                    <Link href={route('profile.edit')} as="button" prefetch onClick={cleanup}>
                        <SettingsIcon className="size-5" />
                        <span>Pengaturan</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    asChild
                    className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'w-full justify-start gap-3 bg-transparent text-red-400 ring-red-400/30! hover:border-red-400/80! hover:bg-red-400/10! hover:text-red-500!',
                    )}
                >
                    <Link method="post" href={route('logout')} as="button" onClick={handleLogout}>
                        <LogOutIcon className="size-5 text-red-400" />
                        <span>Keluar</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </>
    );
}
