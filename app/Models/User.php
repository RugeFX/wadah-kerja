<?php

namespace App\Models;

use App\Enums\RolesEnum;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements FilamentUser
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the business profile associated with the user.
     */
    public function businessProfile()
    {
        return $this->hasOne(BusinessProfile::class);
    }

    /**
     * Get the worker profile associated with the user.
     */
    public function workerProfile()
    {
        return $this->hasOne(WorkerProfile::class);
    }

    /**
     * Get the reviews written by the user.
     */
    public function reviewsGiven()
    {
        return $this->hasMany(Review::class, 'reviewer_id');
    }

    /**
     * Get the reviews received by the user.
     */
    public function reviewsReceived()
    {
        return $this->hasMany(Review::class, 'reviewee_id');
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return $this->hasRole(RolesEnum::ADMIN);
    }
}
