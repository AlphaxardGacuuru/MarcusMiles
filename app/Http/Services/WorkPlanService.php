<?php

namespace App\Http\Services;

use App\Http\Resources\WorkPlanResource;
use App\Models\WorkPlan;

class WorkPlanService extends Service
{
    /*
     * Get All Work Plans
     */
    public function index($request)
    {
        $workPlansQuery = new WorkPlan;

        $workPlansQuery = $this->search($workPlansQuery, $request);

        $workPlans = $workPlansQuery
            ->paginate(20);

        return WorkPlanResource::collection($workPlans);
    }

    /*
     * Get One Work Plan
     */
    public function show($id)
    {
        $workPlan = WorkPlan::findOrFail($id);

        return new WorkPlanResource($workPlan);
    }

    /*
     * Store Work Plan
     */
    public function store($request)
    {
        $workPlan = new WorkPlan;
        $workPlan->project_id = $request->projectId;
        $workPlan->name = $request->name;
        $workPlan->starts_at = $request->startsAt;
        $workPlan->ends_at = $request->endsAt;
        $saved = $workPlan->save();

        $message = $workPlan->name . " created successfully";

        return [$saved, $message, $workPlan];
    }

    /*
     * Update Work Plan
     */
    public function update($request, $id)
    {
        $workPlan = WorkPlan::find($id);

        if ($request->filled("name")) {
            $workPlan->name = $request->name;
        }

        if ($request->filled("startsAt")) {
            $workPlan->starts_at = $request->startsAt;
        }

        if ($request->filled("endsAt")) {
            $workPlan->ends_at = $request->endsAt;
        }

        $saved = $workPlan->save();

        $message = $workPlan->name . " updated successfully";

        return [$saved, $message, $workPlan];
    }

    /*
     * Delete Work Plan
     */
    public function destroy($id)
    {
        $workPlan = WorkPlan::findOrFail($id);

        $deleted = $workPlan->delete();

        $message = $workPlan->name . " deleted successfully";

        return [$deleted, $message, $workPlan];
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
