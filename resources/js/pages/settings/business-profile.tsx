import { Head, usePage } from '@inertiajs/react';

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
            <Head title="Business Profile Settings" />

            <SettingsLayout>
                <div className="flex h-full flex-1 flex-col gap-6">
                    <GeneralInformationTab businessProfile={businessProfile} userName={auth.user.name} />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
