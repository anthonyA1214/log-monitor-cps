<?php

declare(strict_types=1);

use DI\Container;
use LogMonitor\Backend\Middleware\CorsMiddleware;
use Slim\Factory\AppFactory;

$baseDir = dirname(__DIR__, 2);
require_once $baseDir . '/vendor/autoload.php';
require_once __DIR__ . '/Config.php';

$container = new Container();
AppFactory::setContainer($container);
$app = AppFactory::create();

$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);
$app->add(new CorsMiddleware($app->getResponseFactory()));

(require __DIR__ . '/Dependencies.php')($app);
(require __DIR__ . '/Routes.php')($app);

return $app;
