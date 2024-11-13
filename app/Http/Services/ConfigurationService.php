<?php

namespace App\Http\Services;

use App\Http\Resources\ConfigurationResource;
use App\Models\Configuration;

class ConfigurationService extends Service
{
    /*
     * Get All Configurations
     */
    public function index()
    {
        $configuration = Configuration::all()->first();

        return new ConfigurationResource($configuration);
    }

    /*
     * Update Configuration
     */
    public function update($request, $id)
    {
        $configuration = Configuration::first();

		// Project Type
        if ($request->filled("projectType")) {
            // Ensure that projectType is an associative array with id and name
            $projectType = [
                'id' => $request->projectType['id'],
                'name' => $request->projectType['name'],
            ];

            if (!$configuration) {
                $configuration = Configuration::create();
            } else {
                $projectTypes = $configuration->project_types ?? [];
                $projectTypes[] = $projectType;
                $configuration->project_types = $projectTypes;
            }
        }

        if ($request->filled("projectTypeToRemove")) {
            $projectTypes = $configuration->project_types ?? [];

            $projectTypeId = $request->projectTypeToRemove;

            $filteredProjectTypes = collect($projectTypes)
                ->filter(function ($projectType) use ($projectTypeId) {
                    return $projectType["id"] != $projectTypeId;
                });

            $configuration->project_types = $filteredProjectTypes;
        }

		// Unit Type
        if ($request->filled("unitType")) {
            // Ensure that unitType is an associative array with id and name
            $unitType = [
                'id' => $request->unitType['id'],
                'name' => $request->unitType['name'],
            ];

            if (!$configuration) {
                $configuration = Configuration::create();
            } else {
                $unitTypes = $configuration->unit_types ?? [];
                $unitTypes[] = $unitType;
                $configuration->unit_types = $unitTypes;
            }
        }

        if ($request->filled("unitTypeToRemove")) {
            $unitTypes = $configuration->unit_types ?? [];

            $unitTypeId = $request->unitTypeToRemove;

            $filteredUnitTypes = collect($unitTypes)
                ->filter(function ($unitType) use ($unitTypeId) {
                    return $unitType["id"] != $unitTypeId;
                });

            $configuration->unit_types = $filteredUnitTypes;
        }

        $saved = $configuration->save();

        $message = "Configuration updated successfully";

        return [$saved, $message, $configuration];
    }

    /*
     * Delete Configuration
     */
    public function destroy($id)
    {
        $configuration = Configuration::findOrFail($id);

        $deleted = $configuration->delete();

        $message = $configuration->name . " deleted successfully";

        return [$deleted, $message, $configuration];
    }
}
