<?php

namespace App\Providers\Filament;

use Filament\Enums\ThemeMode;
use Filament\FontProviders\GoogleFontProvider;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets\AccountWidget;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->favicon(asset('favicon.ico'))
            ->brandLogo(asset('logo.svg'))
            ->sidebarCollapsibleOnDesktop()
            ->defaultThemeMode(ThemeMode::Light)
            ->font('Plus Jakarta Sans', provider: GoogleFontProvider::class)
            ->colors([
                'primary' => [
                    50 => 'oklch(0.982 0.014 207.88)',
                    100 => 'oklch(0.9624 0.0306 206.71)',
                    200 => 'oklch(0.9216 0.0568 211.49)',
                    300 => 'oklch(0.8599 0.078 217.83)',
                    400 => 'oklch(0.7904 0.0914 226.53)',
                    500 => 'oklch(0.6971 0.1132 235.71)',
                    600 => 'oklch(0.5909 0.1125 243.4)',
                    700 => 'oklch(0.4914 0.1098 249.2)',
                    800 => 'oklch(0.3972 0.1057 254.74)',
                    900 => 'oklch(0.3262 0.1033 258.86)',
                    950 => 'oklch(0.2573 0.0755 259.02)',
                ],
                'danger' => [
                    50 => 'oklch(98.7% 0.008261 63.8)',
                    100 => 'oklch(94.4% 0.03661 63.4)',
                    200 => 'oklch(87.8% 0.074005 52.6)',
                    300 => 'oklch(80.5% 0.11809 44.3)',
                    400 => 'oklch(74.5% 0.157987 37.1)',
                    500 => 'oklch(66.7% 0.221035 32.4)',
                    600 => 'oklch(57.9% 0.210755 29.6)',
                    700 => 'oklch(49.7% 0.192762 27.9)',
                    800 => 'oklch(42.3% 0.163955 25.3)',
                    900 => 'oklch(37% 0.143036 21.8)',
                    950 => 'oklch(25.7% 0.09177 25.8)',
                ],
                'gray' => Color::Slate,
            ])
            ->navigationGroups([
                'Master Data',
                'Profiles',
                'Jobs',
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
            ->widgets([
                AccountWidget::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
