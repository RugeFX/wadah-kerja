<?php

namespace App\Filament\Resources\Listings\Tables;

use App\Models\Listing;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ListingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultGroup('listing_type')
            ->columns([
                TextColumn::make('business_profile_id')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('listing_type')
                    ->searchable(),
                TextColumn::make('title')
                    ->searchable(),
                TextColumn::make('project_budget_min')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('project_budget_max')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('rate_type')
                    ->searchable(),
                TextColumn::make('rate_amount')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('start_datetime')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('end_datetime')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('status')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('listing_type')
                    ->options(Listing::pluck('listing_type', 'listing_type'))
                    ->searchable()
                    ->preload(),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
