import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { type BusinessProfile } from '@/types';

type BusinessProfileForm = {
    company_name: string;
    location: string;
    description: string;
    profile_picture?: File | null;
};

interface GeneralInformationTabProps {
    businessProfile: BusinessProfile;
    userName: string;
}

export default function GeneralInformationTab({ businessProfile, userName }: GeneralInformationTabProps) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { data, setData, errors, processing, recentlySuccessful, post } = useForm<BusinessProfileForm & { _method: 'patch' }>({
        _method: 'patch',
        company_name: businessProfile.company_name || '',
        location: businessProfile.location || '',
        description: businessProfile.description || '',
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

        post(route('business-profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <Card className="bg-background shadow-lg shadow-blue-900/5">
            <CardHeader>
                <CardTitle>
                    <HeadingSmall title="Business Profile" description="Update your business information visible to potential workers" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={submitProfile} className="space-y-6">
                    <div className="flex flex-col gap-6 md:flex-row">
                        <div className="flex-1 space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="company_name">Company Name</Label>
                                <Input
                                    id="company_name"
                                    className="mt-1 block w-full"
                                    value={data.company_name}
                                    onChange={(e) => setData('company_name', e.target.value)}
                                    required
                                    placeholder="e.g. Acme Corporation"
                                />
                                <InputError className="mt-2" message={errors.company_name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    className="mt-1 block w-full"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    required
                                    placeholder="e.g. Jakarta, Indonesia"
                                />
                                <InputError className="mt-2" message={errors.location} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Company Description</Label>
                                <Textarea
                                    id="description"
                                    className="mt-1 block w-full"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                    rows={5}
                                    placeholder="Tell workers about your business, industry, and what services you typically need"
                                />
                                <InputError className="mt-2" message={errors.description} />
                            </div>
                        </div>

                        <div className="w-full md:w-1/3">
                            <div className="grid gap-2">
                                <Label>Company Logo</Label>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="relative h-40 w-40 overflow-hidden rounded-full border">
                                        <img
                                            src={previewImage || businessProfile.profile_picture_url || ''}
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
                                </div>
                                <InputError className="mt-2" message={errors.profile_picture} />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>
                            {processing && <span className="mr-2 inline-block animate-spin">⟳</span>}
                            Save Changes
                        </Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-600">Saved successfully</p>
                        </Transition>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
