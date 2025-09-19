<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Services\ProjectService;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    protected $projectService;

    // Injection du service via le constructeur
    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    /**
     * Liste tous les projets
     */
    public function index()
    {
        $projects = $this->projectService->getAllProjects();
        return response()->json($projects);
    }

    /**
     * Crée un nouveau projet
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'status' => 'nullable|in:draft,in_progress,completed',
        ]);

        $project = $this->projectService->createProject($data, auth()->id());
        return response()->json($project, 201);
    }

    /**
     * Affiche un projet spécifique
     */
    public function show($id)
    {
        $project = $this->projectService->getProjectById($id);
        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }
        return response()->json($project);
    }

    /**
     * Met à jour un projet
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'status' => 'nullable|in:draft,in_progress,completed',
        ]);

        $project = $this->projectService->updateProject($id, $data);
        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        return response()->json($project);
    }

    /**
     * Supprime un projet
     */
    public function destroy($id)
    {
        $deleted = $this->projectService->deleteProject($id);
        if (!$deleted) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        return response()->json(['message' => 'Project deleted successfully']);
    }
}

