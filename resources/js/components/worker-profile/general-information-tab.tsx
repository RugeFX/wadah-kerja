import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { BriefcaseIcon, MapPinIcon, SaveIcon, UserIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import type { MultiValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { cn } from '@/lib/utils';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { type Skill, type WorkerProfileWithRelations } from '@/types';

type WorkerProfileForm = {
    headline: string;
    bio: string;
    location: string;
    skill_ids: number[];
    custom_skills: string[];
    profile_picture?: File | null;
};

interface GeneralInformationTabProps {
    workerProfile: WorkerProfileWithRelations;
    skills: Skill[];
    userName: string;
}

export default function GeneralInformationTab({ workerProfile, skills, userName }: GeneralInformationTabProps) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { data, setData, errors, processing, recentlySuccessful, post } = useForm<WorkerProfileForm & { _method: 'patch' }>({
        _method: 'patch',
        headline: workerProfile.headline || '',
        bio: workerProfile.bio || '',
        location: workerProfile.location || '',
        skill_ids: workerProfile.skills.map((skill) => skill.id),
        custom_skills: [],
        profile_picture: null,
    });

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('profile_picture', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const submitProfile: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('worker-profile.update'), {
            preserveScroll: true,
        });
    };

    const skillOptions = skills.map((skill) => ({
        value: skill.id,
        label: skill.name,
    }));

    const customOptions = data.custom_skills.map((skill) => ({
        value: skill,
        label: skill,
    }));

    const selectedOptions = [...skillOptions.filter((option) => data.skill_ids.includes(option.value)), ...customOptions];

    const handleSkillChange = (newValue: MultiValue<{ value: string | number; label: string; __isNew__?: boolean }>) => {
        const existingSkills = newValue.filter((v) => !v.__isNew__).map((v) => v.value as number);
        const customSkills = newValue.filter((v) => v.__isNew__).map((v) => v.label as string);

        setData({
            ...data,
            skill_ids: existingSkills,
            custom_skills: customSkills,
        });
    };

    return (
        <Card className="overflow-visible border-none bg-background shadow-none">
            <CardContent className="p-0">
                <form onSubmit={submitProfile} className="space-y-8">
                    <div className="flex flex-col gap-8 md:flex-row">
                        <div className="flex-1 space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="headline" className="flex items-center gap-2 text-sm font-medium">
                                    <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                                    <span>Judul Profesional</span>
                                </Label>
                                <Input
                                    id="headline"
                                    className="mt-1 block w-full"
                                    value={data.headline}
                                    onChange={(e) => setData('headline', e.target.value)}
                                    required
                                    placeholder="mis. Pengembang Web Senior"
                                />
                                <InputError className="mt-2" message={errors.headline} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="location" className="flex items-center gap-2 text-sm font-medium">
                                    <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                                    <span>Lokasi</span>
                                </Label>
                                <Input
                                    id="location"
                                    className="mt-1 block w-full"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    required
                                    placeholder="mis. Jakarta, Indonesia"
                                />
                                <InputError className="mt-2" message={errors.location} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="bio" className="text-sm font-medium">
                                    Bio
                                </Label>
                                <Textarea
                                    id="bio"
                                    className="mt-1 block w-full"
                                    value={data.bio}
                                    onChange={(e) => setData('bio', e.target.value)}
                                    required
                                    rows={5}
                                    placeholder="Ceritakan kepada klien tentang latar belakang profesional, pengalaman, dan keterampilan Anda"
                                />
                                <InputError className="mt-2" message={errors.bio} />
                            </div>
                        </div>

                        <div className="w-full md:w-1/3">
                            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                                <h3 className="mb-4 text-lg font-medium">Foto Profil</h3>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-primary/10">
                                        <img
                                            src={previewImage || workerProfile.profile_picture_url || ''}
                                            alt={userName}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <Input
                                        id="profile_picture"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePictureChange}
                                        className="w-full"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Unggah foto profil profesional. Gambar persegi bekerja paling baik.
                                    </p>
                                </div>
                                <InputError className="mt-2" message={errors.profile_picture} />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="grid gap-4">
                        <Label className="flex items-center gap-2 text-sm font-medium">
                            <UserIcon className="h-4 w-4 text-muted-foreground" />
                            <span>Keterampilan</span>
                        </Label>
                        <p className="text-sm text-muted-foreground">Pilih keterampilan dari daftar atau ketik untuk menambahkan keterampilan baru</p>

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
                        <InputError message={errors.skill_ids} />
                        <InputError message={errors.custom_skills} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing} className="flex items-center gap-2">
                            {processing ? <span className="mr-2 inline-block animate-spin">⟳</span> : <SaveIcon className="h-4 w-4" />}
                            Simpan Perubahan
                        </Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-600">Berhasil disimpan</p>
                        </Transition>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
