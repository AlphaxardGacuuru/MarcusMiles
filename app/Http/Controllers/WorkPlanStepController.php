<?php

namespace App\Http\Controllers;

use App\Http\Services\WorkPlanStepService;
use App\Models\WorkPlanStep;
use Illuminate\Http\Request;

class WorkPlanStepController extends Controller
{
    public function __construct(protected WorkPlanStepService $service)
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
            "workPlanId" => "required|string",
            "name" => "required|string",
            "startsAt" => "required|date",
            "endsAt" => "required|date",
        ]);

        [$saved, $message, $workPlanStep] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $workPlanStep,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\WorkPlanStep  $workPlanStep
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
     * @param  \App\Models\WorkPlanStep  $workPlanStep
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "name" => "nullable|string",
            "startsAt" => "nullable|date",
            "endsAt" => "nullable|date",
        ]);

        [$saved, $message, $workPlanStep] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $workPlanStep,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\WorkPlanStep  $workPlanStep
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $workPlanStep] = $this->service->destroy($id);

        return response([
            "status" => $deleted,
            "message" => $message,
            "data" => $workPlanStep,
        ], 200);
    }
}