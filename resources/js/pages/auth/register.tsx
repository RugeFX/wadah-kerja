import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Building2, LoaderCircle, UserCircle } from 'lucide-react';
import { ChangeEvent, FormEventHandler, useState } from 'react';
import type { MultiValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import AuthLayout from '@/layouts/auth-layout';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { Skill } from '@/types';

type AccountType = 'business' | 'worker';

type RegisterForm = {
    // Step 1: Basic Info
    name: string;
    email: string;
    password: string;
    password_confirmation: string;

    // Step 2: Account Type
    account_type: AccountType;

    // Step 3: Profile Details (Business)
    company_name?: string;
    business_location?: string;
    business_description?: string;

    // Step 3: Profile Details (Worker)
    headline?: string;
    bio?: string;
    worker_location?: string;

    // Step 4: Skills
    skill_ids: number[];
    custom_skills: string[];
};

interface RegisterProps {
    skills: Skill[];
}

export default function Register({ skills }: RegisterProps) {
    const [step, setStep] = useState(1);
    const { data, setData, post, processing, errors } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        account_type: 'worker',
        company_name: '',
        business_location: '',
        business_description: '',
        headline: '',
        bio: '',
        worker_location: '',
        skill_ids: [],
        custom_skills: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const renderStep1 = () => (
        <div className="grid gap-6">
            <div className="grid gap-2">
                <Label htmlFor="name">Nama</Label>
                <Input
                    id="name"
                    type="text"
                    required
                    autoFocus
                    tabIndex={1}
                    autoComplete="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    disabled={processing}
                    placeholder="Masukkan nama lengkap Anda"
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="email">Alamat Email</Label>
                <Input
                    id="email"
                    type="email"
                    required
                    tabIndex={2}
                    autoComplete="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    disabled={processing}
                    placeholder="Masukkan alamat email Anda"
                />
                <InputError message={errors.email} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="password">Kata Sandi</Label>
                <Input
                    id="password"
                    type="password"
                    required
                    tabIndex={3}
                    autoComplete="new-password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    disabled={processing}
                    placeholder="Masukkan kata sandi Anda"
                />
                <InputError message={errors.password} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="password_confirmation">Konfirmasi Kata Sandi</Label>
                <Input
                    id="password_confirmation"
                    type="password"
                    required
                    tabIndex={4}
                    autoComplete="new-password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    disabled={processing}
                    placeholder="Masukkan kembali kata sandi Anda"
                />
                <InputError message={errors.password_confirmation} />
            </div>

            <Button
                type="button"
                className="mt-2 w-full"
                onClick={nextStep}
                disabled={!data.name || !data.email || !data.password || !data.password_confirmation}
            >
                Lanjut
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    );

    const renderStep2 = () => (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <Label className="text-lg">Pilih Tipe Akun</Label>
                <RadioGroup
                    value={data.account_type}
                    onValueChange={(value: AccountType) => setData('account_type', value)}
                    className="grid gap-4 pt-2"
                >
                    <div className="relative">
                        <RadioGroupItem value="business" id="business" className="peer absolute top-4 left-4 h-5 w-5" />
                        <Label
                            htmlFor="business"
                            className="flex cursor-pointer flex-col gap-2 rounded-lg border p-4 pl-12 shadow-sm transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-accent"
                        >
                            <div className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-primary" />
                                <span className="font-medium">Bisnis</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Saya ingin mempekerjakan talenta untuk proyek atau pekerjaan saya</p>
                        </Label>
                    </div>

                    <div className="relative">
                        <RadioGroupItem value="worker" id="worker" className="peer absolute top-4 left-4 h-5 w-5" />
                        <Label
                            htmlFor="worker"
                            className="flex cursor-pointer flex-col gap-2 rounded-lg border p-4 pl-12 shadow-sm transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-accent"
                        >
                            <div className="flex items-center gap-2">
                                <UserCircle className="h-5 w-5 text-primary" />
                                <span className="font-medium">Pekerja</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Saya ingin mencari peluang kerja dan terhubung dengan bisnis lokal</p>
                        </Label>
                    </div>
                </RadioGroup>
                <InputError message={errors.account_type} />
            </div>

            <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={prevStep} className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali
                </Button>
                <Button type="button" onClick={nextStep} className="w-full">
                    Lanjut
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );

    const renderStep3Business = () => (
        <div className="grid gap-6">
            <div className="grid gap-2">
                <Label htmlFor="company_name">Nama Perusahaan</Label>
                <Input
                    id="company_name"
                    type="text"
                    required
                    value={data.company_name}
                    onChange={(e) => setData('company_name', e.target.value)}
                    disabled={processing}
                    placeholder="Masukkan nama perusahaan Anda"
                />
                <InputError message={errors.company_name} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="business_location">Lokasi</Label>
                <Input
                    id="business_location"
                    type="text"
                    required
                    value={data.business_location}
                    onChange={(e) => setData('business_location', e.target.value)}
                    disabled={processing}
                    placeholder="Masukkan lokasi perusahaan"
                />
                <InputError message={errors.business_location} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="business_description">Deskripsi Perusahaan</Label>
                <Textarea
                    id="business_description"
                    value={data.business_description}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData('business_description', e.target.value)}
                    disabled={processing}
                    placeholder="Ceritakan tentang perusahaan Anda"
                />
                <InputError message={errors.business_description} />
            </div>

            <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={prevStep} className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali
                </Button>
                <Button type="submit" className="w-full" disabled={processing}>
                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                    Daftar
                </Button>
            </div>
        </div>
    );

    const renderStep3Worker = () => (
        <div className="grid gap-6">
            <div className="grid gap-2">
                <Label htmlFor="headline">Headline</Label>
                <Input
                    id="headline"
                    type="text"
                    required
                    value={data.headline}
                    onChange={(e) => setData('headline', e.target.value)}
                    disabled={processing}
                    placeholder="Masukkan headline profil Anda"
                />
                <InputError message={errors.headline} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="worker_location">Lokasi</Label>
                <Input
                    id="worker_location"
                    type="text"
                    required
                    value={data.worker_location}
                    onChange={(e) => setData('worker_location', e.target.value)}
                    disabled={processing}
                    placeholder="Masukkan lokasi Anda"
                />
                <InputError message={errors.worker_location} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                    id="bio"
                    value={data.bio}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData('bio', e.target.value)}
                    disabled={processing}
                    placeholder="Ceritakan tentang diri Anda"
                />
                <InputError message={errors.bio} />
            </div>

            <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={prevStep} className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali
                </Button>
                <Button type="button" onClick={nextStep} className="w-full">
                    Lanjut
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );

    const renderStep4Skills = () => {
        const skillOptions = skills.map((skill) => ({
            value: skill.id,
            label: skill.name,
        }));

        const customOptions = data.custom_skills.map((skill) => ({
            value: skill,
            label: skill,
        }));

        const selectedOptions = [...skillOptions.filter((option) => data.skill_ids.includes(option.value)), ...customOptions];

        const handleChange = (newValue: MultiValue<{ value: string | number; label: string; __isNew__?: boolean }>) => {
            const existingSkills = newValue.filter((v) => !v.__isNew__).map((v) => v.value as number);
            const customSkills = newValue.filter((v) => v.__isNew__).map((v) => v.label as string);

            setData({
                ...data,
                skill_ids: existingSkills,
                custom_skills: customSkills,
            });
        };

        return (
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label>Pilih Keahlian</Label>
                    <p className="text-sm text-muted-foreground">
                        Pilih keahlian yang Anda miliki dari daftar atau ketik untuk menambahkan keahlian baru
                    </p>

                    <CreatableSelect
                        unstyled
                        isMulti
                        value={selectedOptions}
                        options={skillOptions}
                        onChange={handleChange}
                        placeholder="Pilih atau ketik keahlian"
                        noOptionsMessage={() => 'Ketik untuk menambahkan keahlian baru'}
                        formatCreateLabel={(inputValue: string) => `Tambah "${inputValue}"`}
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

                <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={prevStep} className="w-full">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali
                    </Button>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={processing || (data.skill_ids.length === 0 && data.custom_skills.length === 0)}
                    >
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Daftar
                    </Button>
                </div>
            </div>
        );
    };

    const renderCurrentStep = () => {
        switch (step) {
            case 1:
                return renderStep1();
            case 2:
                return renderStep2();
            case 3:
                return data.account_type === 'business' ? renderStep3Business() : renderStep3Worker();
            case 4:
                return data.account_type === 'worker' ? renderStep4Skills() : renderStep3Business();
            default:
                return null;
        }
    };

    return (
        <AuthLayout
            title="Selamat Datang!"
            description="Daftar untuk terhubung dengan ribuan talenta dan peluang kerja di komunitas lokal Anda."
            image="/images/register-image.jpg"
            imagePosition="left"
        >
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                {renderCurrentStep()}

                {step === 1 && (
                    <div className="text-sm text-muted-foreground">
                        Sudah punya akun?{' '}
                        <TextLink href={route('login')} tabIndex={6} className="text-primary underline">
                            Masuk
                        </TextLink>
                    </div>
                )}
            </form>
        </AuthLayout>
    );
}
