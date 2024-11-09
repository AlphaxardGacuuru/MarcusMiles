<?php

namespace App\Http\Services;

use App\Http\Resources\WorkPlanResource;
use App\Models\WorkPlan;
use Carbon\Carbon;

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
        $workPlan->deposit = $request->deposit;
        $workPlan->total_cost = $request->totalCost;
        $workPlan->starts_at = $request->startsAt;
        $workPlan->ends_at = $request->endsAt;
        $workPlan->created_by = $this->id;
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

        if ($request->filled("deposit")) {
            $workPlan->deposit = $request->deposit;
        }

        if ($request->filled("totalCost")) {
            $workPlan->total_cost = $request->totalCost;
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

    /*
     * Chart
     */
    public function chart($projectId)
    {
        $workPlans = WorkPlan::where("project_id", $projectId)
            ->orderBy("id", "asc")
            ->get();

        $labels = $workPlans->map(function ($workPlan) {
            $workPlanStepDates = $workPlan->workPlanSteps->map(fn($workPlanStep) => [
                "startsAt" => $workPlanStep->starts_at,
                "endsAt" => $workPlanStep->ends_at,
            ]);

            return [
                "startsAt" => $workPlan->starts_at,
                "endsAt" => $workPlan->ends_at,
                ...$workPlanStepDates,
            ];
        })
            ->flatten()
            ->unique()
            ->sortBy(fn($date) => Carbon::createFromFormat('d M Y', $date))
            ->values();

        $totalWorkPlans = $workPlans->count();
        $totalWorkPlanSteps = $workPlans
            ->reduce(function ($acc, $workPlan) {
                return $acc + $workPlan->workPlanSteps->count();
            }, 0);

        $total = $totalWorkPlans + $totalWorkPlanSteps;

        $workPlans = $workPlans->map(function ($workPlan) use ($labels, &$total) {
            // Inject Data into Work Plan
            $data = $labels->map(function ($label) use ($workPlan, &$total) {
                if ($label == $workPlan->starts_at || $label == $workPlan->ends_at) {
                    $index = $total;
                } else {
                    $index = null;
                }

                return $index;
            })->reduce(function ($acc, $label) {

                // Check if last value is null and push value
                if (!is_null($acc->last())) {
                    if (!is_null($label)) {
                        $acc->push($label);
                        $acc->push(null);
                    } else {
                        $acc->push($acc->last());
                    }
                } else {
                    $acc->push($label);
                }

                return $acc;
            }, collect());

            $data->pop();

            $total--;

            // Inject Data into Work Plan Steps
            $workPlan->workPlanSteps->map(function ($workPlanStep) use ($labels, &$total) {
                $data = $labels->map(function ($label) use ($workPlanStep, &$total) {
                    if ($label == $workPlanStep->starts_at || $label == $workPlanStep->ends_at) {
                        $index = $total;
                    } else {
                        $index = null;
                    }

                    return $index;
                })->reduce(function ($acc, $label) {

                    // Check if last value is null and push value
                    if (!is_null($acc->last())) {
                        if (!is_null($label)) {
                            $acc->push($label);
                            $acc->push(null);
                        } else {
                            $acc->push($acc->last());
                        }
                    } else {
                        $acc->push($label);
                    }

                    return $acc;
                }, collect());

                $data->pop();

                $total--;

                // Insert data to Work Plan Step
                $workPlanStep->data = $data;
            });

            // Insert data to Work Plan
            $workPlan->data = $data;

            return $workPlan;
        });

        $data = [
            "labels" => $labels,
            "data" => $workPlans,
        ];

        return [
            "data" => $data,
        ];
    }
}
