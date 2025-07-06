<?php

namespace App\Filament\Resources\PortfolioItems\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class PortfolioItemInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('worker_profile_id')
                    ->numeric(),
                TextEntry::make('title'),
                ImageEntry::make('image_url'),
                TextEntry::make('project_link'),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
