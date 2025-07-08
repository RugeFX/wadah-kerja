import { Head, usePage } from '@inertiajs/react';
import { BuildingIcon } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BusinessProfile, type SharedData } from '@/types';

import GeneralInformationTab from '@/components/business-profile/general-information-tab';

interface BusinessProfileProps {
    businessProfile: BusinessProfile;
}

export default function BusinessProfile({ businessProfile }: BusinessProfileProps) {
    const { auth } = usePage<SharedData<true>>().props;

    return (
        <AppLayout>
            <Head title="Pengaturan Profil Bisnis" />

            <SettingsLayout>
                <div className="flex h-full flex-1 flex-col gap-6">
                    <div className="mb-4 flex items-center gap-3 rounded-lg bg-primary/5 p-4">
                        <BuildingIcon className="h-6 w-6 text-primary" />
                        <div>
                            <h2 className="text-lg font-semibold">Profil Bisnis</h2>
                            <p className="text-sm text-muted-foreground">Kelola informasi dan tampilan bisnis Anda</p>
                        </div>
                    </div>
                    <GeneralInformationTab businessProfile={businessProfile} userName={auth.user.name} />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
