<?php

use LogMonitor\Backend\Middleware\CorsMiddleware;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$app = AppFactory::create();

$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);
$app->add(new CorsMiddleware($app->getResponseFactory()));

$routes = require __DIR__ . '/../src/Routes/api.php';
$routes($app);

$app->run();
