<?php

namespace App\Http\Controllers;

use App\Http\Services\IssueService;
use App\Models\Issue;
use Illuminate\Http\Request;

class IssueController extends Controller
{
    public function __construct(protected IssueService $service)
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
            "code" => "required|string",
            "title" => "required|string",
            "description" => "required|string|max:10000",
            "assignedTo" => "required|string",
            "plannedStartDate" => "required|date",
            "plannedEndDate" => "required|date",
            "priority" => "required|string",
            "projectId" => "required|string",
        ]);

        [$saved, $message, $issue] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $issue,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Issue  $issue
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
     * @param  \App\Models\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "code" => "nullable|string",
            "title" => "nullable|string",
            "description" => "nullable|string|max:10000",
            "assignedTo" => "nullable|string",
            "plannedStartDate" => "nullable|date",
            "plannedEndDate" => "nullable|date",
            "priority" => "nullable|string",
            "projectId" => "nullable|string",
        ]);

        [$saved, $message, $issue] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $issue,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $issue] = $this->service->destroy($id);

        return response([
            "status" => $deleted,
            "message" => $message,
            "data" => $issue,
        ], 200);
    }

	/*
	* Reorder Issues
	*/ 
	public function reorder(Request $request, $id)
	{
		[$saved, $message, $data] = $this->service->reorder($request);

		return response([
			"status" => $saved,
			"message" => $message,
			"data" => $data,
		], 200);
	}
}
