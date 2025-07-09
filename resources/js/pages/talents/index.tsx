import { Head, router } from '@inertiajs/react';
import { MapPinIcon, SearchIcon, SlidersHorizontalIcon, StarIcon, XIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { PaginationData, Skill, WorkerProfileWithRelations } from '@/types';

interface TalentsPageProps {
    talents: PaginationData<WorkerProfileWithRelations>;
    skills: Skill[];
    filters: {
        search: string | null;
        skills: string | null;
        min_rating: number | null;
        sort: 'rating' | 'experience' | 'newest' | null;
    };
}

export default function TalentsPage({ talents, skills, filters }: TalentsPageProps) {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState<number[]>(filters.skills?.split(',').map(parseInt) ?? []);

    const updateFilters = useCallback(
        (newFilters: Partial<TalentsPageProps['filters']>) => {
            router.get(
                route('talents.index'),
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
        updateFilters({ skills: null, min_rating: null, sort: null });
    }, [updateFilters]);

    useEffect(() => {
        if (selectedSkills.length > 0) {
            updateFilters({ skills: selectedSkills.join(',') });
        } else if (filters.skills) {
            updateFilters({ skills: null });
        }
    }, [selectedSkills, filters, updateFilters]);

    const hasFilters = useMemo(() => filters.min_rating !== null || selectedSkills.length > 0, [filters, selectedSkills]);

    return (
        <AppLayout>
            <Head title="Cari Talenta" />

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
                        <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">Temukan Talenta Terbaik</h1>
                        <p className="mt-6 text-lg leading-8 text-blue-100">
                            Jelajahi berbagai talenta lokal terverifikasi untuk membantu bisnis Anda berkembang. Temukan profesional dengan keahlian
                            yang tepat.
                        </p>

                        {/* Quick Stats */}
                        <div className="mt-10 grid grid-cols-3 gap-4">
                            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                                <div className="text-3xl font-bold text-white">{talents.total}</div>
                                <p className="mt-1 text-sm text-blue-100">Total Talenta</p>
                            </div>
                            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                                <div className="text-3xl font-bold text-white">
                                    {talents.data.filter((talent) => talent.skills.length > 0).length}
                                </div>
                                <p className="mt-1 text-sm text-blue-100">Dengan Keahlian</p>
                            </div>
                            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                                <div className="text-3xl font-bold text-white">
                                    {talents.data.filter((talent) => talent.completed_projects_count > 0).length}
                                </div>
                                <p className="mt-1 text-sm text-blue-100">Berpengalaman</p>
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
                            placeholder="Cari talenta berdasarkan nama, lokasi, atau keahlian..."
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
                                Filter Talenta
                                <Badge variant="secondary" className="ml-2 font-normal">
                                    {[filters.min_rating ? 1 : 0, selectedSkills.length > 0 ? selectedSkills.length : 0]
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
                            defaultValue={filters.sort ?? 'rating'}
                            onValueChange={(value) => updateFilters({ sort: value as TalentsPageProps['filters']['sort'] })}
                        >
                            <SelectTrigger className="w-[180px] rounded-full border-blue-600 bg-background text-blue-600 hover:bg-blue-50">
                                <SelectValue placeholder="Urutkan berdasarkan" />
                            </SelectTrigger>
                            <SelectContent className="border-blue-600 bg-background">
                                <SelectGroup>
                                    <SelectLabel>Urutkan berdasarkan</SelectLabel>
                                    <SelectItem value="rating" className="text-blue-600 hover:bg-blue-50">
                                        Rating Tertinggi
                                    </SelectItem>
                                    <SelectItem value="experience" className="text-blue-600 hover:bg-blue-50">
                                        Pengalaman
                                    </SelectItem>
                                    <SelectItem value="newest" className="text-blue-600 hover:bg-blue-50">
                                        Terbaru
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
                            {/* Rating Filter */}
                            <div className="space-y-4">
                                <h4 className="font-medium">Rating Minimum</h4>
                                <Select
                                    defaultValue={filters.min_rating?.toString() ?? ''}
                                    onValueChange={(value) => updateFilters({ min_rating: value ? parseFloat(value) : null })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih rating minimum" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {/* <SelectItem value="">Semua Rating</SelectItem> */}
                                            <SelectItem value="3">3+ Bintang</SelectItem>
                                            <SelectItem value="4">4+ Bintang</SelectItem>
                                            <SelectItem value="4.5">4.5+ Bintang</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Skills Filter */}
                            <div className="col-span-full space-y-4">
                                <h4 className="font-medium">Keahlian</h4>
                                <div className="max-h-[200px] space-y-2 overflow-y-auto rounded-md border bg-background p-2">
                                    {skills.map((skill) => (
                                        <Label
                                            key={skill.id}
                                            className={cn(
                                                'flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 transition-colors',
                                                selectedSkills.includes(skill.id)
                                                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                                                    : 'border-transparent bg-muted/50 hover:bg-muted',
                                            )}
                                        >
                                            <Checkbox
                                                id={`skill-${skill.id}`}
                                                checked={selectedSkills.includes(skill.id)}
                                                onCheckedChange={() => {
                                                    if (selectedSkills.includes(skill.id)) {
                                                        setSelectedSkills(selectedSkills.filter((id) => id !== skill.id));
                                                    } else {
                                                        setSelectedSkills([...selectedSkills, skill.id]);
                                                    }
                                                }}
                                                className={cn(
                                                    'size-4 rounded-full border-none transition-colors',
                                                    selectedSkills.includes(skill.id)
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-background data-[state=checked]:bg-blue-600 data-[state=checked]:text-white',
                                                )}
                                            />
                                            <span className="text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                {skill.name}
                                            </span>
                                        </Label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Talent Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {talents.data.map((talent) => (
                        <Card
                            key={talent.id}
                            className="group relative overflow-hidden transition-all hover:cursor-pointer hover:shadow-lg hover:ring-1 hover:ring-blue-600 dark:hover:ring-blue-900"
                            onClick={() => router.get(route('talents.show', { talent: talent.id }))}
                        >
                            <CardHeader className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <Avatar className="size-12 shrink-0">
                                        <AvatarImage src={talent.profile_picture_url ?? undefined} alt={talent.user.name} />
                                        <AvatarFallback />
                                    </Avatar>
                                    <div>
                                        <CardTitle className="line-clamp-1 text-lg group-hover:text-blue-600">{talent.user.name}</CardTitle>
                                        {talent.location && (
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <MapPinIcon className="size-4" />
                                                <span>{talent.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {talent.bio && <p className="line-clamp-2 text-sm text-muted-foreground">{talent.bio}</p>}

                                <div className="flex flex-wrap gap-1.5">
                                    {talent.skills.slice(0, 3).map((skill) => (
                                        <Badge key={skill.id} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                                            {skill.name}
                                        </Badge>
                                    ))}
                                    {talent.skills.length > 3 && (
                                        <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                                            +{talent.skills.length - 3}
                                        </Badge>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-1 items-end justify-between">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            className={cn(
                                                'h-4 w-4',
                                                i < Math.floor(talent.average_rating)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'fill-gray-200 text-gray-200',
                                            )}
                                        />
                                    ))}
                                    <span className="ml-2 text-sm font-medium">{talent.average_rating.toFixed(1)}</span>
                                </div>
                                <div className="text-sm text-muted-foreground">{talent.completed_projects_count} proyek selesai</div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Pagination */}
                {talents.last_page > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-2">
                        {talents.links.map((link, i) => (
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
