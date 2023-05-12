<?php

use App\Http\Controllers\GeocodeController;
use App\Http\Controllers\InvestmentsController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MyProjectController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectScoreController;
use App\Http\Controllers\RequestChangeController;
use App\Http\Controllers\ReviewProjectController;
use App\Http\Controllers\StripeOnboardCallback;
use App\Http\Controllers\UpdateProjectInfo;
use App\Http\Controllers\UpdateUniversityInfo;
use App\Http\Controllers\UpdateUserInfo;
use App\Http\Controllers\UserOnboarding;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('dashboard');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
});

require __DIR__.'/auth.php';
