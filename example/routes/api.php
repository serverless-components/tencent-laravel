<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/posts', function (Request $request) {
    $input = $request->all();

    return response()->json([
        'title' => 'serverless',
        'get' => $input
    ]);
});

Route::post('/posts', function (Request $request) {
    $input = $request->all();

    return response()->json([
        'title' => 'serverless',
        'data' => $input
    ]);
});

// upload file demo
Route::post('/upload', function (Request $request) {
    // field file in form data
    if ($request->file) {
        $upload = $request->file->store('upload');
        $uploadFile = storage_path()."/app/".$upload;
    }

    return response()->json([
        'title' => 'serverless',
        'upload' => $uploadFile ?? null,
    ]);
});
