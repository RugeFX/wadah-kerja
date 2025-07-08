import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AddPortfolioDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

type PortfolioItemForm = {
    title: string;
    description: string;
    project_link: string;
    image: File | null;
};

export default function AddPortfolioDialog({ isOpen, onClose }: AddPortfolioDialogProps) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { setData, data, errors, processing, post, reset } = useForm<PortfolioItemForm>({
        title: '',
        description: '',
        project_link: '',
        image: null,
    });

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

    const submitPortfolioItem: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('worker-profile.portfolio.store'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                reset();
                onClose();
                setPreviewImage(null);
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add Portfolio Item</DialogTitle>
                    <DialogDescription>Add a new project to your portfolio to showcase your skills.</DialogDescription>
                </DialogHeader>
                <form onSubmit={submitPortfolioItem} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} required />
                        <InputError message={errors.title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3} />
                        <InputError message={errors.description} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="project_link">Project Link (optional)</Label>
                        <Input
                            id="project_link"
                            type="url"
                            value={data.project_link}
                            onChange={(e) => setData('project_link', e.target.value)}
                            placeholder="https://example.com"
                        />
                        <InputError message={errors.project_link} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="image">Image</Label>
                        {previewImage && (
                            <div className="mb-2 aspect-video w-full overflow-hidden rounded-md border bg-muted">
                                <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
                            </div>
                        )}
                        <Input id="image" type="file" accept="image/*" onChange={handleImageChange} required />
                        <InputError message={errors.image} />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing && <span className="mr-2 inline-block animate-spin">⟳</span>}
                            Add Item
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
