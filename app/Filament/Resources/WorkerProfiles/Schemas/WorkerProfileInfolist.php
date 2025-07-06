<?php

namespace App\Filament\Resources\WorkerProfiles\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class WorkerProfileInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('user_id')
                    ->numeric(),
                TextEntry::make('headline'),
                TextEntry::make('location'),
                TextEntry::make('profile_picture_url'),
                TextEntry::make('average_rating')
                    ->numeric(),
                TextEntry::make('completed_projects_count')
                    ->numeric(),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
