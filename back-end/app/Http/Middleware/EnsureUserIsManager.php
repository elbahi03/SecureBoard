<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserIsManager
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        if (! $user || ! $user->hasRole('manager')) {
            abort(403, 'Accès réservé aux managers.');
        }
        return $next($request);
    }
}
