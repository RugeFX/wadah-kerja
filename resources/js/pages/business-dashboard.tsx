import { cn, formatIDR } from '@/lib/utils';
import { Head, router, usePage } from '@inertiajs/react';
import { BriefcaseIcon, ChevronRightIcon, ClipboardIcon, ScrollTextIcon, StarIcon, TrendingUpIcon, UsersIcon } from 'lucide-react';

import { getCurrentTimeOfDay } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserInfo } from '@/components/user-info';
import AppLayout from '@/layouts/app-layout';
import type { BusinessProfile, Listing, Proposal, SharedData, WorkerProfileWithRelations } from '@/types';

interface BusinessDashboardProps {
    businessProfile: BusinessProfile;
    recentListings: Listing[];
    recentProposals: Proposal[];
    topApplicants: WorkerProfileWithRelations[];
    stats: {
        totalListings: number;
        openListings: number;
        inProgressListings: number;
        completedListings: number;
        totalProposals: number;
        totalReviews: number;
        averageRating: number;
    };
}

export default function BusinessDashboard({ stats, recentListings, recentProposals, topApplicants }: BusinessDashboardProps) {
    const { auth } = usePage<SharedData<true>>().props;

    return (
        <AppLayout>
            <Head title="Dashboard Bisnis" />

            {/* Business Overview - Full Bleed */}
            <div className="w-full bg-blue-800 pt-24 shadow-md">
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
                    <Card className="col-span-2 shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BriefcaseIcon className="h-5 w-5 text-blue-500" />
                                Ringkasan Lowongan Kerja
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative mt-4">
                                <div className="absolute -inset-2">
                                    <div className="h-full w-full rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 opacity-50 blur-lg" />
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

                    <Card className="shadow-md">
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
                                    <Button
                                        variant="link"
                                        className="mt-2 h-auto p-0 text-blue-600"
                                        onClick={() => router.visit(route('business.proposals.index'))}
                                    >
                                        Lihat Semua Proposal
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Listings */}
                <Card className="shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="flex items-center gap-2">
                            <ClipboardIcon className="h-5 w-5 text-blue-500" />
                            Lowongan Terbaru
                        </CardTitle>
                        <Button variant="default" size="lg" onClick={() => router.visit(route('business.listings.create'))}>
                            Buat Lowongan Baru
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {recentListings.length > 0 ? (
                            <div className="space-y-4">
                                {recentListings.map((listing) => (
                                    <div
                                        key={listing.id}
                                        className="flex items-center justify-between rounded-lg border p-3 transition-all hover:bg-muted/50"
                                        onClick={() => router.visit(route('business.listings.show', { listing: listing.id }))}
                                        role="button"
                                    >
                                        <div className="space-y-1">
                                            <p className="font-medium">{listing.title}</p>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Badge
                                                    variant="outline"
                                                    className={cn(
                                                        listing.status === 'OPEN' && 'border-blue-200 bg-blue-100 text-blue-700 hover:bg-blue-100',
                                                        listing.status === 'IN_PROGRESS' &&
                                                            'border-purple-200 bg-purple-100 text-purple-700 hover:bg-purple-100',
                                                        listing.status === 'COMPLETED' &&
                                                            'border-green-200 bg-green-100 text-green-700 hover:bg-green-100',
                                                        listing.status === 'CANCELLED' && 'border-red-200 bg-red-100 text-red-700 hover:bg-red-100',
                                                    )}
                                                >
                                                    {listing.status === 'OPEN' && 'Tersedia'}
                                                    {listing.status === 'IN_PROGRESS' && 'Sedang Berjalan'}
                                                    {listing.status === 'COMPLETED' && 'Selesai'}
                                                    {listing.status === 'CANCELLED' && 'Dibatalkan'}
                                                </Badge>
                                                <span>•</span>
                                                <span>
                                                    {listing.listing_type === 'PROJECT'
                                                        ? `${formatIDR(listing.project_budget_min)} - ${formatIDR(listing.project_budget_max)}`
                                                        : `${formatIDR(listing.rate_amount)}/${listing.rate_type?.toLowerCase()}`}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary">{listing.proposals?.length || 0} Proposal</Badge>
                                            <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-6 text-center">
                                <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                                    <ClipboardIcon className="h-6 w-6" />
                                </div>
                                <h3 className="mt-4 text-lg font-medium">Belum ada lowongan</h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Buat lowongan baru untuk mulai mencari pekerja yang sesuai dengan kebutuhan Anda.
                                </p>
                                <Button className="mt-4" onClick={() => router.visit(route('business.listings.create'))}>
                                    Buat Lowongan Baru
                                </Button>
                            </div>
                        )}
                        {recentListings.length > 0 && (
                            <div className="mt-4 flex justify-center">
                                <Button variant="outline" onClick={() => router.visit(route('business.listings.index'))}>
                                    Lihat Semua Lowongan
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Recent Proposals */}
                <Card className="shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="flex items-center gap-2">
                            <ScrollTextIcon className="h-5 w-5 text-blue-500" />
                            Proposal Terbaru
                        </CardTitle>
                        <Button variant="outline" size="lg" onClick={() => router.visit(route('business.proposals.index'))}>
                            Lihat Semua Proposal
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {recentProposals.length > 0 ? (
                            <div className="space-y-4">
                                {recentProposals.map((proposal) => (
                                    <div
                                        key={proposal.id}
                                        className="flex items-center justify-between rounded-lg border p-3 transition-all hover:bg-muted/50"
                                        onClick={() => router.visit(route('business.proposals.show', { proposal: proposal.id }))}
                                        role="button"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 overflow-hidden rounded-full">
                                                <img
                                                    src={proposal.worker_profile?.profile_picture_url || '/images/default-avatar.png'}
                                                    alt={proposal.worker_profile?.user?.name || 'Worker'}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="font-medium">{proposal.worker_profile?.user?.name || 'Worker'}</p>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <span>{proposal.listing?.title || 'Listing'}</span>
                                                    <span>•</span>
                                                    <Badge
                                                        variant="outline"
                                                        className={cn(
                                                            proposal.status === 'SENT' &&
                                                                'border-blue-200 bg-blue-100 text-blue-700 hover:bg-blue-100',
                                                            proposal.status === 'VIEWED' &&
                                                                'border-purple-200 bg-purple-100 text-purple-700 hover:bg-purple-100',
                                                            proposal.status === 'ACCEPTED' &&
                                                                'border-green-200 bg-green-100 text-green-700 hover:bg-green-100',
                                                            proposal.status === 'REJECTED' &&
                                                                'border-red-200 bg-red-100 text-red-700 hover:bg-red-100',
                                                        )}
                                                    >
                                                        {proposal.status === 'SENT' && 'Terkirim'}
                                                        {proposal.status === 'VIEWED' && 'Dilihat'}
                                                        {proposal.status === 'ACCEPTED' && 'Diterima'}
                                                        {proposal.status === 'REJECTED' && 'Ditolak'}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-6 text-center">
                                <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                                    <ScrollTextIcon className="h-6 w-6" />
                                </div>
                                <h3 className="mt-4 text-lg font-medium">Belum ada proposal</h3>
                                <p className="mt-2 text-sm text-muted-foreground">Anda belum menerima proposal untuk lowongan Anda.</p>
                            </div>
                        )}
                        {recentProposals.length > 0 && (
                            <div className="mt-4 flex justify-center">
                                <Button variant="outline" onClick={() => router.visit(route('business.proposals.index'))}>
                                    Lihat Semua Proposal
                                </Button>
                            </div>
                        )}
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
