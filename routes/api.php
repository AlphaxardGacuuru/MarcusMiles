<?php

use App\Http\Controllers\CardTransactionController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CreditNoteController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FilePondController;
use App\Http\Controllers\GoodController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\IssueCommentController;
use App\Http\Controllers\IssueController;
use App\Http\Controllers\IssueStageController;
use App\Http\Controllers\KopokopoRecipientController;
use App\Http\Controllers\KopokopoTransferController;
use App\Http\Controllers\MPESATransactionController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\StageController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WaterReadingController;
use App\Http\Controllers\WorkPlanController;
use App\Http\Controllers\WorkPlanStepController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('auth', [UserController::class, 'auth']);

Route::apiResources([
	"clients" => ClientController::class,
	"goods" => GoodController::class,
	"projects" => ProjectController::class,
	"work-plans" => WorkPlanController::class,
	"work-plan-steps" => WorkPlanStepController::class,
	"inventories" => InventoryController::class,
	"suppliers" => SupplierController::class,
	"stages" => StageController::class,
	"issues" => IssueController::class,
	"issue-comments" => IssueCommentController::class,
	"issue-stages" => IssueStageController::class,

    "properties" => PropertyController::class,
    "units" => UnitController::class,
    "tenants" => TenantController::class,
    "invoices" => InvoiceController::class,
    "water-readings" => WaterReadingController::class,
    "card-transactions" => CardTransactionController::class,
    "mpesa-transactions" => MPESATransactionController::class,
    "payments" => PaymentController::class,
    "credit-notes" => CreditNoteController::class,
    "kopokopo-recipients" => KopokopoRecipientController::class,
    "kopokopo-transfers" => KopokopoTransferController::class,
    "users" => UserController::class,
    "staff" => StaffController::class,
    "roles" => RoleController::class,
    'notifications' => NotificationController::class,
]);

/*
 * Dashboard
 */
Route::get("dashboard/{id}", [DashboardController::class, "index"]);
Route::get("dashboard/properties/{id}", [DashboardController::class, "properties"]);

/*
* Issues
*/ 
Route::put("issues/reorder/{id}", [IssueController::class, "reorder"]);

// Kopokopo STK Push
Route::post("stk-push", [MPESATransactionController::class, 'stkPush']);
Route::post("kopokopo-initiate-transfer", [KopokopoTransferController::class, 'initiateTransfer']);

/*
 * Filepond Controller
 */
Route::prefix('filepond')->group(function () {
    Route::controller(FilePondController::class)->group(function () {
        // User
        Route::post('avatar/{id}', 'updateAvatar');

        // Material
        Route::post("materials", "storeMaterial");
        Route::delete("materials/{id}", "destoryMaterial");

        // Attachment
        Route::post("discussion-forums", "storeAttachment");
        Route::delete("discussion-forums/{id}", "destoryAttachment");

        // Submission
        Route::post("submissions/{sessionId}/{unitId}/{week}/{userId}/{type}", "storeSubmission");
    });
});

// Broadcast Routes
Broadcast::routes(['middleware' => ['auth:sanctum']]);
