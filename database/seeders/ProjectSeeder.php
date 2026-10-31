<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        // EDIT: put your real completion dates
        $projects = [
            [
                'title' => 'BINLY: AI Waste Segregation',
                'category' => 'mobile',
                'description' => 'An AI-powered mobile application project utilizing TensorFlow Lite for smart waste classification, complete with UI/UX design and clickable prototypes.',
                'tech_stack' => 'Flutter, Dart, Teachable Machine',
                'image' => 'projects/mob.png',
                'date_completed' => '2026-05-01',
            ],
            [
                'title' => 'LPG & Rice Retail Management System',
                'category' => 'web',
                'description' => 'A proposed web-based inventory and transaction management system featuring a modern, user-friendly interface and secure database integration.',
                'tech_stack' => 'HTML, CSS, JavaScript, PHP, MySQL',
                'image' => 'projects/lpg.png',
                'date_completed' => '2026-03-01',
            ],
            [
                'title' => 'UNCHEYINED E-Commerce App',
                'category' => 'design',
                'description' => 'A branded apparel e-commerce mobile application featuring a complete UI/UX design workflow, from authentication and product catalogs to shopping carts and admin dashboard interfaces.',
                'tech_stack' => 'Figma, UI/UX design',
                'image' => 'projects/uncheyined.png',
                'date_completed' => '2026-01-01',
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(['title' => $project['title']], $project);
        }
    }
}