<?php

namespace App\Filament\Resources\Users\Schemas;

use App\Enums\RolesEnum;
use App\Models\User;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class UserInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('name'),
                TextEntry::make('email'),
                TextEntry::make('roles')
                    ->label('Role')
                    ->formatStateUsing(fn(User $record) => RolesEnum::from($record->roles->first()->name)->label()),
                TextEntry::make('email_verified_at')
                    ->dateTime(),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
