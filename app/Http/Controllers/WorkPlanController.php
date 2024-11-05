<?php

namespace App\Http\Controllers;

use App\Http\Services\WorkPlanService;
use App\Models\WorkPlan;
use Illuminate\Http\Request;

class WorkPlanController extends Controller
{
    public function __construct(protected WorkPlanService $service)
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->service->index($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            "projectId" => "required|string",
            "name" => "required|string",
            "deposit" => "required|string",
            "totalCost" => "required|string",
            "startsAt" => "required|date",
            "endsAt" => "required|date",
        ]);

        [$saved, $message, $workPlan] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $workPlan,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\WorkPlan  $workPlan
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->service->show($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\WorkPlan  $workPlan
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "name" => "nullable|string",
            "deposit" => "nullable|string",
            "totalCost" => "nullable|string",
            "startsAt" => "nullable|date",
            "endsAt" => "nullable|date",
        ]);

        [$saved, $message, $workPlan] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $workPlan,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\WorkPlan  $workPlan
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $workPlan] = $this->service->destroy($id);

        return response([
            "status" => $deleted,
            "message" => $message,
            "data" => $workPlan,
        ], 200);
    }

    /*
     * Chart
     */
    public function chart($projectId)
    {
        return $this->service->chart($projectId);
    }
}
