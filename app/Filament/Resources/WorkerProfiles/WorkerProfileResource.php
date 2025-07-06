<?php

namespace App\Filament\Resources\WorkerProfiles;

use App\Filament\Resources\WorkerProfiles\Pages\CreateWorkerProfile;
use App\Filament\Resources\WorkerProfiles\Pages\EditWorkerProfile;
use App\Filament\Resources\WorkerProfiles\Pages\ListWorkerProfiles;
use App\Filament\Resources\WorkerProfiles\Pages\ViewWorkerProfile;
use App\Filament\Resources\WorkerProfiles\RelationManagers\SkillsRelationManager;
use App\Filament\Resources\WorkerProfiles\Schemas\WorkerProfileForm;
use App\Filament\Resources\WorkerProfiles\Schemas\WorkerProfileInfolist;
use App\Filament\Resources\WorkerProfiles\Tables\WorkerProfilesTable;
use App\Models\WorkerProfile;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class WorkerProfileResource extends Resource
{
    protected static ?string $model = WorkerProfile::class;

    protected static string|UnitEnum|null $navigationGroup = 'Profiles';

    protected static string|BackedEnum|null $navigationIcon = "lucide-user-square";

    public static function form(Schema $schema): Schema
    {
        return WorkerProfileForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return WorkerProfileInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return WorkerProfilesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            SkillsRelationManager::class
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListWorkerProfiles::route('/'),
            'create' => CreateWorkerProfile::route('/create'),
            'view' => ViewWorkerProfile::route('/{record}'),
            'edit' => EditWorkerProfile::route('/{record}/edit'),
        ];
    }
}
