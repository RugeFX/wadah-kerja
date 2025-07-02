<?php

namespace App\Http\Requests;

use App\Enums\RolesEnum;
use App\Models\User;
use App\Models\Skill;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;

class RegisterUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'account_type' => ['required', 'in:' . RolesEnum::BUSINESS->value . ',' . RolesEnum::WORKER->value],

            // Business fields
            'company_name' => ['nullable', 'required_if:account_type,' . RolesEnum::BUSINESS->value, 'string', 'max:255'],
            'business_location' => ['nullable', 'required_if:account_type,' . RolesEnum::BUSINESS->value, 'string', 'max:255'],
            'business_description' => ['nullable', 'required_if:account_type,' . RolesEnum::BUSINESS->value, 'string', 'max:1000'],

            // Worker fields
            'headline' => ['nullable', 'required_if:account_type,' . RolesEnum::WORKER->value, 'string', 'max:255'],
            'worker_location' => ['nullable', 'required_if:account_type,' . RolesEnum::WORKER->value, 'string', 'max:255'],
            'bio' => ['nullable', 'required_if:account_type,' . RolesEnum::WORKER->value, 'string', 'max:1000'],

            // Skills (required for workers)
            'skill_ids' => ['nullable', 'required_if:account_type,' . RolesEnum::WORKER->value, 'array'],
            'skill_ids.*' => ['exists:' . Skill::class . ',id'],
            'custom_skills' => ['nullable', 'array'],
            'custom_skills.*' => ['string', 'max:255'],
        ];
    }
}
