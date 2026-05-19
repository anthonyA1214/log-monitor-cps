<?php

declare(strict_types=1);

use LogMonitor\Backend\Controller\LogController;
use Slim\App;
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use Slim\Routing\RouteCollectorProxy;

return static function (App $app): void {
    $app->group('/api', function (RouteCollectorProxy $group) {
        $group->get('/logs', [LogController::class, 'getLogs']);
        $group->post('/logs', [LogController::class, 'store']);
        $group->get('/logs/{fileName}', [LogController::class, 'getLogDetailByFileName']);
    });

    $app->get('/test-db', function (Request $request, Response $response) {
        $pdo = $this->get(PDO::class);
        $pdo->query('SELECT 1');
        $response->getBody()->write('DB connection works!');
        return $response;
    });
};
