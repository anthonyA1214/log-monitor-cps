<?php

declare(strict_types=1);

use DI\Container;
use LogMonitor\Backend\App\Settings;
use Slim\App;

return static function (App $app): void {
    /** @var Container $container */
    $container = $app->getContainer();

    $container->set(Settings::class, static function () {
        $settingsPath = __DIR__ . '/settings.json';

        if (!\file_exists($settingsPath)) {
            \file_put_contents($settingsPath, \json_encode([
                'logs_directory'     => '',
                'allowed_extensions' => ['txt'],
            ]));
        }

        $data                  = \json_decode(\file_get_contents($settingsPath), true);
        $data['settings_path'] = $settingsPath;

        return new Settings($data);
    });

    $container->set(PDO::class, static function () {
        $dsn = \sprintf(
            'mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
            $_SERVER['DB_HOST'],
            $_SERVER['DB_PORT'],
            $_SERVER['DB_NAME'],
        );

        $pdo = new PDO($dsn, $_SERVER['DB_USER'], $_SERVER['DB_PASS']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

        return $pdo;
    });
};
