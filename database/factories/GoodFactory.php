<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Good>
 */
class GoodFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $goods = [
            "Concrete",
            "Steel",
            "Bricks",
            "Wood/Lumber",
            "Glass",
            "Stone",
            "Ceramic Tiles",
            "Paints and Finishes",
            "Rebar",
            "Wood Veneer",
            "Glass Panels",
            "Decorative Wall Panels",
            "Mirrors",
            "Ceramic and Porcelain Tiles",
            "Laminates",
            "Natural Stone Slabs",
            "Metal Accents",
            "Textured Paints and Finishes",
        ];

        return [
            "code" => $goods[rand(0, 10)],
            "name" => $goods[rand(0, 10)],
            "markup" => rand(20, 30),
            "notification_quantity" => 1,
            "created_by" => User::where("account_type", "staff")
                ->get()
                ->random()
                ->id,
        ];
    }
}
