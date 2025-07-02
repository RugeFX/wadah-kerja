import { Head, router } from '@inertiajs/react';
import { MapPinIcon, SearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { cn, formatIDR } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { Listing, PaginationData, Skill } from '@/types';

interface ListingsPageProps {
    listings: PaginationData<Listing>;
    skills: Skill[];
    filters: {
        search: string | null;
        type: 'PROJECT' | 'TIME_BASED' | null;
        skills: string | null;
        min_budget: number | null;
        max_budget: number | null;
        sort: 'latest' | 'budget_high' | 'budget_low' | null;
    };
}

export default function ListingsPage({ listings, skills, filters }: ListingsPageProps) {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState<number[]>(filters.skills?.split(',').map(parseInt) ?? []);

    const updateFilters = useCallback(
        (newFilters: Partial<ListingsPageProps['filters']>) => {
            router.get(
                route('listings.index'),
                { ...filters, ...newFilters },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        },
        [filters],
    );

    const clearFilters = useCallback(() => {
        setSelectedSkills([]);
        updateFilters({ skills: null, type: null, min_budget: null, max_budget: null, sort: null });
    }, [updateFilters]);

    useEffect(() => {
        if (selectedSkills.length > 0) {
            updateFilters({ skills: selectedSkills.join(',') });
        } else if (filters.skills) {
            updateFilters({ skills: null });
        }
    }, [selectedSkills, filters, updateFilters]);

    const hasFilters = useMemo(
        () => filters.type !== null || filters.min_budget !== null || filters.max_budget !== null || selectedSkills.length > 0,
        [filters, selectedSkills],
    );

    return (
        <AppLayout>
            <Head title="Cari Lowongan" />

            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-600 to-blue-800">
                {/* Background Pattern */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-600/90 to-blue-800/90" />
                </div>

                {/* Glow Effects */}
                <div
                    className="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48"
                    aria-hidden="true"
                >
                    <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-blue-500 to-blue-400 opacity-20" />
                </div>
                <div className="absolute top-1/2 -right-20 -z-10 transform-gpu blur-3xl" aria-hidden="true">
                    <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-blue-400 to-purple-400 opacity-20" />
                </div>

                <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                    <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
                        <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">Temukan Pekerjaan Impian Anda</h1>
                        <p className="mt-6 text-lg leading-8 text-blue-100">
                            Jelajahi berbagai peluang kerja dari UMKM di seluruh Indonesia. Mulai perjalanan karir Anda hari ini.
                        </p>

                        {/* Quick Stats */}
                        <div className="mt-10 grid grid-cols-3 gap-4">
                            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                                <div className="text-3xl font-bold text-white">{listings.total}</div>
                                <p className="mt-1 text-sm text-blue-100">Total Lowongan</p>
                            </div>
                            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                                <div className="text-3xl font-bold text-white">
                                    {listings.data.filter((listing) => listing.listing_type === 'PROJECT').length}
                                </div>
                                <p className="mt-1 text-sm text-blue-100">Proyek</p>
                            </div>
                            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                                <div className="text-3xl font-bold text-white">
                                    {listings.data.filter((listing) => listing.listing_type === 'TIME_BASED').length}
                                </div>
                                <p className="mt-1 text-sm text-blue-100">Per Jam</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-12">
                {/* Main Search Bar and Filters Toggle */}
                <div className="space-y-4">
                    <div className="relative w-full">
                        <SearchIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Cari lowongan berdasarkan judul, perusahaan, atau lokasi..."
                            className="h-14 rounded-full border-0 bg-card pr-4 pl-12 text-lg shadow-lg ring-1 ring-blue-600 transition-shadow focus-visible:ring-2 focus-visible:ring-blue-800"
                            defaultValue={filters.search ?? ''}
                            onChange={(e) => updateFilters({ search: e.target.value })}
                        />
                        <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                className="gap-2 border-blue-600 bg-background text-blue-600 hover:bg-blue-50"
                                onClick={() => setIsFilterVisible(!isFilterVisible)}
                            >
                                <SlidersHorizontalIcon className="size-4" />
                                Filter Lowongan
                                <Badge variant="secondary" className="ml-2 font-normal">
                                    {[
                                        filters.type ? 1 : 0,
                                        filters.min_budget || filters.max_budget ? 1 : 0,
                                        selectedSkills.length > 0 ? selectedSkills.length : 0,
                                    ]
                                        .filter(Boolean)
                                        .reduce((acc, curr) => acc + curr, 0)}
                                </Badge>
                            </Button>
                            {hasFilters && (
                                <Button variant="outline" className="gap-2 border-red-400 bg-red-50 text-red-700" onClick={clearFilters}>
                                    <XIcon className="h-4 w-4" />
                                    Hapus Filter
                                </Button>
                            )}
                        </div>

                        <Select
                            defaultValue={filters.sort ?? 'latest'}
                            onValueChange={(value) => updateFilters({ sort: value as ListingsPageProps['filters']['sort'] })}
                        >
                            <SelectTrigger className="w-[180px] rounded-full border-blue-600 bg-background text-blue-600 hover:bg-blue-50">
                                <SelectValue placeholder="Urutkan berdasarkan" />
                            </SelectTrigger>
                            <SelectContent className="border-blue-600 bg-background">
                                <SelectGroup>
                                    <SelectLabel>Urutkan berdasarkan</SelectLabel>
                                    <SelectItem value="latest" className="text-blue-600 hover:bg-blue-50">
                                        Terbaru
                                    </SelectItem>
                                    <SelectItem value="budget_high" className="text-blue-600 hover:bg-blue-50">
                                        Budget Tertinggi
                                    </SelectItem>
                                    <SelectItem value="budget_low" className="text-blue-600 hover:bg-blue-50">
                                        Budget Terendah
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Expandable Filters */}
                    <div
                        className={cn(
                            'overflow-hidden rounded-lg border border-blue-600 bg-card shadow-sm',
                            isFilterVisible ? 'my-4 h-auto opacity-100' : 'hidden h-0 opacity-0',
                        )}
                    >
                        <div className="grid gap-6 p-6 sm:grid-cols-2">
                            {/* Type Filter */}
                            <div className="space-y-4">
                                <h4 className="font-medium">Tipe Pekerjaan</h4>
                                <Select
                                    defaultValue={filters.type ?? ''}
                                    onValueChange={(value) => updateFilters({ type: value as ListingsPageProps['filters']['type'] })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih tipe pekerjaan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="PROJECT">Proyek</SelectItem>
                                            <SelectItem value="TIME_BASED">Per Jam</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Budget Range Filter */}
                            <div className="space-y-4">
                                <h4 className="font-medium">Rentang Budget</h4>
                                <div className="flex items-center gap-4">
                                    <Input
                                        min={0}
                                        type="number"
                                        placeholder="Min"
                                        defaultValue={filters.min_budget ?? undefined}
                                        onChange={(e) => updateFilters({ min_budget: e.target.valueAsNumber ?? null })}
                                    />
                                    <span className="text-muted-foreground">-</span>
                                    <Input
                                        min={0}
                                        type="number"
                                        placeholder="Max"
                                        defaultValue={filters.max_budget ?? undefined}
                                        onChange={(e) => updateFilters({ max_budget: e.target.valueAsNumber ?? null })}
                                    />
                                </div>
                            </div>

                            {/* Skills Filter */}
                            <div className="col-span-full space-y-4">
                                <h4 className="font-medium">Keahlian</h4>
                                <div className="max-h-[200px] space-y-2 overflow-y-auto rounded-md border bg-background p-2">
                                    {skills.map((skill) => (
                                        <div
                                            key={skill.id}
                                            className={cn(
                                                'flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 transition-colors',
                                                selectedSkills.includes(skill.id)
                                                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                                                    : 'border-transparent bg-muted/50 hover:bg-muted',
                                            )}
                                            onClick={() => {
                                                if (selectedSkills.includes(skill.id)) {
                                                    setSelectedSkills(selectedSkills.filter((id) => id !== skill.id));
                                                } else {
                                                    setSelectedSkills([...selectedSkills, skill.id]);
                                                }
                                            }}
                                        >
                                            <Checkbox
                                                id={`skill-${skill.id}`}
                                                checked={selectedSkills.includes(skill.id)}
                                                className={cn(
                                                    'size-4 rounded-full border-none transition-colors',
                                                    selectedSkills.includes(skill.id)
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-background data-[state=checked]:bg-blue-600 data-[state=checked]:text-white',
                                                )}
                                            />
                                            <label
                                                htmlFor={`skill-${skill.id}`}
                                                className="text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {skill.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Listings Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {listings.data.map((listing) => (
                        <Card
                            key={listing.id}
                            className="group relative overflow-hidden transition-all hover:shadow-lg hover:ring-1 hover:ring-blue-600 dark:hover:ring-blue-900"
                            onClick={() => router.get(route('listings.show', { listing: listing.id }))}
                        >
                            <CardHeader className="space-y-2">
                                <div className="space-y-2">
                                    <Badge
                                        variant="outline"
                                        className={
                                            listing.listing_type === 'PROJECT'
                                                ? 'border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-50'
                                                : 'border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-50'
                                        }
                                    >
                                        {listing.listing_type === 'PROJECT' ? 'Proyek' : 'Per Jam'}
                                    </Badge>
                                    <CardTitle className="line-clamp-2 text-lg group-hover:text-blue-600">{listing.title}</CardTitle>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPinIcon className="size-4" />
                                    <span>{listing.business_profile.location}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{listing.business_profile.company_name}</p>
                                </div>

                                <div className="flex flex-wrap gap-1.5">
                                    {listing.skills.slice(0, 3).map((skill) => (
                                        <Badge key={skill.id} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                                            {skill.name}
                                        </Badge>
                                    ))}
                                    {listing.skills.length > 3 && (
                                        <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                                            +{listing.skills.length - 3}
                                        </Badge>
                                    )}
                                </div>

                                <div className="flex items-baseline gap-1 font-medium"></div>
                            </CardContent>
                            <CardFooter className="flex h-full items-end">
                                {listing.listing_type === 'PROJECT' ? (
                                    <span className="text-lg text-foreground">
                                        {formatIDR(listing.project_budget_min)} - {formatIDR(listing.project_budget_max)}
                                    </span>
                                ) : (
                                    <>
                                        <span className="text-lg text-foreground">{formatIDR(listing.rate_amount)}</span>
                                        <span className="text-muted-foreground">/{listing.rate_type?.toLowerCase()}</span>
                                    </>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Pagination */}
                {listings.last_page > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-2">
                        {listings.links.map((link, i) => (
                            <Button
                                key={i}
                                variant={link.active ? 'default' : 'outline'}
                                size={link.label.length > 1 ? 'default' : 'icon'}
                                disabled={!link.url}
                                onClick={() => router.get(link.url ?? '', {}, { preserveScroll: true })}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={cn({
                                    'bg-blue-600 hover:bg-blue-700': link.active,
                                })}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
