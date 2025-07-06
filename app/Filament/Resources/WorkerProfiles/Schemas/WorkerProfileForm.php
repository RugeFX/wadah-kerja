<?php

namespace App\Filament\Resources\WorkerProfiles\Schemas;

use App\Filament\Resources\Skills\Schemas\SkillForm;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class WorkerProfileForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('user_id')
                    ->required()
                    ->numeric(),
                TextInput::make('headline')
                    ->required(),
                Textarea::make('bio')
                    ->columnSpanFull(),
                TextInput::make('location')
                    ->required(),
                TextInput::make('profile_picture_url'),
                TextInput::make('average_rating')
                    ->required()
                    ->numeric()
                    ->default(0),
                TextInput::make('completed_projects_count')
                    ->required()
                    ->numeric()
                    ->default(0),
                Select::make('skills')
                    ->relationship('skills', 'name')
                    ->multiple()
                    ->preload()
                    ->searchable()
                    ->createOptionForm(fn() => SkillForm::configure($schema))
            ]);
    }
}
