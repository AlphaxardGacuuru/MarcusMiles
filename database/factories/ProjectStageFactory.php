<?php

namespace Database\Factories;

use App\Models\Stage;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProjectStage>
 */
class ProjectStageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "stage_id" => Stage::where("type", "project")
                ->orderBy("id", "asc")
                ->get()
                ->first()
                ->id,
            "created_by" => User::where("account_type", "staff")
                ->get()
                ->random()
                ->id,
        ];
    }
}
