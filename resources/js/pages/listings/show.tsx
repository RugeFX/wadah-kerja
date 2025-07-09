import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { ArrowLeftIcon, BriefcaseIcon, BuildingIcon, CalendarIcon, ClockIcon, MapPinIcon, SendIcon, StarIcon } from 'lucide-react';

import { cn, formatIDR } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import type { Listing } from '@/types';

interface ListingDetailProps {
    listing: Listing;
    similarListings: Listing[];
}

export default function ListingDetail({ listing, similarListings }: ListingDetailProps) {
    return (
        <AppLayout>
            <Head title={listing.title} />

            {/* Header Section - Full Bleed */}
            <div className="relative w-full bg-gradient-to-b from-blue-900 to-blue-700 pt-24 shadow-xl shadow-blue-900/10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#ffffff20_100%)] dark:bg-[linear-gradient(to_right,transparent_0%,#ffffff10_100%)]" />
                <div className="relative container mx-auto px-6 py-8">
                    {/* Back Button */}
                    <Button variant="link" className={cn('mb-6 gap-2 !pl-0 text-blue-200 hover:text-white')} onClick={() => window.history.back()}>
                        <ArrowLeftIcon className="h-4 w-4" />
                        Kembali
                    </Button>

                    {/* Job Title & Company */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-white">{listing.title}</h1>
                        <div className="mt-4 flex flex-wrap items-center gap-4 text-blue-100">
                            <div className="flex items-center gap-2">
                                <BuildingIcon className="h-4 w-4" />
                                <span className="font-medium">{listing.business_profile.company_name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPinIcon className="h-4 w-4" />
                                <span>{listing.business_profile.location}</span>
                            </div>
                            <Badge
                                variant="outline"
                                className={
                                    listing.listing_type === 'PROJECT'
                                        ? 'border-orange-200 bg-orange-100/20 text-orange-100 hover:bg-orange-100/30'
                                        : 'border-blue-200 bg-blue-100/20 text-blue-100 hover:bg-blue-100/30'
                                }
                            >
                                {listing.listing_type === 'PROJECT' ? 'Proyek' : 'Per Jam'}
                            </Badge>
                        </div>
                    </div>

                    {/* Quick Budget Info */}
                    <div className="w-fit rounded-xl bg-white/10 p-4 backdrop-blur">
                        <h3 className="text-sm text-blue-100">Budget</h3>
                        <div className="mt-2 text-2xl font-bold text-white">
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
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card className="bg-white/50 py-0 shadow-lg shadow-blue-900/5 backdrop-blur-sm dark:bg-neutral-900/50">
                            <CardContent className="space-y-6 p-6">
                                {/* Skills Required */}
                                <div>
                                    <h3 className="mb-3 flex items-center gap-2 text-lg font-medium">
                                        <StarIcon className="h-5 w-5 text-yellow-500" />
                                        Keahlian yang Dibutuhkan
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {listing.skills.map((skill) => (
                                            <Badge key={skill.id} variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                                {skill.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                {/* Timeline for TIME_BASED */}
                                {listing.listing_type === 'TIME_BASED' && (
                                    <>
                                        <div>
                                            <h3 className="mb-3 flex items-center gap-2 text-lg font-medium">
                                                <CalendarIcon className="h-5 w-5 text-blue-500" />
                                                Periode Kerja
                                            </h3>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                                    <span>{format(new Date(listing.start_datetime), 'dd MMM yyyy')}</span>
                                                </div>
                                                <span>-</span>
                                                <div className="flex items-center gap-2">
                                                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                                                    <span>{format(new Date(listing.end_datetime), 'dd MMM yyyy')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Separator />
                                    </>
                                )}

                                {/* Job Description */}
                                <div>
                                    <h3 className="mb-3 flex items-center gap-2 text-lg font-medium">
                                        <BriefcaseIcon className="h-5 w-5 text-blue-500" />
                                        Deskripsi Pekerjaan
                                    </h3>
                                    <div className="prose prose-neutral dark:prose-invert max-w-none">{listing.description}</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Apply Button */}
                        <Card className="bg-white/50 shadow-lg shadow-blue-900/5 backdrop-blur-sm dark:bg-neutral-900/50">
                            <CardContent>
                                <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700" size="lg">
                                    <SendIcon className="h-4 w-4" />
                                    Kirim Lamaran
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Company Info */}
                        <Card className="bg-white/50 shadow-lg shadow-blue-900/5 backdrop-blur-sm dark:bg-neutral-900/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <BuildingIcon className="h-5 w-5 text-blue-500" />
                                    Tentang Perusahaan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                                        <BuildingIcon className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <div className="font-medium">{listing.business_profile.company_name}</div>
                                        <div className="text-sm text-muted-foreground">{listing.business_profile.location}</div>
                                    </div>
                                </div>
                                <div className="text-sm">{listing.business_profile.description}</div>
                            </CardContent>
                        </Card>

                        {/* Similar Jobs */}
                        {similarListings.length > 0 && (
                            <Card className="bg-white/50 shadow-lg shadow-blue-900/5 backdrop-blur-sm dark:bg-neutral-900/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <BriefcaseIcon className="h-5 w-5 text-blue-500" />
                                        Lowongan Serupa
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {similarListings.map((similarListing) => (
                                        <Card
                                            key={similarListing.id}
                                            className="cursor-pointer py-0 transition-all hover:shadow-md"
                                            onClick={() => router.get(route('listings.show', { listing: similarListing.id }))}
                                        >
                                            <CardContent className="space-y-3 p-4">
                                                <div>
                                                    <div className="line-clamp-1 font-medium">{similarListing.title}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {similarListing.business_profile.company_name}
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {similarListing.skills.slice(0, 3).map((skill) => (
                                                        <Badge
                                                            key={skill.id}
                                                            variant="secondary"
                                                            className="bg-blue-100 text-blue-700 hover:bg-blue-100"
                                                        >
                                                            {skill.name}
                                                        </Badge>
                                                    ))}
                                                    {similarListing.skills.length > 3 && (
                                                        <Badge variant="outline" className="border-blue-200">
                                                            +{similarListing.skills.length - 3}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex items-baseline gap-1 font-medium">
                                                    {similarListing.listing_type === 'PROJECT' ? (
                                                        <>
                                                            <span className="text-foreground">{formatIDR(similarListing.project_budget_min)}</span>
                                                            <span className="text-sm text-muted-foreground">
                                                                - {formatIDR(similarListing.project_budget_max)}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="text-foreground">{formatIDR(similarListing.rate_amount)}</span>
                                                            <span className="text-sm text-muted-foreground">
                                                                /{similarListing.rate_type?.toLowerCase()}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
