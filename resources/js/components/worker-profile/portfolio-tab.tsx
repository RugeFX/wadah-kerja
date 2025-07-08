import { FolderIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { type WorkerProfileWithRelations } from '@/types';

import AddPortfolioDialog from './add-portfolio-dialog';
import PortfolioItemCard from './portfolio-item-card';

interface PortfolioTabProps {
    workerProfile: WorkerProfileWithRelations;
}

export default function PortfolioTab({ workerProfile }: PortfolioTabProps) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    return (
        <Card className="border-none bg-background shadow-none">
            <CardContent className="p-0">
                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <FolderIcon className="h-6 w-6 text-primary" />
                        <div>
                            <h2 className="text-lg font-semibold">Item Portofolio</h2>
                            <p className="text-sm text-muted-foreground">Tampilkan karya Anda kepada klien potensial</p>
                        </div>
                    </div>
                    <Button size="sm" className="gap-1" onClick={() => setIsAddDialogOpen(true)}>
                        <PlusIcon className="h-4 w-4" /> Tambah Item
                    </Button>
                </div>

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
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-lg border bg-card p-8 text-center shadow-sm">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <FolderIcon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="mb-2 text-lg font-medium">Belum Ada Item Portofolio</h3>
                        <p className="mb-4 text-muted-foreground">Mulai tampilkan karya Anda dengan menambahkan item portofolio pertama Anda.</p>
                        <Button variant="default" onClick={() => setIsAddDialogOpen(true)}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Tambahkan Item Portofolio Pertama Anda
                        </Button>
                    </div>
                )}
            </CardContent>

            {/* Add Dialog */}
            <AddPortfolioDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} />
        </Card>
    );
}
