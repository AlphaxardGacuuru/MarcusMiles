<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WaterReading>
 */
class WaterReadingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "user_unit_id" => "userUnitId",
            "reading" => "reading",
            "month" => "month",
            "year" => "year",
            "usage" => "usage",
            "bill" => "bill",
        ];
    }
}
