<?php

namespace App\Filament\Resources\Proposals\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class ProposalForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('listing_id')
                    ->required()
                    ->numeric(),
                TextInput::make('worker_profile_id')
                    ->required()
                    ->numeric(),
                Textarea::make('cover_letter')
                    ->columnSpanFull(),
                TextInput::make('status')
                    ->required()
                    ->default('SENT'),
            ]);
    }
}
