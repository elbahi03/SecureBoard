<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\ProjectService;

class ProjectServiceProvider extends ServiceProvider
{
    /**
     * Enregistre les services
     */
    public function register(): void
    {
        // On lie ProjectService au container Laravel
        $this->app->bind(ProjectService::class, function ($app) {
            return new ProjectService();
        });
    }

    /**
     * Bootstrap des services (optionnel)
     */
    public function boot(): void
    {
        //
    }
}

