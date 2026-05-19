<?php

declare(strict_types=1);

use LogMonitor\Backend\Controller\LogController;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;

return static function (App $app): void {
    $app->group('/api', function (RouteCollectorProxy $group) {
        $group->get('/logs', [LogController::class, 'index']);
        $group->post('/logs', [LogController::class, 'store']);
        $group->get('/logs/{id}', [LogController::class, 'show']);
    });
};
