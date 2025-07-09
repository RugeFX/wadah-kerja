import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import { BriefcaseIcon, BuildingIcon, CheckCircleIcon, ClockIcon, EyeIcon, MapPinIcon, SendIcon, XCircleIcon } from 'lucide-react';

import { cn, formatIDR } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import type { PaginationData, Proposal } from '@/types';

interface ProposalsIndexProps {
    proposals: PaginationData<Proposal>;
}

export default function ProposalsIndex({ proposals }: ProposalsIndexProps) {
    return (
        <AppLayout>
            <Head title="My Proposals" />

            <div className="container mx-auto px-6 py-8 pt-24">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold">Proposal Saya</h1>
                </div>

                <div className="space-y-6">
                    {proposals.data.length === 0 ? (
                        <Card className="py-0 shadow-lg shadow-blue-900/5 dark:bg-neutral-900/50">
                            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                                <SendIcon className="h-16 w-16 text-muted-foreground opacity-30" />
                                <h2 className="mt-6 text-xl font-medium">Belum Ada Proposal</h2>
                                <p className="mt-2 max-w-md text-muted-foreground">
                                    Anda belum mengirimkan proposal untuk pekerjaan apapun. Jelajahi lowongan yang tersedia dan kirim proposal Anda.
                                </p>
                                <Button className="mt-6" onClick={() => (window.location.href = route('listings.index'))}>
                                    Jelajahi Lowongan
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            {proposals.data.map((proposal) => (
                                <Card key={proposal.id} className="py-0 shadow-lg shadow-blue-900/5 dark:bg-neutral-900/50">
                                    <CardContent className="p-6">
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div className="space-y-2">
                                                <h2 className="text-lg font-medium">{proposal.listing?.title}</h2>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <BuildingIcon className="h-4 w-4" />
                                                        <span>{proposal.listing?.business_profile.company_name}</span>
                                                    </div>
                                                    {proposal.listing?.business_profile.location && (
                                                        <div className="flex items-center gap-1">
                                                            <MapPinIcon className="h-4 w-4" />
                                                            <span>{proposal.listing?.business_profile.location}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-1">
                                                        <ClockIcon className="h-4 w-4" />
                                                        <span>Dikirim {format(new Date(proposal.created_at), 'dd MMM yyyy')}</span>
                                                    </div>
                                                </div>
                                            </div>

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
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {proposal.listing?.skills.map((skill) => (
                                                <Badge key={skill.id} variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                                    {skill.name}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="mt-4 rounded-lg border p-4">
                                            <h3 className="mb-2 text-sm font-medium">Surat Lamaran</h3>
                                            <div className="line-clamp-3 text-sm text-muted-foreground">{proposal.cover_letter}</div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div>
                                                <span className="text-sm text-muted-foreground">Budget: </span>
                                                <span className="font-medium">
                                                    {proposal.listing?.listing_type === 'PROJECT' ? (
                                                        <>
                                                            {formatIDR(proposal.listing.project_budget_min)} -{' '}
                                                            {formatIDR(proposal.listing.project_budget_max)}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {formatIDR(proposal.listing?.rate_amount || 0)}/
                                                            {proposal.listing?.rate_type?.toLowerCase()}
                                                        </>
                                                    )}
                                                </span>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="gap-1"
                                                onClick={() => (window.location.href = route('listings.show', { listing: proposal.listing_id }))}
                                            >
                                                <BriefcaseIcon className="h-4 w-4" />
                                                Lihat Lowongan
                                            </Button>
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
