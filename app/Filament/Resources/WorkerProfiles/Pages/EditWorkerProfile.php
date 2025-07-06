<?php

namespace App\Filament\Resources\WorkerProfiles\Pages;

use App\Filament\Resources\WorkerProfiles\WorkerProfileResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditWorkerProfile extends EditRecord
{
    protected static string $resource = WorkerProfileResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
