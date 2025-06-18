<?php

declare(strict_types=1);

namespace App\Enums;

enum RolesEnum: string
{
    case ADMIN = 'admin';
    case USER = 'user';
    case BUSINESS = 'business';

    // extra helper to allow for greater customization of displayed values, without disclosing the name/value data directly
    public function label(): string
    {
        return match ($this) {
            static::ADMIN => 'Admin',
            static::USER => 'User',
            static::BUSINESS => 'Business',
        };
    }
}
