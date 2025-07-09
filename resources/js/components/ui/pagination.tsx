import { Link } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export function Pagination({ currentPage, lastPage, links }: PaginationProps) {
    const pageLinks = links.filter(
        (link) => link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;'
    );

    return (
        <div className="flex items-center justify-center space-x-2">
            {/* Previous Button */}
            <Button
                variant="outline"
                size="icon"
                className={cn(currentPage === 1 && 'opacity-50 cursor-not-allowed')}
                disabled={currentPage === 1}
                asChild={currentPage !== 1}
            >
                {currentPage !== 1 ? (
                    <Link href={links.find((link) => link.label === '&laquo; Previous')?.url || '#'}>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Link>
                ) : (
                    <span>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </span>
                )}
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-2">
                {pageLinks.map((link, index) => {
                    if (link.label === '...') {
                        return (
                            <Button key={`ellipsis-${index}`} variant="outline" size="icon" disabled>
                                <MoreHorizontalIcon className="h-4 w-4" />
                            </Button>
                        );
                    }

                    return (
                        <Button
                            key={link.label}
                            variant={link.active ? 'default' : 'outline'}
                            size="icon"
                            asChild={!link.active && !!link.url}
                        >
                            {!link.active && link.url ? (
                                <Link href={link.url}>
                                    <span>{link.label}</span>
                                </Link>
                            ) : (
                                <span>{link.label}</span>
                            )}
                        </Button>
                    );
                })}
            </div>

            {/* Next Button */}
            <Button
                variant="outline"
                size="icon"
                className={cn(currentPage === lastPage && 'opacity-50 cursor-not-allowed')}
                disabled={currentPage === lastPage}
                asChild={currentPage !== lastPage}
            >
                {currentPage !== lastPage ? (
                    <Link href={links.find((link) => link.label === 'Next &raquo;')?.url || '#'}>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Link>
                ) : (
                    <span>
                        <ChevronRightIcon className="h-4 w-4" />
                    </span>
                )}
            </Button>
        </div>
    );
} 