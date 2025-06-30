import type { PropsWithChildren } from 'react';

import AppFooter from '@/components/app-footer';
import AppNavbar from '@/components/app-navbar';
import { AppShell } from '@/components/app-shell';

export default function AppNavbarLayout({ children }: PropsWithChildren) {
    return (
        <AppShell>
            <div className="relative min-h-screen">
                {/* Background Pattern */}
                <div className="fixed inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950" />
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#262626_1px,transparent_1px)]" />
                </div>

                {/* Content Layer */}
                <div className="relative">
                    <AppNavbar />
                    <main>{children}</main>
                    <AppFooter />
                </div>
            </div>
        </AppShell>
    );
}
