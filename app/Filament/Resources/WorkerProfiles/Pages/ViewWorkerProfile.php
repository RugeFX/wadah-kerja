<?php

namespace App\Filament\Resources\WorkerProfiles\Pages;

use App\Filament\Resources\WorkerProfiles\WorkerProfileResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewWorkerProfile extends ViewRecord
{
    protected static string $resource = WorkerProfileResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
