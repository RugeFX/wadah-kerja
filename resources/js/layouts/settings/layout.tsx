import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: '/settings/profile',
        icon: null,
    },
    {
        title: 'Password',
        href: '/settings/password',
        icon: null,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className="relative w-full">
            {/* Content Layer */}
            <div className="relative">
                <div className="border-b bg-background pt-24">
                    <div className="container mx-auto px-6 py-6">
                        <Heading title="Settings" description="Manage your profile and account settings" />
                    </div>
                </div>

                <div className="container mx-auto px-6 py-8">
                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                        <aside className="w-full lg:w-64">
                            <Card className="bg-background p-2 shadow-lg shadow-blue-900/5">
                                <nav className="flex flex-col gap-1">
                                    {sidebarNavItems.map((item, index) => (
                                        <Button
                                            key={`${item.href}-${index}`}
                                            size="sm"
                                            variant="ghost"
                                            asChild
                                            className={cn('w-full justify-start', {
                                                'bg-muted': currentPath === item.href,
                                            })}
                                        >
                                            <Link href={item.href} prefetch>
                                                {item.title}
                                            </Link>
                                        </Button>
                                    ))}
                                </nav>
                            </Card>
                        </aside>

                        <Separator className="my-6 lg:hidden" />

                        <div className="flex-1">
                            <div className="space-y-6">{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
