<?php

namespace App\Http\Controllers\Auth;

use App\Enums\RolesEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterUserRequest;
use App\Models\BusinessProfile;
use App\Models\Skill;
use App\Models\User;
use App\Models\WorkerProfile;
use DB;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        $skills = Skill::orderBy('name')->get();
        return inertia('auth/register', compact('skills'));
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
                $workerProfile = WorkerProfile::create([
                    'user_id' => $user->id,
                    'headline' => $request->input('headline'),
                    'location' => $request->input('worker_location'),
                    'bio' => $request->input('bio'),
                ]);

                if ($request->has('skill_ids')) {
                    $workerProfile->skills()->attach($request->input('skill_ids'));
                }

                if ($request->has('custom_skills')) {
                    foreach ($request->input('custom_skills') as $skillName) {
                        $skill = Skill::firstOrCreate(['name' => $skillName]);
                        $workerProfile->skills()->attach($skill->id);
                    }
                }

                $user->assignRole(RolesEnum::WORKER);
            }

            DB::commit();

            event(new Registered($user));

            Auth::login($user);

            return redirect()->intended(route($accountType === RolesEnum::BUSINESS ? 'business.dashboard' : 'worker.dashboard', absolute: false));
        } catch (\Exception $e) {
            DB::rollBack();

            throw $e;
        }
    }
}
