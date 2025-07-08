import { Head, router, usePage } from '@inertiajs/react';
import { BriefcaseIcon, InboxIcon, StarIcon, TrendingUpIcon, UserIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatIDR, getCurrentTimeOfDay } from '@/lib/utils';
import type { Listing, SharedData } from '@/types';

interface WorkerDashboardProps {
    stats: {
        totalApplications: number;
        activeJobs: number;
        unreadMessages: number;
    };
    recommendedListings: Listing[];
}

export default function WorkerDashboard({ stats, recommendedListings }: WorkerDashboardProps) {
    const { auth } = usePage<SharedData<true>>().props;

    return (
        <AppLayout>
            <Head title="Dashboard Pekerja" />

            {/* Worker Overview - Full Bleed */}
            <div className="relative w-full bg-gradient-to-b from-blue-900 to-blue-700 pt-24 shadow-xl shadow-blue-900/10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#ffffff20_100%)] dark:bg-[linear-gradient(to_right,transparent_0%,#ffffff10_100%)]" />
                <div className="relative container mx-auto px-6 py-8">
                    {/* User Greeting */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                Selamat {getCurrentTimeOfDay()}, {auth.user.name.split(' ')[0]} 👋
                            </h1>
                            <p className="mt-2 text-blue-100">Selamat datang kembali di dasbor Anda. Berikut ringkasan aktivitas Anda hari ini.</p>
                        </div>
                        <Button
                            variant="outline"
                            className="bg-white/10 text-white hover:bg-white/20"
                            onClick={() => router.visit(route('worker-profile.edit'))}
                        >
                            <UserIcon className="mr-2 h-4 w-4" /> Edit Profile
                        </Button>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-2 text-lg font-semibold text-white">
                        <TrendingUpIcon className="h-5 w-5" />
                        <h2>Ringkasan Aktivitas</h2>
                    </div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                            <h3 className="text-sm text-blue-100">Total Lamaran</h3>
                            <div className="mt-2 text-2xl font-bold text-white">{stats.totalApplications}</div>
                        </div>
                        <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                            <h3 className="text-sm text-blue-100">Proyek Aktif</h3>
                            <div className="mt-2 text-2xl font-bold text-white">{stats.activeJobs}</div>
                        </div>
                        <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                            <h3 className="text-sm text-blue-100">Pesan Baru</h3>
                            <div className="mt-2 text-2xl font-bold text-white">{stats.unreadMessages}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto flex h-full flex-1 flex-col gap-6 px-6 py-8">
                {/* Detailed Stats Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <Card className="relative overflow-hidden bg-white/50 shadow-lg shadow-blue-900/5 backdrop-blur-sm dark:bg-neutral-900/50">
                        <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-blue-500/10" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Lamaran Terkirim</CardTitle>
                            <BriefcaseIcon className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.totalApplications}</div>
                            <p className="text-xs text-muted-foreground">Total lamaran yang telah Anda kirim</p>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden bg-white/50 shadow-lg shadow-green-900/5 backdrop-blur-sm dark:bg-neutral-900/50">
                        <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-green-500/10" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Proyek Aktif</CardTitle>
                            <TrendingUpIcon className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-900 dark:text-green-100">{stats.activeJobs}</div>
                            <p className="text-xs text-muted-foreground">Proyek yang sedang Anda kerjakan</p>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden bg-white/50 shadow-lg shadow-purple-900/5 backdrop-blur-sm dark:bg-neutral-900/50">
                        <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-purple-500/10" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Pesan Baru</CardTitle>
                            <InboxIcon className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{stats.unreadMessages}</div>
                            <p className="text-xs text-muted-foreground">Pesan yang belum Anda baca</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Job Recommendations */}
                <Card className="bg-white/50 shadow-lg shadow-blue-900/5 backdrop-blur-sm dark:bg-neutral-900/50">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <StarIcon className="h-5 w-5 text-yellow-500" />
                                Rekomendasi Pekerjaan Terbaru
                            </CardTitle>
                            <Button variant="default" size="lg" onClick={() => router.get(route('listings.index'))}>
                                Cari Pekerjaan Lain
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {recommendedListings.map((listing) => (
                                <Card key={listing.id} className="group cursor-pointer transition-all hover:shadow-md">
                                    <CardHeader>
                                        <CardTitle className="line-clamp-2 text-lg">{listing.title}</CardTitle>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-muted-foreground">{listing.business_profile.company_name}</p>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    listing.listing_type === 'PROJECT'
                                                        ? 'border-orange-200 bg-orange-100 text-orange-700 hover:bg-orange-100'
                                                        : 'border-purple-200 bg-purple-100 text-purple-700 hover:bg-purple-100'
                                                }
                                            >
                                                {listing.listing_type === 'PROJECT' ? 'Proyek' : 'Per Jam'}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span>📍</span>
                                            <span>{listing.business_profile.location}</span>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {listing.skills.map((skill) => (
                                                <Badge key={skill.id} variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                                    {skill.name}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="flex items-baseline gap-1 font-medium">
                                            {listing.listing_type === 'PROJECT' ? (
                                                <>
                                                    <span className="text-lg text-foreground">{formatIDR(listing.project_budget_min)}</span>
                                                    <span className="text-muted-foreground">- {formatIDR(listing.project_budget_max)}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-lg text-foreground">{formatIDR(listing.rate_amount)}</span>
                                                    <span className="text-muted-foreground">/{listing.rate_type?.toLowerCase()}</span>
                                                </>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
