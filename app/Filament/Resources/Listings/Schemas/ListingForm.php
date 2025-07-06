<?php

namespace App\Filament\Resources\Listings\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class ListingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('business_profile_id')
                    ->required()
                    ->numeric(),
                TextInput::make('listing_type')
                    ->required()
                    ->default('PROJECT'),
                TextInput::make('title')
                    ->required(),
                Textarea::make('description')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('project_budget_min')
                    ->numeric(),
                TextInput::make('project_budget_max')
                    ->numeric(),
                TextInput::make('rate_type'),
                TextInput::make('rate_amount')
                    ->numeric(),
                DateTimePicker::make('start_datetime'),
                DateTimePicker::make('end_datetime'),
                TextInput::make('status')
                    ->required()
                    ->default('OPEN'),
            ]);
    }
}
