import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2Icon } from 'lucide-react';

interface PortfolioItemCardProps {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
    projectLink?: string;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function PortfolioItemCard({ id, title, description, imageUrl, projectLink, onEdit, onDelete }: PortfolioItemCardProps) {
    return (
        <Card className="overflow-hidden">
            {imageUrl && (
                <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
                </div>
            )}
            <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => onEdit(id)}>
                            Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" onClick={() => onDelete(id)}>
                            <Trash2Icon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">{description}</p>
                {projectLink && (
                    <a
                        href={projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-sm text-blue-600 hover:underline"
                    >
                        View Project
                    </a>
                )}
            </CardContent>
        </Card>
    );
}
