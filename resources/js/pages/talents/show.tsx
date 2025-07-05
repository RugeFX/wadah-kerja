import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeftIcon, BriefcaseIcon, MapPinIcon, StarIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import type { Skill, WorkerProfileWithRelations } from '@/types';

interface TalentShowProps {
    talent: WorkerProfileWithRelations;
    similarTalents: WorkerProfileWithRelations[];
}

export default function TalentShow({ talent, similarTalents }: TalentShowProps) {
    const [activeTab, setActiveTab] = useState<string>('profile');

    const renderStars = (rating: number, size: 'sm' | 'md' = 'md') => {
        return (
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <StarIcon
                        key={i}
                        className={cn(
                            size === 'sm' ? 'h-3 w-3' : 'h-5 w-5',
                            i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200',
                        )}
                    />
                ))}
                <span className={cn('ml-2 font-medium', size === 'sm' ? 'text-xs' : 'text-lg')}>{rating.toFixed(1)}</span>
            </div>
        );
    };

    return (
        <AppLayout>
            <Head title={`Profil ${talent.user.name}`} />

            <div className="container mx-auto px-6 pt-24 pb-8">
                <div className="mb-8">
                    <Button variant="ghost" className="mb-4 gap-2 pl-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700" asChild>
                        <Link href={route('talents.index')}>
                            <ArrowLeftIcon className="h-4 w-4" />
                            Kembali ke daftar talenta
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {/* Main Content */}
                    <div className="md:col-span-2">
                        {/* Profile Header */}
                        <div className="mb-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white shadow-lg">
                            <div className="flex items-start gap-6">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
                                    <UserIcon className="h-10 w-10" />
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold">{talent.user.name}</h1>
                                    {talent.location && (
                                        <div className="mt-2 flex items-center gap-2">
                                            <MapPinIcon className="h-5 w-5" />
                                            <span>{talent.location}</span>
                                        </div>
                                    )}
                                    <div className="mt-4 flex items-center gap-4">
                                        <div className="flex items-center gap-2">{renderStars(talent.average_rating)}</div>
                                        <div className="flex items-center gap-2">
                                            <BriefcaseIcon className="h-5 w-5" />
                                            <span>
                                                <strong>{talent.completed_projects_count}</strong> proyek selesai
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tab Selection Status */}
                        <div className="mb-2 text-sm text-blue-600">
                            Menampilkan: <span className="font-medium text-blue-800 capitalize">{activeTab}</span>
                        </div>

                        {/* Tabs */}
                        <Tabs defaultValue="profile" className="mb-8" onValueChange={setActiveTab}>
                            <TabsList className="w-full">
                                <TabsTrigger value="profile" className="flex-1">
                                    Profil
                                </TabsTrigger>
                                <TabsTrigger value="portfolio" className="flex-1">
                                    Portofolio
                                </TabsTrigger>
                                <TabsTrigger value="reviews" className="flex-1">
                                    Ulasan
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="profile" className="mt-6">
                                <div className="space-y-6">
                                    {/* Bio */}
                                    <div>
                                        <h2 className="mb-4 text-xl font-semibold">Tentang Saya</h2>
                                        <div className="rounded-lg border bg-card p-4 shadow-sm">
                                            <p className="text-blue-700">{talent.bio || 'Talenta ini belum menambahkan bio.'}</p>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div>
                                        <h2 className="mb-4 text-xl font-semibold">Keahlian</h2>
                                        <div className="rounded-lg border bg-card p-4 shadow-sm">
                                            <div className="flex flex-wrap gap-2">
                                                {talent.skills.length > 0 ? (
                                                    talent.skills.map((skill: Skill) => (
                                                        <Badge key={skill.id} variant="secondary" className="bg-blue-50 text-blue-700">
                                                            {skill.name}
                                                        </Badge>
                                                    ))
                                                ) : (
                                                    <p className="text-muted-foreground">Talenta ini belum menambahkan keahlian.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="portfolio" className="mt-6">
                                <div className="space-y-6">
                                    <h2 className="mb-4 text-xl font-semibold">Portofolio</h2>
                                    {talent.portfolio_items.length > 0 ? (
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            {talent.portfolio_items.map((item) => (
                                                <Card key={item.id} className="overflow-hidden">
                                                    {item.image_url && (
                                                        <div className="aspect-video w-full overflow-hidden bg-muted">
                                                            <img src={item.image_url} alt={item.title} className="h-full w-full object-cover" />
                                                        </div>
                                                    )}
                                                    <CardHeader>
                                                        <CardTitle>{item.title}</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="rounded-lg border bg-card p-6 text-center shadow-sm">
                                            <p className="text-blue-600">Talenta ini belum menambahkan item portofolio.</p>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                            <TabsContent value="reviews" className="mt-6">
                                <div className="space-y-6">
                                    <h2 className="mb-4 text-xl font-semibold">Ulasan dari Klien</h2>
                                    <div className="rounded-lg border bg-card p-6 text-center shadow-sm">
                                        <p className="text-blue-600">Belum ada ulasan untuk talenta ini.</p>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Contact Card */}
                        <Card className="gap-2 border-blue-100 pt-0 shadow-md">
                            <CardHeader className="border-b bg-blue-50/50 py-6">
                                <CardTitle className="text-center text-blue-800">Tertarik Bekerja Sama?</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <p className="text-center text-blue-700">Hubungi talenta ini untuk mendiskusikan proyek Anda</p>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                                        Kirim Pesan
                                    </Button>
                                    <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50" size="lg">
                                        Tawarkan Proyek
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Similar Talents */}
                        {similarTalents.length > 0 && (
                            <div>
                                <h2 className="mb-4 text-xl font-semibold">Talenta Serupa</h2>
                                <div className="space-y-4">
                                    {similarTalents.map((similarTalent) => (
                                        <Card
                                            key={similarTalent.id}
                                            className="cursor-pointer hover:shadow-md"
                                            onClick={() => router.get(route('talents.show', { talent: similarTalent.id }))}
                                        >
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                        <UserIcon className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium">{similarTalent.user.name}</h3>
                                                        <div className="flex items-center gap-1">
                                                            {renderStars(similarTalent.average_rating, 'sm')}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-2 flex flex-wrap gap-1">
                                                    {similarTalent.skills.slice(0, 2).map((skill) => (
                                                        <Badge key={skill.id} variant="secondary" className="bg-blue-50 text-xs text-blue-700">
                                                            {skill.name}
                                                        </Badge>
                                                    ))}
                                                    {similarTalent.skills.length > 2 && (
                                                        <Badge variant="secondary" className="bg-gray-100 text-xs text-gray-700">
                                                            +{similarTalent.skills.length - 2}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="mt-2 text-xs text-muted-foreground">
                                                    {similarTalent.completed_projects_count} proyek selesai
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
