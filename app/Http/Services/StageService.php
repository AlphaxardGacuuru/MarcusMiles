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
        $stagesQuery = new Stage;

        $issueStages = collect([]);

        $stages = $stagesQuery
            ->orderBy("position", "ASC")
            ->get()
            ->map(function ($stage) use ($issueStages) {
                // Fetch the unique issues for each stage
                $issues = $stage->issueStages()
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
