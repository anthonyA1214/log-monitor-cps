<?php

declare(strict_types=1);

use LogMonitor\Backend\Controller\LogController;
use LogMonitor\Backend\Controller\SettingsController;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;

return static function (App $app): void {
    $app->group('/api', function (RouteCollectorProxy $group) {

        // api/logs
        $group->group('/logs', function (RouteCollectorProxy $group) {
            $group->get('', [LogController::class, 'index']);
            $group->post('', [LogController::class, 'store']);
            $group->get('/{fileName:.+}', [LogController::class, 'show']);
        });

        // api/settings
        $group->group('/settings', function (RouteCollectorProxy $group) {
            $group->get('', [SettingsController::class, 'index']);
            $group->patch('', [SettingsController::class, 'update']);
        });

    });
};
