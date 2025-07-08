import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface EditPortfolioDialogProps {
    portfolioItem: {
        id: number;
        title: string;
        description: string;
        image_url?: string;
        project_link?: string;
    } | null;
    onClose: () => void;
}

type PortfolioItemForm = {
    id?: number;
    title: string;
    description: string;
    project_link: string;
    image: File | null;
};

export default function EditPortfolioDialog({ portfolioItem, onClose }: EditPortfolioDialogProps) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { setData, data, errors, processing, post, reset } = useForm<PortfolioItemForm & { _method: 'patch' }>({
        _method: 'patch',
        id: portfolioItem?.id,
        title: portfolioItem?.title || '',
        description: portfolioItem?.description || '',
        project_link: portfolioItem?.project_link || '',
        image: null,
    });

    useEffect(() => {
        if (portfolioItem) {
            setData({
                _method: 'patch',
                id: portfolioItem.id,
                title: portfolioItem.title,
                description: portfolioItem.description,
                project_link: portfolioItem.project_link || '',
                image: null,
            });
            setPreviewImage(portfolioItem.image_url || null);
        }
    }, [portfolioItem, setData]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const submitEditPortfolioItem: FormEventHandler = (e) => {
        e.preventDefault();

        if (!data.id) return;

        post(route('worker-profile.portfolio.update', { portfolioItem: data.id }), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Dialog open={!!portfolioItem} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Edit Portfolio Item</DialogTitle>
                    <DialogDescription>Update your portfolio item details.</DialogDescription>
                </DialogHeader>
                <form onSubmit={submitEditPortfolioItem} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="edit_title">Title</Label>
                        <Input id="edit_title" value={data.title} onChange={(e) => setData('title', e.target.value)} required />
                        <InputError message={errors.title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="edit_description">Description</Label>
                        <Textarea id="edit_description" value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3} />
                        <InputError message={errors.description} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="edit_project_link">Project Link (optional)</Label>
                        <Input
                            id="edit_project_link"
                            type="url"
                            value={data.project_link}
                            onChange={(e) => setData('project_link', e.target.value)}
                            placeholder="https://example.com"
                        />
                        <InputError message={errors.project_link} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="edit_image">Image (leave empty to keep current image)</Label>
                        {previewImage && (
                            <div className="mb-2 aspect-video w-full overflow-hidden rounded-md border bg-muted">
                                <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
                            </div>
                        )}
                        <Input id="edit_image" type="file" accept="image/*" onChange={handleImageChange} />
                        <InputError message={errors.image} />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing && <span className="mr-2 inline-block animate-spin">⟳</span>}
                            Update Item
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
