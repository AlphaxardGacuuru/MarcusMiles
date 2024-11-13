<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Configuration>
 */
class ConfigurationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $projectTypes = [
            ["id" => "bungalow", "name" => "Bungalow"],
            ["id" => "maisonette", "name" => "Maisonette"],
        ];

        $unitTypes = [
            ["id" => "M&sup2;", "name" => "M & sup2;", ],
            ["id" => "SqM & sup2;", "name" => "SqM & sup2;", ],
        ];

        return [
            "project_types" => $projectTypes,
            "unit_types" => $unitTypes,
        ];
    }
}
