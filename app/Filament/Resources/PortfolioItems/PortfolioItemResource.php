<?php

namespace App\Filament\Resources\PortfolioItems;

use App\Filament\Resources\PortfolioItems\Pages\CreatePortfolioItem;
use App\Filament\Resources\PortfolioItems\Pages\EditPortfolioItem;
use App\Filament\Resources\PortfolioItems\Pages\ListPortfolioItems;
use App\Filament\Resources\PortfolioItems\Pages\ViewPortfolioItem;
use App\Filament\Resources\PortfolioItems\Schemas\PortfolioItemForm;
use App\Filament\Resources\PortfolioItems\Schemas\PortfolioItemInfolist;
use App\Filament\Resources\PortfolioItems\Tables\PortfolioItemsTable;
use App\Models\PortfolioItem;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class PortfolioItemResource extends Resource
{
    protected static ?string $model = PortfolioItem::class;

    protected static string|UnitEnum|null $navigationGroup = 'Profiles';

    protected static string|BackedEnum|null $navigationIcon = "lucide-image";
    protected static ?int $navigationSort = 3;

    public static function form(Schema $schema): Schema
    {
        return PortfolioItemForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return PortfolioItemInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PortfolioItemsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPortfolioItems::route('/'),
            'create' => CreatePortfolioItem::route('/create'),
            'view' => ViewPortfolioItem::route('/{record}'),
            'edit' => EditPortfolioItem::route('/{record}/edit'),
        ];
    }
}
