import { Link, router } from '@inertiajs/react';
import { LogOutIcon, SettingsIcon } from 'lucide-react';

import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { cn, getInitials } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { type User } from '@/types';
import { buttonVariants } from './ui/button';

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
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
                <DropdownMenuItem
                    asChild
                    className={cn(buttonVariants({ variant: 'ghost' }), 'bobg-transparent w-full justify-start gap-3 hover:bg-accent')}
                >
                    <Link href={route('profile.edit')} as="button" prefetch onClick={cleanup}>
                        <SettingsIcon className="size-5" />
                        <span>Pengaturan</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    asChild
                    className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'w-full justify-start gap-3 border-red-400/30 bg-transparent text-red-400 hover:border-red-400/80! hover:bg-red-400/10! hover:text-red-500!',
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
