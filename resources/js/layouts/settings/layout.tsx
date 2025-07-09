import Heading from '@/components/heading';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BriefcaseIcon, KeyIcon, UserIcon, Wallet2Icon } from 'lucide-react';
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
            title: 'Profil',
            href: '/settings/profile',
            icon: UserIcon,
        },
        ...(isWorker
            ? [
                  {
                      title: 'Profil Pekerja',
                      href: '/settings/worker-profile',
                      icon: Wallet2Icon,
                  },
              ]
            : isBusiness
              ? [
                    {
                        title: 'Profil Bisnis',
                        href: '/settings/business-profile',
                        icon: BriefcaseIcon,
                    },
                ]
              : []),
        {
            title: 'Kata Sandi',
            href: '/settings/password',
            icon: KeyIcon,
        },
    ];

    return (
        <div className="relative w-full">
            {/* Content Layer */}
            <div className="relative">
                <div className="border-b bg-background pt-24">
                    <div className="container mx-auto px-6 py-6">
                        <Heading title="Pengaturan" description="Kelola profil dan pengaturan akun Anda" />
                    </div>
                </div>

                <div className="container mx-auto px-6 py-8">
                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                        <aside className="w-full lg:w-72">
                            <Card className="gap-0 overflow-hidden bg-background py-0 shadow-lg shadow-blue-900/5">
                                <div className="bg-primary/5 p-4">
                                    <h2 className="text-lg font-semibold text-primary">Pengaturan</h2>
                                    <p className="text-sm text-muted-foreground">Kelola preferensi akun Anda</p>
                                </div>
                                <nav className="p-2">
                                    {sidebarNavItems.map((item, index) => (
                                        <Button
                                            key={`${item.href}-${index}`}
                                            size="sm"
                                            variant="ghost"
                                            asChild
                                            className={cn('mb-1 w-full justify-start gap-2 px-4 py-2 text-left', {
                                                'bg-primary/10 text-primary': currentPath === item.href,
                                                'hover:bg-primary/5': currentPath !== item.href,
                                            })}
                                        >
                                            <Link href={item.href} prefetch className="flex items-center gap-2">
                                                {item.icon && <Icon iconNode={item.icon} className="h-4 w-4" />}
                                                <span>{item.title}</span>
                                            </Link>
                                        </Button>
                                    ))}
                                </nav>
                            </Card>
                        </aside>

                        <Separator className="my-6 lg:hidden" />

                        <div className="flex-1">
                            <Card className="bg-background p-6 shadow-lg shadow-blue-900/5">
                                <div className="space-y-6">{children}</div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
