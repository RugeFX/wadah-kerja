import { Head, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import {
    BriefcaseIcon,
    BuildingIcon,
    FolderIcon,
    GraduationCapIcon,
    ScrollTextIcon,
    StarIcon,
    TrendingUpIcon,
    UserIcon,
    UsersIcon,
} from 'lucide-react';

import { getCurrentTimeOfDay } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserInfo } from '@/components/user-info';
import AppLayout from '@/layouts/app-layout';
import type { SharedData, User } from '@/types';

interface DashboardProps {
    users: User[];
    statistics: {
        totalUsers: number;
        verifiedUsers: number;
        totalListings: number;
        openListings: number;
        inProgressListings: number;
        completedListings: number;
        totalBusinessProfiles: number;
        totalWorkerProfiles: number;
        totalSkills: number;
        totalProposals: number;
        totalReviews: number;
        averageRating: number;
        totalPortfolioItems: number;
    };
}

export default function Dashboard({ users, statistics }: DashboardProps) {
    const { auth } = usePage<SharedData<true>>().props;

    return (
        <AppLayout>
            <Head title="Dasbor" />
            {/* Platform Overview - Full Bleed */}
            <div className="relative w-full bg-gradient-to-b from-blue-900 to-blue-700 pt-24 shadow-xl shadow-blue-900/10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#ffffff20_100%)] dark:bg-[linear-gradient(to_right,transparent_0%,#ffffff10_100%)]" />
                <div className="container mx-auto px-6 py-8">
                    {/* User Greeting */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white">
                            Selamat {getCurrentTimeOfDay()}, {auth.user.name.split(' ')[0]} 👋
                        </h1>
                        <p className="mt-2 text-blue-100">Selamat datang kembali di dasbor Anda. Berikut ringkasan aktivitas platform hari ini.</p>
                    </div>

                    {/* Platform Overview */}
                    <div className="flex items-center gap-2 text-lg font-semibold text-white">
                        <TrendingUpIcon className="h-5 w-5" />
                        <h2>Ringkasan Platform</h2>
                    </div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                            <h3 className="text-sm text-blue-100">Total Pengguna</h3>
                            <div className="mt-2 text-2xl font-bold text-white">{statistics.totalUsers}</div>
                        </div>
                        <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                            <h3 className="text-sm text-blue-100">Lowongan Aktif</h3>
                            <div className="mt-2 text-2xl font-bold text-white">{statistics.openListings + statistics.inProgressListings}</div>
                        </div>
                        <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                            <h3 className="text-sm text-blue-100">Total Proyek</h3>
                            <div className="mt-2 text-2xl font-bold text-white">{statistics.completedListings}</div>
                        </div>
                        <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                            <h3 className="text-sm text-blue-100">Rata-rata Rating</h3>
                            <div className="mt-2 flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-white">{statistics.averageRating.toFixed(1)}</span>
                                <span className="text-sm text-blue-100">/5</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto flex h-full flex-1 flex-col gap-6 px-6 py-8">
                {/* User Statistics */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="relative overflow-hidden bg-white/50 shadow-lg shadow-blue-900/5 backdrop-blur-sm dark:bg-neutral-900/50">
                        <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-blue-500/10" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Profil Bisnis</CardTitle>
                            <BuildingIcon className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{statistics.totalBusinessProfiles}</div>
                            <p className="text-xs text-muted-foreground">Bisnis terdaftar</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-white/50 shadow-lg shadow-green-900/5 backdrop-blur-sm dark:bg-neutral-900/50">
                        <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-green-500/10" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Profil Pekerja</CardTitle>
                            <UserIcon className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-900 dark:text-green-100">{statistics.totalWorkerProfiles}</div>
                            <p className="text-xs text-muted-foreground">Pekerja terdaftar</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-white/50 shadow-lg shadow-purple-900/5 backdrop-blur-sm dark:bg-neutral-900/50">
                        <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-purple-500/10" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Keahlian Tersedia</CardTitle>
                            <GraduationCapIcon className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{statistics.totalSkills}</div>
                            <p className="text-xs text-muted-foreground">Keahlian terdaftar</p>
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-white/50 shadow-lg shadow-orange-900/5 backdrop-blur-sm dark:bg-neutral-900/50">
                        <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-orange-500/10" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Item Portofolio</CardTitle>
                            <FolderIcon className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{statistics.totalPortfolioItems}</div>
                            <p className="text-xs text-muted-foreground">Karya ditampilkan</p>
                        </CardContent>
                    </Card>
                </div>

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
                                        <div className="text-2xl font-bold text-blue-700">{statistics.openListings}</div>
                                        <div className="text-center text-xs text-muted-foreground">Lowongan tersedia</div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 rounded-xl bg-purple-500/10 p-4">
                                        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">Sedang Berjalan</Badge>
                                        <div className="text-2xl font-bold text-purple-700">{statistics.inProgressListings}</div>
                                        <div className="text-center text-xs text-muted-foreground">Proyek aktif</div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 rounded-xl bg-green-500/10 p-4">
                                        <Badge variant="outline" className="border-green-200 bg-green-100 text-green-700 hover:bg-green-100">
                                            Selesai
                                        </Badge>
                                        <div className="text-2xl font-bold text-green-700">{statistics.completedListings}</div>
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
                                Ulasan & Proposal
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mt-4 space-y-4">
                                <div className="rounded-xl bg-yellow-500/10 p-4">
                                    <div className="flex items-baseline justify-between">
                                        <div className="text-sm text-muted-foreground">Total Ulasan</div>
                                        <div className="text-xl font-semibold text-yellow-700">{statistics.totalReviews}</div>
                                    </div>
                                    <div className="mt-2 flex items-baseline gap-2">
                                        <StarIcon className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                        <span className="text-sm text-muted-foreground">Rata-rata rating: </span>
                                        <span className="font-medium text-yellow-700">{statistics.averageRating.toFixed(1)}/5</span>
                                    </div>
                                </div>
                                <div className="rounded-xl bg-blue-500/10 p-4">
                                    <div className="flex items-baseline justify-between">
                                        <div className="text-sm text-muted-foreground">Total Proposal</div>
                                        <div className="text-xl font-semibold text-blue-700">{statistics.totalProposals}</div>
                                    </div>
                                    <div className="mt-2 flex items-baseline gap-2">
                                        <ScrollTextIcon className="h-4 w-4 text-blue-500" />
                                        <span className="text-sm text-muted-foreground">Lamaran terkirim</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Users Table */}
                <Card className="bg-white/50 shadow-lg shadow-blue-900/5 backdrop-blur-sm dark:bg-neutral-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UsersIcon className="h-5 w-5 text-blue-500" />
                            Pengguna Terbaru
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-xl border shadow-sm">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50">
                                        <TableHead>Pengguna</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Bergabung</TableHead>
                                        <TableHead>Terakhir Diperbarui</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="overflow-x-auto">
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="min-w-52">
                                                <UserInfo user={user} showEmail />
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={user.email_verified_at ? 'default' : 'secondary'}
                                                    className={
                                                        user.email_verified_at
                                                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                                                            : 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                                                    }
                                                >
                                                    {user.email_verified_at ? 'Terverifikasi' : 'Belum Terverifikasi'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {format(new Date(user.created_at), 'MMM d, yyyy')}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {format(new Date(user.updated_at), 'MMM d, yyyy')}
                                            </TableCell>
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
