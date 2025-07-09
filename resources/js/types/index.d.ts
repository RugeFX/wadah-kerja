import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginationData<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export type Auth<Authed = false> = Authed extends true
    ? {
          user: User;
          role: Role;
          isAuthenticated: true;
      }
    : {
          user: User | null;
          role: Role | null;
          isAuthenticated: boolean;
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

export interface SharedData<Authed = false> {
    name: string;
    quote: { message: string; author: string };
    auth: Auth<Authed>;
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

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
}

export interface Skill {
    id: number;
    name: string;
}

export interface BusinessProfile {
    id: number;
    user_id: number;
    company_name: string;
    description: string | null;
    website: string | null;
    location: string | null;
    profile_picture_url: string | null;
}

export interface WorkerProfile {
    id: number;
    user_id: number;
    headline: string;
    bio: string | null;
    profile_picture_url: string | null;
    location: string | null;
    average_rating: number;
    completed_projects_count: number;
}

interface PortfolioItem {
    id: number;
    title: string;
    description: string;
    image_url?: string;
    project_link?: string;
}

export interface WorkerProfileWithRelations extends WorkerProfile {
    user: User;
    skills: Skill[];
    portfolio_items: PortfolioItem[];
}

export interface Proposal {
    id: number;
    listing_id: number;
    worker_profile_id: number;
    cover_letter: string | null;
    status: 'SENT' | 'VIEWED' | 'ACCEPTED' | 'REJECTED';
    created_at: string;
    updated_at: string;
    listing?: Listing;
    worker_profile?: WorkerProfile;
}

export interface BaseListing {
    id: number;
    business_profile_id: number;
    title: string;
    description: string;
    status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    location: string;
    business_profile: BusinessProfile;
    skills: Skill[];
    proposals: Proposal[];
}

export interface ProjectListing extends BaseListing {
    listing_type: 'PROJECT';
    project_budget_min: number;
    project_budget_max: number;
}

export interface TimeBasedListing extends BaseListing {
    listing_type: 'TIME_BASED';
    rate_type: 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
    rate_amount: number;
    start_datetime: string;
    end_datetime: string;
}

export type Listing = ProjectListing | TimeBasedListing;
