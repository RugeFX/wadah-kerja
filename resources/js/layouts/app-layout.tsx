import { type ReactNode } from 'react';

import AppLayoutTemplate from '@/layouts/app/app-navbar-layout';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return <AppLayoutTemplate>{children}</AppLayoutTemplate>;
}
