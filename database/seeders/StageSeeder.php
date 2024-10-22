<?php

namespace Database\Seeders;

use App\Models\Stage;
use Illuminate\Database\Seeder;

class StageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $stages = [
            ["name" => "Pending", "type" => "issue"],
            ["name" => "In Progress", "type" => "issue"],
            ["name" => "In Review", "type" => "issue"],
            ["name" => "Completed", "type" => "issue"],
            ["name" => "Prospect", "type" => "project"],
            ["name" => "Brief Collection", "type" => "project"],
            ["name" => "Agreement", "type" => "project"],
            ["name" => "Design", "type" => "project"],
            ["name" => "Construction", "type" => "project"],
            ["name" => "Close", "type" => "project"],
        ];

        foreach ($stages as $key => $stage) {
            Stage::factory()
                ->create([
                    "name" => $stage["name"],
                    "type" => $stage["type"],
                    "position" => $key + 1,
                ]);
        }
    }
}
