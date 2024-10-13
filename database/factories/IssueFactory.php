<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Issue>
 */
class IssueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
		$project = Project::all()->random();
        $paddedIssueNumber = str_pad(rand(1, 10), 3, '0', STR_PAD_LEFT);
		$code = "I-" . $project->code . $paddedIssueNumber;

		$priorities = ["hight", "medium", "low"];

        return [
            "code" => $code,
            "project_id" => $project->id,
            "title" => fake()->catchPhrase(),
            "description" => fake()->realTextBetween($minNbChars = 160, $maxNbChars = 200, $indexSize = 2),
            "planned_start_date" => Carbon::now(),
            "planned_end_date" => Carbon::now()->addDays(rand(5, 20)),
            "priority" => $priorities[rand(0, 2)],
            "position" => rand(0, 5),
            "assigned_to" => User::where("account_type", "staff")
                ->get()
                ->random(),
            "created_by" => User::where("account_type", "staff")
                ->get()
                ->random(),
        ];
    }
}
