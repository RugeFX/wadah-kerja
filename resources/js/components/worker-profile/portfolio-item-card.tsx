import { router, useForm } from '@inertiajs/react';
import { AlertCircleIcon, ExternalLinkIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PortfolioItemCardProps {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
    projectLink?: string;
}

type PortfolioItemForm = {
    id?: number;
    title: string;
    description: string;
    project_link: string;
    image: File | null;
};

export default function PortfolioItemCard({ id, title, description, imageUrl, projectLink }: PortfolioItemCardProps) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(imageUrl || null);

    const { setData, data, errors, processing, post, reset } = useForm<PortfolioItemForm & { _method: 'patch' }>({
        _method: 'patch',
        id: id,
        title: title,
        description: description,
        project_link: projectLink || '',
        image: null,
    });

    useEffect(() => {
        setPreviewImage(imageUrl || null);
    }, [imageUrl]);

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

        post(route('worker-profile.portfolio.update', { portfolioItem: id }), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                reset();
                setIsEditDialogOpen(false);
            },
        });
    };

    const confirmDelete = () => {
        router.delete(route('worker-profile.portfolio.destroy', { portfolioItem: id }));
        setIsDeleteDialogOpen(false);
    };

    return (
        <>
            <Card className="group overflow-hidden pt-0 transition-all hover:shadow-md">
                {imageUrl && (
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                )}
                <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{title}</CardTitle>
                        <div className="flex gap-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsEditDialogOpen(true)}
                                className="h-8 w-8 p-0 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                            >
                                <PencilIcon className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsDeleteDialogOpen(true)}
                                className="h-8 w-8 p-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            >
                                <Trash2Icon className="h-4 w-4" />
                                <span className="sr-only">Hapus</span>
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
                            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                            Lihat Proyek <ExternalLinkIcon className="h-3 w-3" />
                        </a>
                    )}
                </CardContent>
            </Card>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Item Portofolio</DialogTitle>
                        <DialogDescription>Perbarui detail item portofolio Anda.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitEditPortfolioItem} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit_title">Judul</Label>
                            <Input id="edit_title" value={data.title} onChange={(e) => setData('title', e.target.value)} required />
                            <InputError message={errors.title} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="edit_description">Deskripsi</Label>
                            <Textarea
                                id="edit_description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={3}
                            />
                            <InputError message={errors.description} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="edit_project_link">Tautan Proyek (opsional)</Label>
                            <Input
                                id="edit_project_link"
                                type="url"
                                value={data.project_link}
                                onChange={(e) => setData('project_link', e.target.value)}
                                placeholder="https://contoh.com"
                            />
                            <InputError message={errors.project_link} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="edit_image">Gambar (kosongkan untuk mempertahankan gambar saat ini)</Label>
                            {previewImage && (
                                <div className="mb-2 aspect-video w-full overflow-hidden rounded-md border bg-muted">
                                    <img src={previewImage} alt="Pratinjau" className="h-full w-full object-cover" />
                                </div>
                            )}
                            <Input id="edit_image" type="file" accept="image/*" onChange={handleImageChange} />
                            <InputError message={errors.image} />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing && <span className="mr-2 inline-block animate-spin">⟳</span>}
                                Perbarui Item
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                            <AlertCircleIcon className="h-6 w-6" />
                        </div>
                        <DialogTitle className="text-center text-lg font-semibold">Hapus Item Portofolio</DialogTitle>
                        <DialogDescription className="text-center">
                            Apakah Anda yakin ingin menghapus item portofolio ini? Tindakan ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row justify-center gap-2 sm:justify-center">
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Batal
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete} className="gap-2">
                            <Trash2Icon className="h-4 w-4" />
                            Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
