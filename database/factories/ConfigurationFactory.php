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

        return [
            "project_types" => $projectTypes,
        ];
    }
}
