<?php

namespace App\Http\Services;

use App\Http\Resources\ProjectServiceProviderResource;
use App\Models\ProjectServiceProvider;

class ProjectServiceProviderService extends Service
{
    /*
     * Get All ProjectServiceProviders
     */
    public function index($request)
    {
        if ($request->filled("idAndName")) {
            $projectServiceProviders = ProjectServiceProvider::join('projects', 'project_service_providers.project_id', '=', 'projects.id')
                ->join('users', 'project_service_providers.service_provider_id', '=', 'users.id')
                ->select(
                    'project_service_providers.id',
                    'users.name as serviceProviderName',
                    'projects.name as projectName',
					'project_id as projectId'
                )
                ->orderBy('project_service_providers.id', 'DESC')
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
        $projectServiceProvider->labour_rate = $request->labourRate;
        $projectServiceProvider->quantity_of_work = $request->quantityOfWork;
        $projectServiceProvider->total_amount = $request->totalAmount;
        $projectServiceProvider->service = $request->service;
        $projectServiceProvider->status = $request->status;
        $projectServiceProvider->start_date = $request->startDate;
        $projectServiceProvider->end_date = $request->endDate;
        $projectServiceProvider->created_by = $this->id;
        $saved = $projectServiceProvider->save();

        $message = $projectServiceProvider->serviceProvider->name . " created successfully";

        return [$saved, $message, $projectServiceProvider];
    }

    /*
     * Update ProjectServiceProvider
     */
    public function update($request, $id)
    {
        $projectServiceProvider = ProjectServiceProvider::find($id);

        if ($request->filled("labourRate")) {
            $projectServiceProvider->labour_rate = $request->labourRate;
        }

        if ($request->filled("quantityOfWork")) {
            $projectServiceProvider->quantity_of_work = $request->quantityOfWork;
        }

        if ($request->filled("totalAmount")) {
            $projectServiceProvider->total_amount = $request->totalAmount;
        }

        if ($request->filled("service")) {
            $projectServiceProvider->service = $request->service;
        }

        if ($request->filled("status")) {
            $projectServiceProvider->status = $request->status;
        }

        if ($request->filled("startDate")) {
            $projectServiceProvider->start_date = $request->startDate;
        }

        if ($request->filled("endDate")) {
            $projectServiceProvider->end_date = $request->endDate;
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

        if ($request->filled("serviceProviderId")) {
            $query = $query->where("service_provider_id", $request->input("serviceProviderId"));
        }

        return $query;
    }
}
