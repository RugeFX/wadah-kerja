import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type SharedData, type Skill, type WorkerProfileWithRelations } from '@/types';

import GeneralInformationTab from '@/components/worker-profile/general-information-tab';
import PortfolioTab from '@/components/worker-profile/portfolio-tab';

interface WorkerProfileProps {
    workerProfile: WorkerProfileWithRelations;
    skills: Skill[];
}

export default function WorkerProfile({ workerProfile, skills }: WorkerProfileProps) {
    const { auth } = usePage<SharedData<true>>().props;
    const [activeTab, setActiveTab] = useState('general');

    return (
        <AppLayout>
            <Head title="Worker Profile Settings" />

            <SettingsLayout>
                <div className="flex h-full flex-1 flex-col gap-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="general">General Information</TabsTrigger>
                            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                        </TabsList>

                        <TabsContent value="general" className="mt-6">
                            <GeneralInformationTab workerProfile={workerProfile} skills={skills} userName={auth.user.name} />
                        </TabsContent>

                        <TabsContent value="portfolio" className="mt-6">
                            <PortfolioTab workerProfile={workerProfile} />
                        </TabsContent>
                    </Tabs>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
