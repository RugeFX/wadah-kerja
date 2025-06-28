import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export type Auth =
    | {
          user: User | null;
          role: Role | null;
          isAuthenticated: false;
      }
    | {
          user: User;
          role: Role;
          isAuthenticated: true;
      };

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Role {
    id: number;
    name: string;
    [key: string]: unknown;
}
