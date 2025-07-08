import { router } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type WorkerProfileWithRelations } from '@/types';

import AddPortfolioDialog from './add-portfolio-dialog';
import EditPortfolioDialog from './edit-portfolio-dialog';
import PortfolioItemCard from './portfolio-item-card';

interface PortfolioTabProps {
    workerProfile: WorkerProfileWithRelations;
}

export default function PortfolioTab({ workerProfile }: PortfolioTabProps) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingPortfolioItem, setEditingPortfolioItem] = useState<null | {
        id: number;
        title: string;
        description: string;
        image_url?: string;
        project_link?: string;
    }>(null);

    const handleEditPortfolioItem = (id: number) => {
        const item = workerProfile.portfolio_items.find((item) => item.id === id);
        if (item) {
            setEditingPortfolioItem(item);
        }
    };

    const handleDeletePortfolioItem = (id: number) => {
        if (confirm('Are you sure you want to delete this portfolio item?')) {
            router.delete(route('worker-profile.portfolio.destroy', { portfolioItem: id }));
        }
    };

    return (
        <Card className="bg-background shadow-lg shadow-blue-900/5">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                    <HeadingSmall title="Portfolio Items" description="Showcase your work to potential clients" />
                </CardTitle>
                <Button size="sm" className="gap-1" onClick={() => setIsAddDialogOpen(true)}>
                    <PlusIcon className="h-4 w-4" /> Add Item
                </Button>
            </CardHeader>
            <CardContent>
                {workerProfile.portfolio_items.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {workerProfile.portfolio_items.map((item) => (
                            <PortfolioItemCard
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                description={item.description || ''}
                                imageUrl={item.image_url}
                                projectLink={item.project_link}
                                onEdit={handleEditPortfolioItem}
                                onDelete={handleDeletePortfolioItem}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-lg border bg-card p-6 text-center shadow-sm">
                        <p className="text-muted-foreground">You haven't added any portfolio items yet.</p>
                        <Button variant="outline" className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Your First Portfolio Item
                        </Button>
                    </div>
                )}
            </CardContent>

            {/* Dialogs */}
            <AddPortfolioDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} />
            <EditPortfolioDialog portfolioItem={editingPortfolioItem} onClose={() => setEditingPortfolioItem(null)} />
        </Card>
    );
}
