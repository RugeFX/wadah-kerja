<?php

namespace App\Filament\Resources\BusinessProfiles\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class BusinessProfileForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('user_id')
                    ->required()
                    ->numeric(),
                TextInput::make('company_name')
                    ->required(),
                TextInput::make('location')
                    ->required(),
                Textarea::make('description')
                    ->columnSpanFull(),
                TextInput::make('profile_picture_url'),
            ]);
    }
}
