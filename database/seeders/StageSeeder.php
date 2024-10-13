<?php

namespace Database\Seeders;

use App\Models\Stage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        $stages = ["Pending", "In Progress", "In Review", "Completed"];

        foreach ($stages as $key => $stage) {
            Stage::factory()
                ->create([
                    "name" => $stage,
                    "position" => $key + 1,
                ]);
        }
    }
}
