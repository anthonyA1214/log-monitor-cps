<?php

use LogMonitor\Backend\Controllers\LogController;
use Slim\App;

return function (App $app) {
    $app->get('/api/logs', [LogController::class, 'getLogs']);
    $app->get('/api/logs/{fileName}', [LogController::class, 'getLogDetailByFileName']);
};
