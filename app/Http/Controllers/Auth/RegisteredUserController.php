<?php

namespace App\Http\Controllers\Auth;

use App\Enums\RolesEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterUserRequest;
use App\Models\BusinessProfile;
use App\Models\User;
use App\Models\WorkerProfile;
use DB;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return inertia('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterUserRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $accountType = RolesEnum::tryFrom($validated['account_type']);

        if ($accountType !== RolesEnum::BUSINESS && $accountType !== RolesEnum::WORKER)
            return redirect()->back()->withErrors(['account_type' => 'Invalid account type']);

        DB::beginTransaction();

        try {
            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
            ]);

            if ($accountType === RolesEnum::BUSINESS) {
                BusinessProfile::create([
                    'user_id' => $user->id,
                    'company_name' => $request->input('company_name'),
                    'location' => $request->input('business_location'),
                    'description' => $request->input('business_description'),
                ]);
                $user->assignRole(RolesEnum::BUSINESS);
            } else {
                WorkerProfile::create([
                    'user_id' => $user->id,
                    'headline' => $request->input('headline'),
                    'location' => $request->input('worker_location'),
                    'bio' => $request->input('bio'),
                ]);
                $user->assignRole(RolesEnum::WORKER);
            }

            DB::commit();

            event(new Registered($user));

            Auth::login($user);

            return redirect()->intended(route('dashboard', absolute: false));
        } catch (\Exception $e) {
            DB::rollBack();

            throw $e;
        }
    }
}
