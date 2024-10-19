<?php

namespace App\Http\Controllers;

use App\Http\Services\ProjectServiceProviderService;
use App\Models\User;
use Illuminate\Http\Request;

class ProjectServiceProviderController extends Controller
{
    public function __construct(protected ProjectServiceProviderService $service)
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
            "serviceProviderId" => "required|string",
        ]);

        [$saved, $message, $projectServiceProvider] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $projectServiceProvider,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $projectServiceProvider
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
     * @param  \App\Models\User  $projectServiceProvider
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "projectId" => "nullable|string",
            "serviceProviderId" => "nullable|string",
        ]);

        [$saved, $message, $projectServiceProvider] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $projectServiceProvider,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $projectServiceProvider
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $projectServiceProvider] = $this->service->destroy($id);

        return response([
            "status" => $deleted,
            "message" => $message,
            "data" => $projectServiceProvider,
        ], 200);
    }
}
