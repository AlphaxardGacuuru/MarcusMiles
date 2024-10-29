<?php

namespace App\Http\Controllers;

use App\Http\Services\ConfigurationService;
use App\Models\User;
use Illuminate\Http\Request;

class ConfigurationController extends Controller
{
    public function __construct(protected ConfigurationService $service)
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
            "name" => "required|string",
            "email" => "required|string",
            "phone" => "required|string",
            "location" => "nullable|string",
        ]);

        [$saved, $message, $configuration] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $configuration,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $configuration
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
     * @param  \App\Models\User  $configuration
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "name" => "nullable|string",
            "email" => "nullable|string",
            "phone" => "nullable|string",
            "location" => "nullable|string",
        ]);

        [$saved, $message, $configuration] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $configuration,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $configuration
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $configuration] = $this->service->destroy($id);

        return response([
            "status" => $deleted,
            "message" => $message,
            "data" => $configuration,
        ], 200);
    }
}
