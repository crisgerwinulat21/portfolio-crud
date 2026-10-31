<?php

use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', PortfolioController::class)->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Only logged-in users can manage projects (bonus: login protection)
    Route::resource('projects', ProjectController::class)->except(['show']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';