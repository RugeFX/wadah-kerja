import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, DollarSignIcon, EditIcon, PenIcon } from 'lucide-react';

import { cn, formatIDR } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import type { Listing } from '@/types';

interface BusinessListingShowProps {
    listing: Listing;
}

export default function BusinessListingShow({ listing }: BusinessListingShowProps) {
    const updateStatus = (status: string) => {
        if (status === 'CANCELLED' && !confirm('Apakah Anda yakin ingin membatalkan lowongan ini?')) {
            return;
        }

        if (status === 'COMPLETED' && !confirm('Apakah Anda yakin ingin menandai lowongan ini sebagai selesai?')) {
            return;
        }

        router.patch(
            route('business.listings.update-status', { listing: listing.id }),
            { status },
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <AppLayout>
            <Head title={listing.title} />

            <div className="container mx-auto px-6 py-8 pt-24">
                <Button variant="link" className={cn('mb-6 gap-2 !pl-0')} onClick={() => router.visit(route('business.listings.index'))}>
                    <ArrowLeftIcon className="h-4 w-4" />
                    Kembali ke Daftar Lowongan
                </Button>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card className="shadow-md">
                            <CardContent>
                                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                                    <h1 className="text-2xl font-bold">{listing.title}</h1>

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
                                                listing.status === 'COMPLETED' && 'border-green-200 bg-green-100 text-green-700 hover:bg-green-100',
                                                listing.status === 'CANCELLED' && 'border-red-200 bg-red-100 text-red-700 hover:bg-red-100',
                                            )}
                                        >
                                            {listing.status === 'OPEN' && 'Tersedia'}
                                            {listing.status === 'IN_PROGRESS' && 'Sedang Berjalan'}
                                            {listing.status === 'COMPLETED' && 'Selesai'}
                                            {listing.status === 'CANCELLED' && 'Dibatalkan'}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <CalendarIcon className="h-4 w-4" />
                                        <span>Dibuat: {format(new Date(listing.created_at), 'dd MMM yyyy')}</span>
                                    </div>

                                    {listing.listing_type === 'TIME_BASED' && (
                                        <>
                                            <div className="flex items-center gap-1">
                                                <ClockIcon className="h-4 w-4" />
                                                <span>
                                                    Periode: {format(new Date(listing.start_datetime), 'dd MMM yyyy')} -{' '}
                                                    {format(new Date(listing.end_datetime), 'dd MMM yyyy')}
                                                </span>
                                            </div>
                                        </>
                                    )}

                                    <div className="flex items-center gap-1">
                                        <DollarSignIcon className="h-4 w-4" />
                                        <span>
                                            {listing.listing_type === 'PROJECT' ? (
                                                <>
                                                    Budget: {formatIDR(listing.project_budget_min)} - {formatIDR(listing.project_budget_max)}
                                                </>
                                            ) : (
                                                <>
                                                    Rate: {formatIDR(listing.rate_amount)}/{listing.rate_type?.toLowerCase()}
                                                </>
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-4 flex flex-wrap gap-2">
                                    {listing.skills.map((skill) => (
                                        <Badge key={skill.id} variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                            {skill.name}
                                        </Badge>
                                    ))}
                                </div>

                                <Separator className="my-4" />

                                <div className="prose dark:prose-invert max-w-none">
                                    <div dangerouslySetInnerHTML={{ __html: listing.description.replace(/\n/g, '<br />') }} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <PenIcon className="h-5 w-5 text-blue-500" />
                                    Proposal ({listing.proposals?.length || 0})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {listing.proposals && listing.proposals.length > 0 ? (
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">
                                            Anda telah menerima {listing.proposals.length} proposal untuk lowongan ini.
                                        </p>
                                        <Button onClick={() => router.visit(route('business.listings.proposals', { listing: listing.id }))}>
                                            Lihat Semua Proposal
                                        </Button>
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">Belum ada proposal untuk lowongan ini.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card className="shadow-md">
                            <CardContent>
                                <h2 className="mb-4 text-lg font-semibold">Aksi</h2>

                                <div className="space-y-4">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start gap-2"
                                        onClick={() => router.visit(route('business.listings.edit', { listing: listing.id }))}
                                    >
                                        <EditIcon className="h-4 w-4" />
                                        Edit Lowongan
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="w-full justify-start gap-2"
                                        onClick={() => router.visit(route('business.listings.proposals', { listing: listing.id }))}
                                    >
                                        <PenIcon className="h-4 w-4" />
                                        Lihat Proposal ({listing.proposals?.length || 0})
                                    </Button>

                                    <Separator />

                                    {listing.status === 'OPEN' && (
                                        <Button variant="destructive" className="w-full" onClick={() => updateStatus('CANCELLED')}>
                                            Batalkan Lowongan
                                        </Button>
                                    )}

                                    {listing.status === 'IN_PROGRESS' && (
                                        <Button
                                            variant="default"
                                            className="w-full bg-green-600 hover:bg-green-700"
                                            onClick={() => updateStatus('COMPLETED')}
                                        >
                                            Tandai Selesai
                                        </Button>
                                    )}

                                    {(listing.status === 'COMPLETED' || listing.status === 'CANCELLED') && (
                                        <Button variant="outline" className="w-full" onClick={() => updateStatus('OPEN')}>
                                            Buka Kembali Lowongan
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
