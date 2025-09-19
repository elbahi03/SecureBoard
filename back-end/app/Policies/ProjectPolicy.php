<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Project;

class ProjectPolicy
{
    public function view(User $user, Project $project)
    {
        return $user->hasRole('admin') || $user->hasRole('manager') || $project->owner_id === $user->id;
    }

    public function create(User $user)
    {
        return $user->hasRole(['admin','manager','user']);
    }

    public function update(User $user, Project $project)
    {
        if ($user->hasRole('admin')) return true;
        if ($user->hasRole('manager')) return true; // adapte si nécessaire
        return $project->owner_id === $user->id;
    }

    public function delete(User $user, Project $project)
    {
        if ($user->hasRole('admin')) return true;
        return $project->owner_id === $user->id;
    }
}
