import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeftIcon, BuildingIcon, MapPinIcon } from 'lucide-react';

import { cn, formatIDR } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { Listing, Proposal } from '@/types';

interface ProposalCreateProps {
    listing: Listing;
    existingProposal: Proposal | null;
}

export default function ProposalCreate({ listing, existingProposal }: ProposalCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        cover_letter: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('proposals.store', { listing: listing.id }), {
            onSuccess: () => router.visit(route('worker.proposals')),
        });
    };

    if (existingProposal) {
        return (
            <AppLayout>
                <Head title="Proposal Sudah Dikirim" />
                <div className="container mx-auto px-6 py-8 pt-24">
                    <Button variant="link" className={cn('mb-6 gap-2 !pl-0')} onClick={() => window.history.back()}>
                        <ArrowLeftIcon className="h-4 w-4" />
                        Kembali
                    </Button>

                    <Card className="py-0 shadow-lg shadow-blue-900/5 dark:bg-neutral-900/50">
                        <CardContent className="p-6">
                            <div className="mb-6 text-center">
                                <h1 className="text-2xl font-bold">Anda Sudah Mengirim Proposal</h1>
                                <p className="mt-2 text-muted-foreground">Anda sudah mengirimkan proposal untuk lowongan "{listing.title}"</p>
                            </div>

                            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
                                <h3 className="mb-2 font-medium">Status Proposal</h3>
                                <Badge
                                    className={cn(
                                        existingProposal.status === 'SENT' && 'bg-yellow-100 text-yellow-800',
                                        existingProposal.status === 'VIEWED' && 'bg-blue-100 text-blue-800',
                                        existingProposal.status === 'ACCEPTED' && 'bg-green-100 text-green-800',
                                        existingProposal.status === 'REJECTED' && 'bg-red-100 text-red-800',
                                    )}
                                >
                                    {existingProposal.status === 'SENT' && 'Terkirim'}
                                    {existingProposal.status === 'VIEWED' && 'Dilihat'}
                                    {existingProposal.status === 'ACCEPTED' && 'Diterima'}
                                    {existingProposal.status === 'REJECTED' && 'Ditolak'}
                                </Badge>
                            </div>

                            <Separator className="my-6" />

                            <div className="space-y-4">
                                <h3 className="font-medium">Surat Lamaran Anda</h3>
                                <div className="rounded-lg border p-4">{existingProposal.cover_letter}</div>
                            </div>

                            <div className="mt-6 flex justify-between">
                                <Button variant="outline" onClick={() => window.history.back()}>
                                    Kembali
                                </Button>
                                <Button onClick={() => router.visit(route('worker.proposals'))}>Lihat Semua Proposal Saya</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title="Kirim Proposal" />

            <div className="container mx-auto px-6 py-8 pt-24">
                <Button variant="link" className={cn('mb-6 gap-2 !pl-0')} onClick={() => window.history.back()}>
                    <ArrowLeftIcon className="h-4 w-4" />
                    Kembali
                </Button>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content - Proposal Form */}
                    <div className="lg:col-span-2">
                        <Card className="py-0 shadow-lg shadow-blue-900/5 dark:bg-neutral-900/50">
                            <CardContent className="p-6">
                                <h1 className="mb-6 text-2xl font-bold">Kirim Proposal</h1>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="cover_letter" className="text-sm font-medium">
                                            Surat Lamaran
                                        </label>
                                        <Textarea
                                            id="cover_letter"
                                            placeholder="Perkenalkan diri Anda dan jelaskan mengapa Anda cocok untuk pekerjaan ini..."
                                            className="min-h-[300px]"
                                            value={data.cover_letter}
                                            onChange={(e) => setData('cover_letter', e.target.value)}
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            Jelaskan pengalaman dan kualifikasi Anda yang relevan dengan pekerjaan ini. Minimal 50 karakter.
                                        </p>
                                        {errors.cover_letter && <p className="mt-1 text-sm font-medium text-red-500">{errors.cover_letter}</p>}
                                    </div>

                                    <div className="flex justify-end">
                                        <Button type="submit" className="gap-2" disabled={processing}>
                                            {processing ? 'Mengirim...' : 'Kirim Proposal'}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar - Job Summary */}
                    <div>
                        <Card className="py-0 shadow-lg shadow-blue-900/5 dark:bg-neutral-900/50">
                            <CardContent className="p-6">
                                <h2 className="mb-4 text-lg font-semibold">Ringkasan Lowongan</h2>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-medium">{listing.title}</h3>
                                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                            <BuildingIcon className="h-4 w-4" />
                                            <span>{listing.business_profile.company_name}</span>
                                        </div>
                                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                            <MapPinIcon className="h-4 w-4" />
                                            <span>{listing.business_profile.location}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground">Budget</h4>
                                        <div className="mt-1 font-medium">
                                            {listing.listing_type === 'PROJECT' ? (
                                                <>
                                                    {formatIDR(listing.project_budget_min)} - {formatIDR(listing.project_budget_max)}
                                                </>
                                            ) : (
                                                <>
                                                    {formatIDR(listing.rate_amount)}/{listing.rate_type?.toLowerCase()}
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="mb-2 text-sm font-medium text-muted-foreground">Keahlian yang Dibutuhkan</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {listing.skills.map((skill) => (
                                                <Badge key={skill.id} variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                                    {skill.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
