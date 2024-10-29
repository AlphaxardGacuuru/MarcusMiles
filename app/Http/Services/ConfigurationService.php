<?php

namespace App\Http\Services;

use App\Http\Resources\ConfigurationResource;
use App\Models\Configuration;
use Illuminate\Support\Facades\Hash;

class ConfigurationService extends Service
{
    /*
     * Get All Configurations
     */
    public function index($request)
    {
        return Configuration::all();
    }

    /*
     * Get One Configuration
     */
    public function show($id)
    {
        return Configuration::findOrFail($id);
    }

    /*
     * Store Configuration
     */
    public function store($request)
    {
        $configuration = new Configuration;
        $configuration->name = $request->name;
        $configuration->email = $request->email;
        $configuration->password = Hash::make($request->phone ?? $request->email);
        $configuration->phone = $request->phone;
        $configuration->location = $request->location;
        $configuration->account_type = "configuration";
        $saved = $configuration->save();

        $message = $configuration->name . " created successfully";

        return [$saved, $message, $configuration];
    }

    /*
     * Update Configuration
     */
    public function update($request, $id)
    {
        $configuration = Configuration::find($id);

        if ($request->filled("name")) {
            $configuration->name = $request->name;
        }

        if ($request->filled("email")) {
            $configuration->email = $request->email;
        }

        if ($request->filled("phone")) {
            $configuration->phone = $request->phone;
        }

        if ($request->filled("location")) {
            $configuration->location = $request->location;
        }

        $saved = $configuration->save();

        $message = $configuration->name . " updated successfully";

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
