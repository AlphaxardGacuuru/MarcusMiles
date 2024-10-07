<?php

namespace App\Http\Services;

use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Carbon\Carbon;

class ProjectService extends Service
{
    /*
     * Get All Projects
     */
    public function index($request)
    {
        $projectsQuery = new Project;

        $projectsQuery = $this->search($projectsQuery, $request);

        $projects = $projectsQuery
            ->paginate(20);

        return ProjectResource::collection($projects);
    }

    /*
     * Get One Project
     */
    public function show($id)
    {
        $project = Project::findOrFail($id);

        return new ProjectResource($project);
    }

    /*
     * Store Project
     */
    public function store($request)
    {
		$currentYear = Carbon::now()->format('y');
		$newProjectNumber = Project::count() + 1;
		$code = str_pad($newProjectNumber, 3, '0', STR_PAD_LEFT);

        $project = new Project;
        $project->code = $currentYear . $code;
        $project->name = $request->name;
        $project->type = $request->type;
        $project->description = $request->description;
        $project->location = $request->location;
        $project->client_id = $request->clientId;
        $project->created_by = $this->id;
        $saved = $project->save();

        $message = $project->name . " created successfully";

        return [$saved, $message, $project];
    }

    /*
     * Update Project
     */
    public function update($request, $id)
    {
        $project = Project::find($id);

        if ($request->filled("name")) {
            $project->name = $request->name;
        }

        if ($request->filled("type")) {
            $project->type = $request->type;
        }

        if ($request->filled("description")) {
            $project->description = $request->description;
        }

        if ($request->filled("location")) {
            $project->location = $request->location;
        }

        $saved = $project->save();

        $message = $project->name . " updated successfully";

        return [$saved, $message, $project];
    }

    /*
     * Delete Project
     */
    public function destroy($id)
    {
        $project = Project::findOrFail($id);

        $deleted = $project->delete();

        $message = $project->name . " deleted successfully";

        return [$deleted, $message, $project];
    }

    /*
     * Handle Search
     */
    public function search($query, $request)
    {
        if ($request->filled("name")) {
            $query = $query
                ->where("name", "LIKE", "%" . $request->name . "%");
        }

        return $query;
    }
}
