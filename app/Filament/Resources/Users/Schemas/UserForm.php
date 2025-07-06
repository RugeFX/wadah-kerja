<?php

namespace App\Filament\Resources\Users\Schemas;

use App\Enums\RolesEnum;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Fieldset;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('email')
                    ->email()
                    ->required(),
                DateTimePicker::make('email_verified_at'),
                TextInput::make('password')
                    ->password()
                    ->required(),
                Fieldset::make('Business Profile')
                    ->relationship('businessProfile')
                    ->visible(fn(Get $get) => $get('role') == 3)
                    ->schema([
                        TextInput::make('company_name')
                            ->required(),
                        TextInput::make('location')
                            ->required(),
                        Textarea::make('description')
                            ->columnSpanFull(),
                        TextInput::make('profile_picture_url'),
                    ]),
            ]);
    }
}
