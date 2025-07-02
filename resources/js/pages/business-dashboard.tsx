import { Head, usePage } from '@inertiajs/react';
import { BriefcaseIcon, ClipboardIcon, ScrollTextIcon, StarIcon, TrendingUpIcon, UsersIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserInfo } from '@/components/user-info';
import AppLayout from '@/layouts/app-layout';
import { formatIDR, getCurrentTimeOfDay } from '@/lib/utils';
import type { Listing, SharedData, WorkerProfileWithRelations } from '@/types';

interface BusinessDashboardProps {
    stats: {
        totalListings: number;
        openListings: number;
        inProgressListings: number;
        completedListings: number;
        totalProposals: number;
        totalReviews: number;
        averageRating: number;
    };
    recentListings: Listing[];
    topApplicants: WorkerProfileWithRelations[];
}

export default function BusinessDashboard({ stats, recentListings, topApplicants }: BusinessDashboardProps) {
    const { auth } = usePage<SharedData<true>>().props;

    return (
        <AppLayout>
            <Head title="Dashboard Bisnis" />

            {/* Business Overview - Full Bleed */}
            <div className="relative w-full bg-gradient-to-b from-blue-900 to-blue-700 pt-24 shadow-xl shadow-blue-900/10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#ffffff20_100%)] dark:bg-[linear-gradient(to_right,transparent_0%,#ffffff10_100%)]" />
                <div className="container mx-auto px-6 py-8">
                    {/* User Greeting */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white">
                            Selamat {getCurrentTimeOfDay()}, {auth.user.name.split(' ')[0]} 👋
                        </h1>
                        <p className="mt-2 text-blue-100">
                            Selamat datang kembali di dasbor bisnis Anda. Berikut ringkasan aktivitas perusahaan Anda.
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-2 text-lg font-semibold text-white">
                        <TrendingUpIcon className="h-5 w-5" />
                        <h2>Ringkasan Aktivitas</h2>
                    </div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                            <h3 className="text-sm text-blue-100">Total Lowongan</h3>
                            <div className="mt-2 text-2xl font-bold text-white">{stats.totalListings}</div>
                        </div>
                        <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                            <h3 className="text-sm text-blue-100">Lowongan Aktif</h3>
                            <div className="mt-2 text-2xl font-bold text-white">{stats.openListings + stats.inProgressListings}</div>
                        </div>
                        <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                            <h3 className="text-sm text-blue-100">Total Lamaran</h3>
                            <div className="mt-2 text-2xl font-bold text-white">{stats.totalProposals}</div>
                        </div>
                        <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                            <h3 className="text-sm text-blue-100">Rating Perusahaan</h3>
                            <div className="mt-2 flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-white">{stats.averageRating.toFixed(1)}</span>
                                <span className="text-sm text-blue-100">/5</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto flex h-full flex-1 flex-col gap-6 px-6 py-8">
                {/* Listing Statistics */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <Card className="col-span-2 bg-white/50 shadow-lg shadow-blue-900/5 backdrop-blur-sm dark:bg-neutral-900/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BriefcaseIcon className="h-5 w-5 text-blue-500" />
                                Ringkasan Lowongan Kerja
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative mt-4">
                                <div className="absolute -inset-2">
                                    <div className="h-full w-full rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-50 blur-lg" />
                                </div>
                                <div className="relative grid gap-4 rounded-2xl border bg-card p-4 sm:grid-cols-3">
                                    <div className="flex flex-col items-center gap-2 rounded-xl bg-blue-500/10 p-4">
                                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                            Tersedia
                                        </Badge>
                                        <div className="text-2xl font-bold text-blue-700">{stats.openListings}</div>
                                        <div className="text-center text-xs text-muted-foreground">Lowongan tersedia</div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 rounded-xl bg-purple-500/10 p-4">
                                        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">Sedang Berjalan</Badge>
                                        <div className="text-2xl font-bold text-purple-700">{stats.inProgressListings}</div>
                                        <div className="text-center text-xs text-muted-foreground">Proyek aktif</div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 rounded-xl bg-green-500/10 p-4">
                                        <Badge variant="outline" className="border-green-200 bg-green-100 text-green-700 hover:bg-green-100">
                                            Selesai
                                        </Badge>
                                        <div className="text-2xl font-bold text-green-700">{stats.completedListings}</div>
                                        <div className="text-center text-xs text-muted-foreground">Proyek selesai</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/50 shadow-lg shadow-blue-900/5 backdrop-blur-sm dark:bg-neutral-900/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <StarIcon className="h-5 w-5 text-yellow-500" />
                                Ulasan & Lamaran
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mt-4 space-y-4">
                                <div className="rounded-xl bg-yellow-500/10 p-4">
                                    <div className="flex items-baseline justify-between">
                                        <div className="text-sm text-muted-foreground">Total Ulasan</div>
                                        <div className="text-xl font-semibold text-yellow-700">{stats.totalReviews}</div>
                                    </div>
                                    <div className="mt-2 flex items-baseline gap-2">
                                        <StarIcon className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                        <span className="text-sm text-muted-foreground">Rating rata-rata: </span>
                                        <span className="font-medium text-yellow-700">{stats.averageRating.toFixed(1)}/5</span>
                                    </div>
                                </div>
                                <div className="rounded-xl bg-blue-500/10 p-4">
                                    <div className="flex items-baseline justify-between">
                                        <div className="text-sm text-muted-foreground">Total Lamaran</div>
                                        <div className="text-xl font-semibold text-blue-700">{stats.totalProposals}</div>
                                    </div>
                                    <div className="mt-2 flex items-baseline gap-2">
                                        <ScrollTextIcon className="h-4 w-4 text-blue-500" />
                                        <span className="text-sm text-muted-foreground">Lamaran diterima</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Listings */}
                <Card className="bg-white/50 shadow-lg shadow-blue-900/5 backdrop-blur-sm dark:bg-neutral-900/50">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <ClipboardIcon className="h-5 w-5 text-blue-500" />
                                Lowongan Terbaru
                            </CardTitle>
                            <Button variant="default" size="lg">
                                Buat Lowongan Baru
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-xl border shadow-sm">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50">
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Tipe</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Anggaran/Rate</TableHead>
                                        <TableHead>Lamaran</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentListings.map((listing) => (
                                        <TableRow key={listing.id}>
                                            <TableCell className="min-w-52">
                                                <div className="space-y-1">
                                                    <div className="font-medium">{listing.title}</div>
                                                    <div className="text-sm text-muted-foreground">{listing.business_profile.location}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
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
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        listing.status === 'OPEN'
                                                            ? 'border-blue-200 bg-blue-100 text-blue-700 hover:bg-blue-100'
                                                            : listing.status === 'IN_PROGRESS'
                                                              ? 'border-purple-200 bg-purple-100 text-purple-700 hover:bg-purple-100'
                                                              : 'border-green-200 bg-green-100 text-green-700 hover:bg-green-100'
                                                    }
                                                >
                                                    {listing.status === 'OPEN'
                                                        ? 'Tersedia'
                                                        : listing.status === 'IN_PROGRESS'
                                                          ? 'Berjalan'
                                                          : 'Selesai'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {listing.listing_type === 'PROJECT' ? (
                                                    <div className="space-y-1">
                                                        <div>{formatIDR(listing.project_budget_min)}</div>
                                                        <div className="text-sm text-muted-foreground">- {formatIDR(listing.project_budget_max)}</div>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-1">
                                                        <div>{formatIDR(listing.rate_amount)}</div>
                                                        <div className="text-sm text-muted-foreground">/{listing.rate_type?.toLowerCase()}</div>
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <UsersIcon className="h-4 w-4 text-muted-foreground" />
                                                    <span>{listing.proposals?.length ?? 0}</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Top Applicants */}
                <Card className="bg-white/50 shadow-lg shadow-blue-900/5 backdrop-blur-sm dark:bg-neutral-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UsersIcon className="h-5 w-5 text-blue-500" />
                            Pelamar Teratas
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-xl border shadow-sm">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50">
                                        <TableHead>Pelamar</TableHead>
                                        <TableHead>Keahlian</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>Proyek Selesai</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {topApplicants.map((worker) => (
                                        <TableRow key={worker.id}>
                                            <TableCell className="min-w-52">
                                                <UserInfo user={worker.user} />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {worker.skills.slice(0, 3).map((skill) => (
                                                        <Badge
                                                            key={skill.id}
                                                            variant="secondary"
                                                            className="bg-blue-100 text-blue-700 hover:bg-blue-100"
                                                        >
                                                            {skill.name}
                                                        </Badge>
                                                    ))}
                                                    {worker.skills.length > 3 && (
                                                        <Badge variant="outline" className="border-blue-200">
                                                            +{worker.skills.length - 3}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <StarIcon className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                                    <span className="font-medium">{worker.average_rating.toFixed(1)}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">{worker.completed_projects_count}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
