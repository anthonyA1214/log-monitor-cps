<?php

declare(strict_types=1);

use DI\Container;
use LogMonitor\Backend\Middleware\CorsMiddleware;
use Slim\Factory\AppFactory;

$baseDir = dirname(__DIR__, 2);
require_once $baseDir . '/vendor/autoload.php';
require_once __DIR__ . '/Config.php';

$dotenv = Dotenv\Dotenv::createImmutable($baseDir);
$envFile = $baseDir . '/.env';
if (file_exists($envFile)) {
    $dotenv->load();
}
$dotenv->required(['DB_HOST', 'DB_USER', 'DB_PASS', 'DB_NAME', 'DB_PORT']);

date_default_timezone_set(TIMEZONE);

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
