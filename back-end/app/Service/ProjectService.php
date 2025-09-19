<?php

namespace App\Services;

use App\Models\Project;
use App\Events\ProjectCreated;
use Illuminate\Support\Facades\DB;

class ProjectService
{
    public function createProject(array $data, $ownerId): Project
    {
        return DB::transaction(function () use ($data, $ownerId) {
            $data['owner_id'] = $ownerId;
            $project = Project::create($data);

            // déclencher un event
            event(new ProjectCreated($project));

            return $project;
        });
    }

    public function changeStatus(Project $project, string $status): Project
    {
        $project->status = $status;
        $project->save();

        return $project;
    }
}
