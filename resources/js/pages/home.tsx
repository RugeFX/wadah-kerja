import { Head, Link, usePage } from '@inertiajs/react';
import { ClassValue } from 'clsx';
import { BellIcon, BriefcaseIcon, LocateIcon, LucideIcon, UsersIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import AppFooter from '@/components/app-footer';
import AppLogoIcon from '@/components/app-logo-icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { cn, getInitials } from '@/lib/utils';
import type { SharedData } from '@/types';

const reasons = [
    {
        Icon: LocateIcon,
        title: 'Fokus Lokal',
        description:
            'Kami percaya kekuatan ada di komunitas. Temukan talenta yang mengerti konteks pasarmu, atau cari proyek dari bisnis yang bisa kamu temui langsung. Setiap transaksi di sini turut memperkuat roda ekonomi di sekitarmu.',
    },
    {
        Icon: BriefcaseIcon,
        title: 'Dirancang untuk UMKM',
        description:
            'Lupakan proses rekrutmen yang rumit dan mahal. Dari desain promo singkat hingga bantuan admin mingguan, platform kami dirancang khusus untuk kebutuhan proyek skala kecil yang fleksibel, cepat, dan sesuai dengan anggaran usaha Anda.',
    },
    {
        Icon: UsersIcon,
        title: 'Tumbuh Bersama Komunitas',
        description:
            'Misi kami lebih dari sekadar menghubungkan. Setiap proyek yang selesai di WadahKerja berarti sebuah langkah maju bagi UMKM dan sebuah karya baru untuk portofolio talenta lokal. Di sini, kita tumbuh dan maju bersama.',
    },
];

export default function Home() {
    return (
        <>
            <Head title="Home" />
            <Navbar />
            <main>
                <section id="hero" className="w-full bg-gradient-to-b from-blue-900 to-blue-600">
                    <div className="relative flex h-svh max-h-[860px] min-h-[568px] w-full items-center overflow-hidden">
                        <div className="absolute inset-0 z-0 size-full">
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b62438f2f6eab49d871a23899eea2f4a71c26951?placeholderIfAbsent=true"
                                alt="Hero background"
                                className="pointer-events-none size-full object-cover object-center"
                            />
                        </div>
                        <div className="relative z-1 container mx-auto flex size-full flex-col items-start justify-center gap-8 px-6">
                            <h1 className="text-5xl font-bold text-white">
                                Kebutuhan Usaha Anda, <br />
                                Dipenuhi Talenta Lokal
                            </h1>
                            <p className="max-w-2xl text-lg font-normal text-white">
                                WadahKerja adalah ekosistem yang menghubungkan UMKM dengan para pekerja terverifikasi di dekat Anda untuk
                                menyelesaikan setiap proyek, besar maupun kecil.
                            </p>
                            <div className="flex items-center gap-3 text-center text-sm font-medium">
                                <Button variant="secondary">Cari lowongan kerja</Button>
                                <Button variant="outline" className="bg-transparent text-background hover:bg-transparent hover:opacity-80">
                                    Cari talenta terbaik
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="why" className="container mx-auto w-full space-y-3 px-6 py-14">
                    <h2 className="text-2xl font-semibold text-foreground">Kenapa WadahLokal?</h2>
                    <p className="text-lg font-normal text-foreground">
                        Kami bukan sekadar platform. Kami adalah ekosistem yang dirancang untuk pertumbuhan lokal Anda.
                    </p>
                    <div className="flex w-full justify-stretch gap-5">
                        {reasons.map((reason) => (
                            <ReasonCard key={reason.title} {...reason} />
                        ))}
                    </div>
                </section>
            </main>
            <AppFooter />
        </>
    );
}

// TODO: Move this component into a seperate file
function Navbar({ className }: { className?: ClassValue }) {
    const { auth } = usePage<SharedData>().props;

    const [scrollY, setScrollY] = useState(() => window.scrollY);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed top-4 left-1/2 z-10 w-full max-w-screen-md -translate-x-1/2 px-6">
            <div
                className={cn(
                    'flex items-center gap-7 rounded-full px-2 py-1.5 transition-colors',
                    scrollY > 100 ? 'bg-blue-900' : 'bg-transparent',
                    className,
                )}
            >
                <Link className="block shrink-0" href={route('home')}>
                    <AppLogoIcon className="ml-2 h-6 w-auto fill-background" />
                </Link>
                <div className="flex shrink-0 items-center gap-6">
                    <Link className="block text-sm text-background" href={route('home')}>
                        Cari Lowongan
                    </Link>
                    <Link className="block text-sm text-background" href={route('home')}>
                        Cari Talenta
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-end gap-2">
                    {auth.isAuthenticated ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-background hover:bg-transparent hover:text-background hover:opacity-80"
                                    >
                                        <BellIcon className="size-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-(--radix-dropdown-menu-trigger-width) min-w-80 rounded-lg"
                                    align="end"
                                    side="bottom"
                                >
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <h3 className="font-semibold">Notifikasi</h3>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <div className="py-8 text-center text-muted-foreground">
                                        <BellIcon className="mx-auto mb-2 size-8 opacity-50" />
                                        <p className="text-sm">Belum ada notifikasi</p>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="size-8 overflow-hidden rounded-full">
                                        <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                            {getInitials(auth.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                    align="end"
                                    side="bottom"
                                >
                                    <UserMenuContent user={auth.user} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" className="text-background hover:bg-transparent hover:text-background hover:opacity-80" asChild>
                                <Link href={route('login')}>Masuk</Link>
                            </Button>
                            <Button variant="secondary" className="text-blue-900" asChild>
                                <Link href={route('register')}>Daftar</Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

interface ReasonCardProps {
    Icon: LucideIcon;
    title: string;
    description: string;
}

function ReasonCard({ Icon, title, description }: ReasonCardProps) {
    return (
        <article className="rounded-md border border-border p-4">
            <div className="size-9 rounded-full bg-primary p-2 text-primary-foreground">
                <Icon className="size-full" />
            </div>
            <div className="mt-4 w-full space-y-2 text-sm">
                <h3 className="mb-2 text-sm font-semibold text-foreground">{title}</h3>
                <p className="text-sm font-normal text-muted-foreground">{description}</p>
            </div>
        </article>
    );
}
