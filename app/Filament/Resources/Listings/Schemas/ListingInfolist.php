<?php

namespace App\Filament\Resources\Listings\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class ListingInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('business_profile_id')
                    ->numeric(),
                TextEntry::make('listing_type'),
                TextEntry::make('title'),
                TextEntry::make('project_budget_min')
                    ->numeric(),
                TextEntry::make('project_budget_max')
                    ->numeric(),
                TextEntry::make('rate_type'),
                TextEntry::make('rate_amount')
                    ->numeric(),
                TextEntry::make('start_datetime')
                    ->dateTime(),
                TextEntry::make('end_datetime')
                    ->dateTime(),
                TextEntry::make('status'),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
