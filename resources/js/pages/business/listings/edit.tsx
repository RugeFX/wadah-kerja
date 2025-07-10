import { Head, useForm } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react';
import type { MultiValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { Listing, Skill } from '@/types';

interface EditListingProps {
    listing: Listing;
    skills: Skill[];
}

type ListingFormData = {
    title: string;
    description: string;
    listing_type: 'PROJECT' | 'TIME_BASED';
    project_budget_min: string;
    project_budget_max: string;
    rate_type: 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
    rate_amount: string;
    start_datetime: string;
    end_datetime: string;
    skills: number[];
    custom_skills: string[];
};

export default function EditListing({ listing, skills }: EditListingProps) {
    const [selectedTab, setSelectedTab] = useState(listing.listing_type);

    const { data, setData, put, processing, errors } = useForm<ListingFormData>({
        title: listing.title,
        description: listing.description,
        listing_type: listing.listing_type,

        // Project
        project_budget_min: listing.listing_type === 'PROJECT' ? listing.project_budget_min.toString() : '',
        project_budget_max: listing.listing_type === 'PROJECT' ? listing.project_budget_max.toString() : '',

        // Time-based
        rate_type: listing.listing_type === 'TIME_BASED' ? listing.rate_type : 'HOURLY',
        rate_amount: listing.listing_type === 'TIME_BASED' ? listing.rate_amount.toString() : '',
        start_datetime: listing.listing_type === 'TIME_BASED' ? listing.start_datetime : '',
        end_datetime: listing.listing_type === 'TIME_BASED' ? listing.end_datetime : '',

        skills: listing.skills.map((skill) => skill.id),
        custom_skills: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('business.listings.update', { listing: listing.id }));
    };

    const handleTabChange = (value: 'PROJECT' | 'TIME_BASED') => {
        setSelectedTab(value);
        setData('listing_type', value);
    };

    const skillOptions = skills.map((skill) => ({
        value: skill.id,
        label: skill.name,
    }));

    const customOptions = data.custom_skills.map((skill) => ({
        value: skill,
        label: skill,
    }));

    const selectedOptions = [...skillOptions.filter((option) => data.skills.includes(option.value)), ...customOptions];

    const handleSkillChange = (newValue: MultiValue<{ value: string | number; label: string; __isNew__?: boolean }>) => {
        const existingSkills = newValue.filter((v) => !v.__isNew__).map((v) => v.value as number);
        const customSkills = newValue.filter((v) => v.__isNew__).map((v) => v.label as string);

        setData({
            ...data,
            skills: existingSkills,
            custom_skills: customSkills,
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Lowongan" />

            <div className="container mx-auto px-6 py-8 pt-24">
                <Button variant="link" className={cn('mb-6 gap-2 !pl-0')} onClick={() => window.history.back()}>
                    <ArrowLeftIcon className="h-4 w-4" />
                    Kembali
                </Button>

                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Edit Lowongan</h1>
                    <p className="mt-2 text-muted-foreground">Perbarui informasi lowongan Anda untuk mendapatkan pelamar yang lebih sesuai.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="space-y-6 lg:col-span-2">
                            <Card className="shadow-md">
                                <CardContent>
                                    <h2 className="mb-4 text-lg font-semibold">Informasi Dasar</h2>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Judul Lowongan</Label>
                                            <Input
                                                id="title"
                                                placeholder="Masukkan judul lowongan"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                            />
                                            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="description">Deskripsi Lowongan</Label>
                                            <Textarea
                                                id="description"
                                                placeholder="Jelaskan detail pekerjaan, tanggung jawab, kualifikasi yang dibutuhkan, dll."
                                                className="min-h-[200px]"
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                            />
                                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-md">
                                <CardContent>
                                    <h2 className="mb-4 text-lg font-semibold">Tipe Lowongan & Anggaran</h2>

                                    <Tabs value={selectedTab} onValueChange={(value) => handleTabChange(value as 'PROJECT' | 'TIME_BASED')}>
                                        <TabsList className="mb-4 grid w-full grid-cols-2">
                                            <TabsTrigger value="PROJECT">Proyek</TabsTrigger>
                                            <TabsTrigger value="TIME_BASED">Berbasis Waktu</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="PROJECT" className="space-y-4">
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor="project_budget_min">Anggaran Minimum (Rp)</Label>
                                                    <Input
                                                        id="project_budget_min"
                                                        type="number"
                                                        placeholder="0"
                                                        value={data.project_budget_min}
                                                        onChange={(e) => setData('project_budget_min', e.target.value)}
                                                    />
                                                    {errors.project_budget_min && <p className="text-sm text-red-500">{errors.project_budget_min}</p>}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="project_budget_max">Anggaran Maksimum (Rp)</Label>
                                                    <Input
                                                        id="project_budget_max"
                                                        type="number"
                                                        placeholder="0"
                                                        value={data.project_budget_max}
                                                        onChange={(e) => setData('project_budget_max', e.target.value)}
                                                    />
                                                    {errors.project_budget_max && <p className="text-sm text-red-500">{errors.project_budget_max}</p>}
                                                </div>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="TIME_BASED" className="space-y-4">
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor="rate_type">Tipe Rate</Label>
                                                    <Select
                                                        value={data.rate_type}
                                                        onValueChange={(value) =>
                                                            setData('rate_type', value as 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY')
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Pilih tipe rate" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="HOURLY">Per Jam</SelectItem>
                                                            <SelectItem value="DAILY">Per Hari</SelectItem>
                                                            <SelectItem value="WEEKLY">Per Minggu</SelectItem>
                                                            <SelectItem value="MONTHLY">Per Bulan</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.rate_type && <p className="text-sm text-red-500">{errors.rate_type}</p>}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="rate_amount">Jumlah Rate (Rp)</Label>
                                                    <Input
                                                        id="rate_amount"
                                                        type="number"
                                                        placeholder="0"
                                                        value={data.rate_amount}
                                                        onChange={(e) => setData('rate_amount', e.target.value)}
                                                    />
                                                    {errors.rate_amount && <p className="text-sm text-red-500">{errors.rate_amount}</p>}
                                                </div>
                                            </div>

                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor="start_datetime">Tanggal Mulai</Label>
                                                    <Input
                                                        id="start_datetime"
                                                        type="datetime-local"
                                                        value={data.start_datetime}
                                                        onChange={(e) => setData('start_datetime', e.target.value)}
                                                    />
                                                    {errors.start_datetime && <p className="text-sm text-red-500">{errors.start_datetime}</p>}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="end_datetime">Tanggal Selesai</Label>
                                                    <Input
                                                        id="end_datetime"
                                                        type="datetime-local"
                                                        value={data.end_datetime}
                                                        onChange={(e) => setData('end_datetime', e.target.value)}
                                                    />
                                                    {errors.end_datetime && <p className="text-sm text-red-500">{errors.end_datetime}</p>}
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <Card className="shadow-md">
                                <CardContent>
                                    <h2 className="mb-4 text-lg font-semibold">Keahlian yang Dibutuhkan</h2>

                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">
                                            Pilih keahlian yang dibutuhkan untuk lowongan ini atau tambahkan keahlian baru. Pelamar dengan keahlian
                                            yang sesuai akan lebih mudah menemukan lowongan Anda.
                                        </p>

                                        <CreatableSelect
                                            unstyled
                                            isMulti
                                            value={selectedOptions}
                                            options={skillOptions}
                                            onChange={handleSkillChange}
                                            placeholder="Pilih atau ketik keterampilan"
                                            noOptionsMessage={() => 'Ketik untuk menambahkan keterampilan baru'}
                                            formatCreateLabel={(inputValue: string) => `Tambahkan "${inputValue}"`}
                                            classNames={{
                                                control: (state) =>
                                                    cn(
                                                        'flex h-full w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                                                        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                                                        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
                                                        state.isFocused ? 'border-ring ring-1 ring-ring' : '',
                                                    ),
                                                option: (state) =>
                                                    cn(
                                                        'cursor-pointer px-3 py-1 hover:bg-accent hover:text-accent-foreground',
                                                        state.isSelected ? 'bg-accent text-accent-foreground' : 'bg-background',
                                                    ),
                                                menu: () => 'bg-background border border-input',
                                                multiValue: () => 'bg-secondary rounded-full pl-2',
                                                multiValueLabel: () => 'text-secondary-foreground pr-1',
                                                multiValueRemove: () =>
                                                    'bg-secondary rounded-full px-1 text-secondary-foreground hover:bg-destructive/20 hover:text-destructive',
                                                placeholder: () => 'text-muted-foreground',
                                                clearIndicator: () => 'text-destructive',
                                                valueContainer: () => 'gap-x-2 gap-y-1',
                                            }}
                                        />
                                        {errors.skills && <p className="text-sm text-red-500">{errors.skills}</p>}
                                        {errors.custom_skills && <p className="text-sm text-red-500">{errors.custom_skills}</p>}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-md">
                                <CardContent>
                                    <h2 className="mb-4 text-lg font-semibold">Simpan Perubahan</h2>

                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">
                                            Perubahan yang Anda buat akan langsung terlihat oleh pelamar setelah disimpan.
                                        </p>

                                        <div className="flex justify-between">
                                            <Button variant="outline" onClick={() => window.history.back()}>
                                                Batal
                                            </Button>
                                            <Button type="submit" disabled={processing}>
                                                {processing ? 'Memproses...' : 'Simpan Perubahan'}
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
