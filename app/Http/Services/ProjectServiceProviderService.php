<?php

namespace App\Http\Services;

use App\Http\Resources\ProjectServiceProviderResource;
use App\Models\ProjectServiceProvider;
use App\Models\User;

class ProjectServiceProviderService extends Service
{
    /*
     * Get All ProjectServiceProviders
     */
    public function index($request)
    {
        if ($request->filled("idAndName")) {
            $projectServiceProviders = ProjectServiceProvider::select("id", "name")
                ->where("account_type", "service provider")
                ->orderBy("id", "DESC")
                ->get();

            return response([
                "data" => $projectServiceProviders,
            ], 200);
        }

        $projectServiceProvidersQuery = new ProjectServiceProvider;

        $projectServiceProvidersQuery = $this->search($projectServiceProvidersQuery, $request);

        $projectServiceProviders = $projectServiceProvidersQuery
            ->paginate(20);

        return ProjectServiceProviderResource::collection($projectServiceProviders);
    }

    /*
     * Get One ProjectServiceProvider
     */
    public function show($id)
    {
        $projectServiceProvider = ProjectServiceProvider::findOrFail($id);

        return new ProjectServiceProviderResource($projectServiceProvider);
    }

    /*
     * Store ProjectServiceProvider
     */
    public function store($request)
    {
        $projectServiceProvider = new ProjectServiceProvider;
        $projectServiceProvider->project_id = $request->projectId;
        $projectServiceProvider->service_provider_id = $request->serviceProviderId;
        $projectServiceProvider->created_by = $this->id;
        $saved = $projectServiceProvider->save();

        $message = $projectServiceProvider->name . " created successfully";

        return [$saved, $message, $projectServiceProvider];
    }

    /*
     * Update ProjectServiceProvider
     */
    public function update($request, $id)
    {
        $projectServiceProvider = ProjectServiceProvider::find($id);

        if ($request->filled("name")) {
            $projectServiceProvider->name = $request->name;
        }

        if ($request->filled("email")) {
            $projectServiceProvider->email = $request->email;
        }

        if ($request->filled("phone")) {
            $projectServiceProvider->phone = $request->phone;
        }

        if ($request->filled("idNumber")) {
            $projectServiceProvider->id_number = $request->idNumber;
        }

        $saved = $projectServiceProvider->save();

        $message = $projectServiceProvider->name . " updated successfully";

        return [$saved, $message, $projectServiceProvider];
    }

    /*
     * Delete ProjectServiceProvider
     */
    public function destroy($id)
    {
        $projectServiceProvider = ProjectServiceProvider::findOrFail($id);

        $deleted = $projectServiceProvider->delete();

        $message = $projectServiceProvider->serviceProvider->name . " deleted successfully";

        return [$deleted, $message, $projectServiceProvider];
    }

    /*
     * Handle Search
     */
    public function search($query, $request)
    {
        if ($request->filled("name")) {
            $query = $query
                ->where("name", "LIKE", "%" . $request->input("name") . "%")
                ->orWhere("email", "LIKE", "%" . $request->input("name") . "%");
        }

        if ($request->filled("projectId")) {
            $query = $query->where("project_id", $request->input("projectId"));
        }

        return $query;
    }
}
