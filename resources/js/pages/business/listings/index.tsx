import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { ChevronDownIcon, FilterIcon, PlusIcon, SendIcon } from 'lucide-react';

import { cn, formatIDR } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Pagination } from '@/components/ui/pagination';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { Listing, PaginationData } from '@/types';

interface BusinessListingsIndexProps {
    listings: PaginationData<Listing>;
    filters: {
        status: string | null;
        sort: string | null;
    };
}

export default function BusinessListingsIndex({ listings, filters }: BusinessListingsIndexProps) {
    const handleFilterChange = (name: string, value: string) => {
        router.get(
            route('business.listings.index'),
            {
                ...filters,
                [name]: value,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const clearFilters = () => {
        router.get(
            route('business.listings.index'),
            {
                status: null,
                sort: 'latest',
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <AppLayout>
            <Head title="Kelola Lowongan" />

            <div className="container mx-auto px-6 py-8 pt-24">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold">Kelola Lowongan</h1>
                    <Button className="gap-2" onClick={() => router.visit(route('business.listings.create'))}>
                        <PlusIcon className="h-4 w-4" />
                        Buat Lowongan Baru
                    </Button>
                </div>

                {/* Filters */}
                <Card className="mb-6 shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <FilterIcon className="h-5 w-5 text-blue-500" />
                            Filter Lowongan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="w-full sm:w-auto">
                                <Select value={filters.status || ''} onValueChange={(value) => handleFilterChange('status', value)}>
                                    <SelectTrigger className="w-full sm:w-[200px]">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Status</SelectLabel>
                                            <SelectItem value="OPEN">Tersedia</SelectItem>
                                            <SelectItem value="IN_PROGRESS">Sedang Berjalan</SelectItem>
                                            <SelectItem value="COMPLETED">Selesai</SelectItem>
                                            <SelectItem value="CANCELLED">Dibatalkan</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-full sm:w-auto">
                                <Select value={filters.sort || 'latest'} onValueChange={(value) => handleFilterChange('sort', value)}>
                                    <SelectTrigger className="w-full sm:w-[200px]">
                                        <SelectValue placeholder="Urutan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Urutan</SelectLabel>
                                            <SelectItem value="latest">Terbaru</SelectItem>
                                            <SelectItem value="oldest">Terlama</SelectItem>
                                            <SelectItem value="proposals_high">Proposal Terbanyak</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button variant="outline" onClick={clearFilters}>
                                Reset Filter
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {listings.data.length === 0 && filters.status === null ? (
                        <Card className="shadow-md">
                            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="rounded-full bg-blue-100 p-4 text-blue-600">
                                    <PlusIcon className="h-8 w-8" />
                                </div>
                                <h2 className="mt-6 text-xl font-medium">Belum Ada Lowongan</h2>
                                <p className="mt-2 max-w-md text-muted-foreground">
                                    Anda belum memiliki lowongan. Buat lowongan baru untuk mulai mencari pekerja yang sesuai dengan kebutuhan Anda.
                                </p>
                                <Button className="mt-6" onClick={() => router.visit(route('business.listings.create'))}>
                                    Buat Lowongan Baru
                                </Button>
                            </CardContent>
                        </Card>
                    ) : filters.status !== null ? (
                        <Card className="shadow-md">
                            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="rounded-full bg-blue-100 p-4 text-blue-600">
                                    <SendIcon className="size-8" />
                                </div>
                                <h2 className="mt-6 text-xl font-medium">Tidak Ada Lowongan</h2>
                                <p className="mt-2 max-w-md text-muted-foreground">
                                    Tidak ada lowongan yang sesuai dengan filter yang Anda pilih. Silakan ubah filter atau buat lowongan baru.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            {listings.data.map((listing) => (
                                <Card
                                    key={listing.id}
                                    className="shadow-md"
                                    onClick={() => router.visit(route('business.listings.show', { listing: listing.id }))}
                                >
                                    <CardContent>
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div className="space-y-2">
                                                <h2 className="text-lg font-medium">{listing.title}</h2>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <span>Dibuat:</span>
                                                        <span>{format(new Date(listing.created_at), 'dd MMM yyyy')}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <span>Proposal:</span>
                                                        <span>{listing.proposals?.length || 0}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
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

                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                                        <Button variant="ghost" size="icon">
                                                            <ChevronDownIcon className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                router.visit(route('business.listings.show', { listing: listing.id }));
                                                            }}
                                                        >
                                                            Lihat Detail
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                router.visit(route('business.listings.edit', { listing: listing.id }));
                                                            }}
                                                        >
                                                            Edit Lowongan
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                router.visit(route('business.listings.proposals', { listing: listing.id }));
                                                            }}
                                                        >
                                                            Lihat Proposal ({listing.proposals?.length || 0})
                                                        </DropdownMenuItem>

                                                        <DropdownMenuSeparator />

                                                        {listing.status === 'OPEN' && (
                                                            <DropdownMenuItem
                                                                className="text-red-600"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    if (confirm('Apakah Anda yakin ingin membatalkan lowongan ini?')) {
                                                                        router.patch(
                                                                            route('business.listings.update-status', { listing: listing.id }),
                                                                            { status: 'CANCELLED' },
                                                                            {
                                                                                preserveScroll: true,
                                                                            },
                                                                        );
                                                                    }
                                                                }}
                                                            >
                                                                Batalkan Lowongan
                                                            </DropdownMenuItem>
                                                        )}

                                                        {listing.status === 'IN_PROGRESS' && (
                                                            <DropdownMenuItem
                                                                className="text-green-600"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    if (confirm('Apakah Anda yakin ingin menandai lowongan ini sebagai selesai?')) {
                                                                        router.patch(
                                                                            route('business.listings.update-status', { listing: listing.id }),
                                                                            { status: 'COMPLETED' },
                                                                            {
                                                                                preserveScroll: true,
                                                                            },
                                                                        );
                                                                    }
                                                                }}
                                                            >
                                                                Tandai Selesai
                                                            </DropdownMenuItem>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {listing.skills.map((skill) => (
                                                <Badge key={skill.id} variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                                    {skill.name}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div>
                                                <span className="text-sm text-muted-foreground">Budget: </span>
                                                <span className="font-medium">
                                                    {listing.listing_type === 'PROJECT' ? (
                                                        <>
                                                            {formatIDR(listing.project_budget_min)} - {formatIDR(listing.project_budget_max)}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {formatIDR(listing.rate_amount)}/{listing.rate_type?.toLowerCase()}
                                                        </>
                                                    )}
                                                </span>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="gap-1"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    router.visit(route('business.listings.proposals', { listing: listing.id }));
                                                }}
                                            >
                                                Lihat Proposal ({listing.proposals?.length || 0})
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {listings.last_page > 1 && (
                                <div className="mt-6 flex justify-center">
                                    <Pagination currentPage={listings.current_page} lastPage={listings.last_page} links={listings.links} />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
