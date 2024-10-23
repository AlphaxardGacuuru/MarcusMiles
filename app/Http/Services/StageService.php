<?php

namespace App\Http\Services;

use App\Http\Resources\StageResource;
use App\Models\Stage;

class StageService extends Service
{
    /*
     * Get All Stages
     */
    public function index($request)
    {
        $stagesQuery = Stage::where("type", $request->input("type"));

        switch ($request->input("type")) {
            case "project":
                $stages = $this->projectStages($stagesQuery, $request);
                break;

            default:
                $stages = $this->issueStages($stagesQuery, $request);
                break;
        }

        return StageResource::collection($stages);
    }

    /*
     * Get One Stage
     */
    public function show($id)
    {
        $stage = Stage::findOrFail($id);

        return new StageResource($stage);
    }

    /*
     * Store Stage
     */
    public function store($request)
    {
        $stage = new Stage;
        $stage->name = $request->name;
        $stage->type = $request->type;
        $stage->position = $request->position;
        $stage->created_by = $this->id;
        $saved = $stage->save();

        $message = $stage->name . " created successfully";

        return [$saved, $message, $stage];
    }

    /*
     * Update Stage
     */
    public function update($request, $id)
    {
        $stage = Stage::find($id);

        if ($request->filled("name")) {
            $stage->name = $request->name;
        }

        if ($request->filled("type")) {
            $stage->type = $request->type;
        }

        if ($request->filled("position")) {
            $stage->position = $request->position;
        }

        $saved = $stage->save();

        $message = $stage->name . " updated successfully";

        return [$saved, $message, $stage];
    }

    /*
     * Delete Stage
     */
    public function destroy($id)
    {
        $stage = Stage::findOrFail($id);

        $deleted = $stage->delete();

        $message = $stage->name . " deleted successfully";

        return [$deleted, $message, $stage];
    }

    /*
     * Issue Stages
     */
    public function issueStages($stagesQuery, $request)
    {
        $issueStages = collect([]);

        $stages = $stagesQuery
            ->orderBy("position", "ASC")
            ->get()
            ->map(function ($stage) use ($issueStages, $request) {
                // Fetch the unique issues for each stage
                $issueStageQuery = $this->issueSearch($stage->issueStages(), $request);

                $issues = $issueStageQuery
                    ->orderBy("id", "asc")
                    ->get()
                    ->map(function ($issueStage) use ($issueStages) {
                        $issueStages->push($issueStage);

                        return $issueStage->issue;
                    });

                $stage->uniqueIssues = $issues;

                return $stage;
            });

        // Get The latest Issue Stages
        $issueStages = $issueStages
            ->sortByDesc("id")
            ->values()
            ->reduce(function ($acc, $issueStage) {
                // Check if the accumulator already contains the issueStage with the same id
                if ($acc->doesntContain("issue_id", $issueStage->issue_id)) {
                    $acc->push($issueStage);
                }
                return $acc;
            }, collect([]));

        // Mark old Issue Stages
        $stages = $stages->map(function ($stage) use ($issueStages) {
            $uniqueIssues = $stage
                ->issueStages
                ->map(function ($issueStage) use ($issueStages) {
                    // Mark issue as new or not based on its presence in issueStages
                    if ($issueStages->doesntContain("id", $issueStage->id)) {
                        $issueStage->issue->new = false;
                    } else {
                        $issueStage->issue->new = true;
                    }

                    return $issueStage->issue;
                })
                ->filter(fn($issue) => $issue->new);

            $stage->test = $issueStages;
            $stage->uniqueIssues = $uniqueIssues;

            return $stage;
        });

        return $stages;
    }

    /*
     * Project Stages
     */
    public function projectStages($stagesQuery, $request)
    {
        $projectStages = collect([]);

        $stages = $stagesQuery
            ->orderBy("position", "ASC")
            ->get()
            ->map(function ($stage) use ($projectStages, $request) {
                // Fetch the unique projects for each stage
                $projectStageQuery = $this->projectSearch($stage->projectStages(), $request);

                $projects = $projectStageQuery
                    ->orderBy("id", "asc")
                    ->get()
                    ->map(function ($projectStage) use ($projectStages) {
                        $projectStages->push($projectStage);

                        return $projectStage->project;
                    });

                $stage->uniqueProjects = $projects;

                return $stage;
            });

        // Get The latest Project Stages
        $projectStages = $projectStages
            ->sortByDesc("id")
            ->values()
            ->reduce(function ($acc, $projectStage) {
                // Check if the accumulator already contains the projectStage with the same id
                if ($acc->doesntContain("project_id", $projectStage->project_id)) {
                    $acc->push($projectStage);
                }
                return $acc;
            }, collect([]));

        // Mark old Project Stages
        $stages = $stages->map(function ($stage) use ($projectStages) {
            $uniqueProjects = $stage
                ->projectStages
                ->map(function ($projectStage) use ($projectStages) {
                    // Mark project as new or not based on its presence in projectStages
                    if ($projectStages->doesntContain("id", $projectStage->id)) {
                        $projectStage->project->new = false;
                    } else {
                        $projectStage->project->new = true;
                    }

                    return $projectStage->project;
                })
                ->filter(fn($project) => $project->new);

            $stage->test = $projectStages;
            $stage->uniqueProjects = $uniqueProjects;

            return $stage;
        });

        return $stages;
    }

    /*
     * Handle Issue Search
     */
    public function issueSearch($query, $request)
    {
        if ($request->filled("title")) {
            $query = $query->whereHas("issue", function ($query) use ($request) {
                $query->where("title", "LIKE", "%" . $request->input("title") . "%")
                    ->orWhere("code", "LIKE", "%" . $request->input("title") . "%");
            });
        }

        if ($request->filled("priority")) {
            $query = $query->whereHas("issue", function ($query) use ($request) {
                $query->where("priority", $request->input("priority"));
            });
        }

        if ($request->filled("projectId")) {
            $query = $query->whereHas("issue", function ($query) use ($request) {
                $query->where("project_id", $request->input("projectId"));
            });
        }

        if ($request->filled("staffId")) {
            $query = $query->whereHas("issue", function ($query) use ($request) {
                $query->where("assigned_to", $request->input("staffId"));
            });
        }

        return $query;
    }

    /*
     * Handle Project Search
     */
    public function projectSearch($query, $request)
    {
        if ($request->filled("name") || $request->filled("code")) {
            $query = $query->whereHas("project", function ($query) use ($request) {
                $query->where("name", "LIKE", "%" . $request->input("name") . "%")
                    ->orWhere("code", "LIKE", "%" . $request->input("code") . "%");
            });
        }

        if ($request->filled("projectType")) {
            $query = $query->whereHas("project", function ($query) use ($request) {
                $query->where("type", $request->input("projectType"));
            });
        }

        if ($request->filled("location")) {
            $query = $query->whereHas("project", function ($query) use ($request) {
                $query->where("location", $request->input("location"));
            });
        }

        if ($request->filled("clientId")) {
            $query = $query->whereHas("project", function ($query) use ($request) {
                $query->where("client_id", $request->input("clientId"));
            });
        }

        return $query;
    }
}
