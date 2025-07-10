import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import {
    ArrowLeftIcon,
    BriefcaseIcon,
    BuildingIcon,
    CheckCircleIcon,
    ClipboardIcon,
    EyeIcon,
    MapPinIcon,
    SendIcon,
    StarIcon,
    UserIcon,
    XCircleIcon,
} from 'lucide-react';

import { cn, formatIDR } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import type { Listing, Proposal } from '@/types';

interface BusinessProposalShowProps {
    proposal: Proposal & {
        listing: Listing;
        worker_profile: {
            id: number;
            user: {
                id: number;
                name: string;
                email: string;
                avatar?: string;
            };
            headline: string;
            bio: string | null;
            location: string | null;
            average_rating: number;
            completed_projects_count: number;
            skills: { id: number; name: string }[];
            portfolio_items: {
                id: number;
                title: string;
                description: string;
                image_url?: string;
                project_link?: string;
            }[];
        };
    };
    otherProposals: (Proposal & { listing: Listing })[];
}

export default function BusinessProposalShow({ proposal, otherProposals }: BusinessProposalShowProps) {
    const handleUpdateStatus = (status: 'VIEWED' | 'ACCEPTED' | 'REJECTED') => {
        if (
            status === 'ACCEPTED' &&
            !confirm('Apakah Anda yakin ingin menerima proposal ini? Semua proposal lain untuk lowongan ini akan ditolak.')
        ) {
            return;
        }

        if (status === 'REJECTED' && !confirm('Apakah Anda yakin ingin menolak proposal ini?')) {
            return;
        }

        router.patch(
            route('business.proposals.update-status', { proposal: proposal.id }),
            { status },
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <AppLayout>
            <Head title={`Proposal dari ${proposal.worker_profile.user.name}`} />

            <div className="container mx-auto px-6 py-8 pt-24">
                <Button variant="link" className={cn('mb-6 gap-2 !pl-0')} onClick={() => window.history.back()}>
                    <ArrowLeftIcon className="h-4 w-4" />
                    Kembali
                </Button>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Proposal Status */}
                        <Card className="shadow-lg shadow-blue-900/5 dark:bg-neutral-900/50">
                            <CardContent>
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div>
                                        <h1 className="text-2xl font-bold">Proposal untuk "{proposal.listing.title}"</h1>
                                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <BuildingIcon className="h-4 w-4" />
                                                <span>{proposal.listing.business_profile.company_name}</span>
                                            </div>
                                            {proposal.listing.business_profile.location && (
                                                <div className="flex items-center gap-1">
                                                    <MapPinIcon className="h-4 w-4" />
                                                    <span>{proposal.listing.business_profile.location}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1">
                                                <ClipboardIcon className="h-4 w-4" />
                                                <span>Dikirim {format(proposal.created_at, 'dd MMM yyyy')}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Badge
                                        className={cn(
                                            'px-3 py-1',
                                            proposal.status === 'SENT' && 'bg-yellow-100 text-yellow-800',
                                            proposal.status === 'VIEWED' && 'bg-blue-100 text-blue-800',
                                            proposal.status === 'ACCEPTED' && 'bg-green-100 text-green-800',
                                            proposal.status === 'REJECTED' && 'bg-red-100 text-red-800',
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

                                {/* Action Buttons */}
                                {proposal.status !== 'ACCEPTED' && proposal.status !== 'REJECTED' && (
                                    <div className="mt-6 flex flex-wrap gap-3">
                                        <Button className="gap-2 bg-green-600 hover:bg-green-700" onClick={() => handleUpdateStatus('ACCEPTED')}>
                                            <CheckCircleIcon className="h-4 w-4" />
                                            Terima Proposal
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="gap-2 border-red-200 text-red-600 hover:bg-red-50"
                                            onClick={() => handleUpdateStatus('REJECTED')}
                                        >
                                            <XCircleIcon className="h-4 w-4" />
                                            Tolak Proposal
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Proposal Content */}
                        <Card className="shadow-lg shadow-blue-900/5 dark:bg-neutral-900/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ClipboardIcon className="h-5 w-5 text-blue-500" />
                                    Surat Lamaran
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-neutral dark:prose-invert max-w-none">{proposal.cover_letter}</div>
                            </CardContent>
                        </Card>

                        {/* Portfolio Items */}
                        {proposal.worker_profile.portfolio_items.length > 0 && (
                            <Card className="shadow-lg shadow-blue-900/5 dark:bg-neutral-900/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BriefcaseIcon className="h-5 w-5 text-blue-500" />
                                        Portfolio
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        {proposal.worker_profile.portfolio_items.map((item) => (
                                            <Card key={item.id} className="overflow-hidden">
                                                {item.image_url && (
                                                    <div className="aspect-video w-full overflow-hidden">
                                                        <img src={item.image_url} alt={item.title} className="h-full w-full object-cover" />
                                                    </div>
                                                )}
                                                <CardContent className="p-4">
                                                    <h3 className="font-medium">{item.title}</h3>
                                                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{item.description}</p>
                                                    {item.project_link && (
                                                        <Button variant="link" className="mt-2 h-auto p-0 text-blue-600" asChild>
                                                            <a href={item.project_link} target="_blank" rel="noopener noreferrer">
                                                                Lihat Proyek
                                                            </a>
                                                        </Button>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Other Proposals from this Worker */}
                        {otherProposals.length > 0 && (
                            <Card className="py-0 shadow-lg shadow-blue-900/5 dark:bg-neutral-900/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <ClipboardIcon className="h-5 w-5 text-blue-500" />
                                        Proposal Lain dari Pelamar Ini
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {otherProposals.map((otherProposal) => (
                                            <div
                                                key={otherProposal.id}
                                                className="flex items-center justify-between rounded-lg border p-4"
                                                onClick={() => router.visit(route('business.proposals.show', { proposal: otherProposal.id }))}
                                            >
                                                <div>
                                                    <h3 className="font-medium">{otherProposal.listing.title}</h3>
                                                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                                        <span>Dikirim {format(otherProposal.created_at, 'dd MMM yyyy')}</span>
                                                    </div>
                                                </div>
                                                <Badge
                                                    className={cn(
                                                        'px-3 py-1',
                                                        otherProposal.status === 'SENT' && 'bg-yellow-100 text-yellow-800',
                                                        otherProposal.status === 'VIEWED' && 'bg-blue-100 text-blue-800',
                                                        otherProposal.status === 'ACCEPTED' && 'bg-green-100 text-green-800',
                                                        otherProposal.status === 'REJECTED' && 'bg-red-100 text-red-800',
                                                    )}
                                                >
                                                    {otherProposal.status === 'SENT' && 'Terkirim'}
                                                    {otherProposal.status === 'VIEWED' && 'Dilihat'}
                                                    {otherProposal.status === 'ACCEPTED' && 'Diterima'}
                                                    {otherProposal.status === 'REJECTED' && 'Ditolak'}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar - Worker Profile */}
                    <div className="space-y-6">
                        <Card className="shadow-lg shadow-blue-900/5 dark:bg-neutral-900/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <UserIcon className="h-5 w-5 text-blue-500" />
                                    Profil Pelamar
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16">
                                        {proposal.worker_profile.user.avatar ? <AvatarImage src={proposal.worker_profile.user.avatar} /> : null}
                                        <AvatarFallback>
                                            {proposal.worker_profile.user.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-lg font-medium">{proposal.worker_profile.user.name}</h3>
                                        <p className="text-sm text-muted-foreground">{proposal.worker_profile.headline}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <StarIcon className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                                    <span className="font-medium">{proposal.worker_profile.average_rating.toFixed(1)}</span>
                                    <span className="text-muted-foreground">({proposal.worker_profile.completed_projects_count} proyek selesai)</span>
                                </div>

                                {proposal.worker_profile.location && (
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPinIcon className="h-4 w-4" />
                                        <span>{proposal.worker_profile.location}</span>
                                    </div>
                                )}

                                <Separator />

                                <div>
                                    <h4 className="mb-2 text-sm font-medium">Keahlian</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {proposal.worker_profile.skills.map((skill) => (
                                            <Badge key={skill.id} variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                                {skill.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {proposal.worker_profile.bio && (
                                    <>
                                        <Separator />
                                        <div>
                                            <h4 className="mb-2 text-sm font-medium">Bio</h4>
                                            <p className="text-sm text-muted-foreground">{proposal.worker_profile.bio}</p>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* Job Details */}
                        <Card className="shadow-lg shadow-blue-900/5 dark:bg-neutral-900/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BriefcaseIcon className="h-5 w-5 text-blue-500" />
                                    Detail Lowongan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="font-medium">{proposal.listing.title}</h3>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className={
                                                proposal.listing.listing_type === 'PROJECT'
                                                    ? 'border-orange-200 bg-orange-100 text-orange-700'
                                                    : 'border-purple-200 bg-purple-100 text-purple-700'
                                            }
                                        >
                                            {proposal.listing.listing_type === 'PROJECT' ? 'Proyek' : 'Per Jam'}
                                        </Badge>
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                proposal.listing.status === 'OPEN' && 'border-blue-200 bg-blue-100 text-blue-700',
                                                proposal.listing.status === 'IN_PROGRESS' && 'border-purple-200 bg-purple-100 text-purple-700',
                                                proposal.listing.status === 'COMPLETED' && 'border-green-200 bg-green-100 text-green-700',
                                                proposal.listing.status === 'CANCELLED' && 'border-red-200 bg-red-100 text-red-700',
                                            )}
                                        >
                                            {proposal.listing.status === 'OPEN' && 'Tersedia'}
                                            {proposal.listing.status === 'IN_PROGRESS' && 'Sedang Berjalan'}
                                            {proposal.listing.status === 'COMPLETED' && 'Selesai'}
                                            {proposal.listing.status === 'CANCELLED' && 'Dibatalkan'}
                                        </Badge>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">Budget</h4>
                                    <div className="mt-1 font-medium">
                                        {proposal.listing.listing_type === 'PROJECT' ? (
                                            <>
                                                {formatIDR(proposal.listing.project_budget_min)} - {formatIDR(proposal.listing.project_budget_max)}
                                            </>
                                        ) : (
                                            <>
                                                {formatIDR(proposal.listing.rate_amount)}/{proposal.listing.rate_type?.toLowerCase()}
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="mb-2 text-sm font-medium text-muted-foreground">Keahlian yang Dibutuhkan</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {proposal.listing.skills.map((skill) => (
                                            <Badge key={skill.id} variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                                {skill.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    className="w-full"
                                    variant="outline"
                                    onClick={() => router.visit(route('business.listings.proposals', { listing: proposal.listing.id }))}
                                >
                                    Lihat Semua Proposal untuk Lowongan Ini
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
