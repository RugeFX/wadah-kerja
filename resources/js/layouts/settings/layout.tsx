import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { auth } = usePage<SharedData<true>>().props;
    const isWorker = auth.role?.name === 'worker';
    const isBusiness = auth.role?.name === 'business';

    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    const sidebarNavItems: NavItem[] = [
        {
            title: 'Profile',
            href: '/settings/profile',
            icon: null,
        },
        ...(isWorker
            ? [
                  {
                      title: 'Worker Profile',
                      href: '/settings/worker-profile',
                      icon: null,
                  },
              ]
            : isBusiness
              ? [
                    {
                        title: 'Business Profile',
                        href: '/settings/business-profile',
                        icon: null,
                    },
                ]
              : []),
        {
            title: 'Password',
            href: '/settings/password',
            icon: null,
        },
    ];

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
