import { Head, usePage } from '@inertiajs/react';
import { FolderIcon, UserIcon } from 'lucide-react';
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
            <Head title="Pengaturan Profil Pekerja" />

            <SettingsLayout>
                <div className="flex h-full flex-1 flex-col gap-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 rounded-lg bg-primary/5 p-1">
                            <TabsTrigger
                                value="general"
                                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary dark:data-[state=active]:bg-primary/20"
                            >
                                <UserIcon className="h-4 w-4" />
                                <span>Informasi Umum</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="portfolio"
                                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary dark:data-[state=active]:bg-primary/20"
                            >
                                <FolderIcon className="h-4 w-4" />
                                <span>Portofolio</span>
                            </TabsTrigger>
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
