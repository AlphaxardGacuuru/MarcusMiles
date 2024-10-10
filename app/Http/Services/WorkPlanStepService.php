<?php

namespace App\Http\Services;

use App\Http\Resources\WorkPlanStepResource;
use App\Models\WorkPlanStep;

class WorkPlanStepService extends Service
{
    /*
     * Get All Work Plans
     */
    public function index($request)
    {
        $workPlanStepsQuery = new WorkPlanStep;

        $workPlanStepsQuery = $this->search($workPlanStepsQuery, $request);

        $workPlanSteps = $workPlanStepsQuery
            ->paginate(20);

        return WorkPlanStepResource::collection($workPlanSteps);
    }

    /*
     * Get One Work Plan
     */
    public function show($id)
    {
        $workPlanStep = WorkPlanStep::findOrFail($id);

        return new WorkPlanStepResource($workPlanStep);
    }

    /*
     * Store Work Plan
     */
    public function store($request)
    {
        $workPlanStep = new WorkPlanStep;
        $workPlanStep->work_plan_id = $request->workPlanId;
        $workPlanStep->name = $request->name;
        $workPlanStep->starts_at = $request->startsAt;
        $workPlanStep->ends_at = $request->endsAt;
        $workPlanStep->created_by = $this->id;
        $saved = $workPlanStep->save();

        $message = $workPlanStep->name . " created successfully";

        return [$saved, $message, $workPlanStep];
    }

    /*
     * Update Work Plan
     */
    public function update($request, $id)
    {
        $workPlanStep = WorkPlanStep::find($id);

        if ($request->filled("name")) {
            $workPlanStep->name = $request->name;
        }

        if ($request->filled("startsAt")) {
            $workPlanStep->starts_at = $request->startsAt;
        }

        if ($request->filled("endsAt")) {
            $workPlanStep->ends_at = $request->endsAt;
        }

        $saved = $workPlanStep->save();

        $message = $workPlanStep->name . " updated successfully";

        return [$saved, $message, $workPlanStep];
    }

    /*
     * Delete Work Plan
     */
    public function destroy($id)
    {
        $workPlanStep = WorkPlanStep::findOrFail($id);

        $deleted = $workPlanStep->delete();

        $message = $workPlanStep->name . " deleted successfully";

        return [$deleted, $message, $workPlanStep];
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

        if ($request->filled("projectId")) {
            $query = $query
                ->where("project_id", $request->projectId);
        }

        return $query;
    }
}
