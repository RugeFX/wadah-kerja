import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { CheckCircleIcon, ChevronDownIcon, EyeIcon, FilterIcon, SendIcon, StarIcon, XCircleIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

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
import type { Listing, PaginationData, Proposal } from '@/types';

interface BusinessProposalsIndexProps {
    proposals: PaginationData<Proposal>;
    listings: Pick<Listing, 'id' | 'title'>[];
    filters: {
        status: string | null;
        listing_id: string | null;
        sort: string | null;
    };
}

export default function BusinessProposalsIndex({ proposals, listings, filters }: BusinessProposalsIndexProps) {
    const handleFilterChange = (name: string, value: string) => {
        router.get(
            route('business.proposals.index'),
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
            route('business.proposals.index'),
            {
                status: null,
                listing_id: null,
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
            <Head title="Kelola Proposal" />

            <div className="container mx-auto px-6 py-8 pt-24">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold">Kelola Proposal</h1>
                </div>

                {/* Filters */}
                <Card className="mb-6 shadow-lg shadow-blue-900/5 dark:bg-neutral-900/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <FilterIcon className="h-5 w-5 text-blue-500" />
                            Filter Proposal
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
                                            <SelectItem value="SENT">Terkirim</SelectItem>
                                            <SelectItem value="VIEWED">Dilihat</SelectItem>
                                            <SelectItem value="ACCEPTED">Diterima</SelectItem>
                                            <SelectItem value="REJECTED">Ditolak</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-full sm:w-auto">
                                <Select value={filters.listing_id || ''} onValueChange={(value) => handleFilterChange('listing_id', value)}>
                                    <SelectTrigger className="w-full sm:w-[250px]">
                                        <SelectValue placeholder="Lowongan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Lowongan</SelectLabel>
                                            {listings.map((listing) => (
                                                <SelectItem key={listing.id} value={listing.id.toString()}>
                                                    {listing.title}
                                                </SelectItem>
                                            ))}
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
                                            <SelectItem value="worker_rating">Rating Tertinggi</SelectItem>
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
                    {proposals.data.length === 0 ? (
                        <Card className="py-0 shadow-lg shadow-blue-900/5 dark:bg-neutral-900/50">
                            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                                <SendIcon className="h-16 w-16 text-muted-foreground opacity-30" />
                                <h2 className="mt-6 text-xl font-medium">Belum Ada Proposal</h2>
                                <p className="mt-2 max-w-md text-muted-foreground">
                                    Belum ada proposal yang diterima untuk lowongan Anda. Coba buat lowongan baru atau tunggu pelamar mengirimkan
                                    proposal mereka.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            {proposals.data.map((proposal) => (
                                <Card
                                    key={proposal.id}
                                    className="py-0 shadow-lg shadow-blue-900/5 dark:bg-neutral-900/50"
                                    onClick={() => router.visit(route('business.proposals.show', { proposal: proposal.id }))}
                                >
                                    <CardContent className="p-6">
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div className="space-y-2">
                                                <h2 className="text-lg font-medium">{proposal.listing?.title}</h2>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <span>Pelamar:</span>
                                                        <span className="font-medium">{proposal.worker_profile?.user.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <StarIcon className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                                        <span>
                                                            {proposal.worker_profile?.average_rating.toFixed(1)} (
                                                            {proposal.worker_profile?.completed_projects_count} proyek)
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <span>Dikirim:</span>
                                                        <span>{format(new Date(proposal.created_at), 'dd MMM yyyy')}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Badge
                                                    className={cn(
                                                        'px-3 py-1',
                                                        proposal.status === 'SENT' && 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
                                                        proposal.status === 'VIEWED' && 'bg-blue-100 text-blue-800 hover:bg-blue-100',
                                                        proposal.status === 'ACCEPTED' && 'bg-green-100 text-green-800 hover:bg-green-100',
                                                        proposal.status === 'REJECTED' && 'bg-red-100 text-red-800 hover:bg-red-100',
                                                    )}
                                                >
                                                    <div className="flex items-center gap-1">
                                                        {proposal.status === 'SENT' && <SendIcon className="h-3 w-3" />}
                                                        {proposal.status === 'VIEWED' && <EyeIcon className="h-3 w-3" />}
                                                        {proposal.status === 'ACCEPTED' && <CheckCircleIcon className="h-3 w-3" />}
                                                        {proposal.status === 'REJECTED' && <XCircleIcon className="h-3 w-3" />}
                                                        <span>
                                                            {proposal.status === 'SENT' && 'Terkirim'}
                                                            {proposal.status === 'VIEWED' && 'Dilihat'}
                                                            {proposal.status === 'ACCEPTED' && 'Diterima'}
                                                            {proposal.status === 'REJECTED' && 'Ditolak'}
                                                        </span>
                                                    </div>
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
                                                                router.visit(route('business.proposals.show', { proposal: proposal.id }));
                                                            }}
                                                        >
                                                            Lihat Detail
                                                        </DropdownMenuItem>
                                                        {proposal.status !== 'ACCEPTED' && proposal.status !== 'REJECTED' && (
                                                            <DropdownMenuItem
                                                                className="text-green-600"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    if (confirm('Apakah Anda yakin ingin menerima proposal ini?')) {
                                                                        router.patch(
                                                                            route('business.proposals.update-status', { proposal: proposal.id }),
                                                                            { status: 'ACCEPTED' },
                                                                            {
                                                                                preserveScroll: true,
                                                                            },
                                                                        );
                                                                    }
                                                                }}
                                                            >
                                                                Terima Proposal
                                                            </DropdownMenuItem>
                                                        )}
                                                        {proposal.status !== 'REJECTED' && proposal.status !== 'ACCEPTED' && (
                                                            <DropdownMenuItem
                                                                className="text-red-600"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    if (confirm('Apakah Anda yakin ingin menolak proposal ini?')) {
                                                                        router.patch(
                                                                            route('business.proposals.update-status', { proposal: proposal.id }),
                                                                            { status: 'REJECTED' },
                                                                            {
                                                                                preserveScroll: true,
                                                                            },
                                                                        );
                                                                    }
                                                                }}
                                                            >
                                                                Tolak Proposal
                                                            </DropdownMenuItem>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {proposal.worker_profile?.skills.map((skill) => (
                                                <Badge key={skill.id} variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                                    {skill.name}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="mt-4 rounded-lg border p-4">
                                            <h3 className="mb-2 text-sm font-medium">Surat Lamaran</h3>
                                            <div className="line-clamp-3 text-sm text-muted-foreground">{proposal.cover_letter}</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {proposals.last_page > 1 && (
                                <div className="mt-6 flex justify-center">
                                    <Pagination currentPage={proposals.current_page} lastPage={proposals.last_page} links={proposals.links} />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
