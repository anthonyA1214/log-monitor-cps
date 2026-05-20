<?php

declare(strict_types=1);

use LogMonitor\Backend\App\Settings;
use DI\Container;
use Slim\App;

return static function (App $app): void {
    /** @var Container $container */
    $container = $app->getContainer();

    $container->set(Settings::class, function () {
        $settingsPath = __DIR__ . '/settings.json';

        if (!file_exists($settingsPath)) {
            file_put_contents($settingsPath, json_encode([
                "logs_directory" => '',
                "allowed_extensions" => ['txt'],
            ]));
        }

        $data = json_decode(file_get_contents($settingsPath), true);
        $data['settings_path'] = $settingsPath;

        return new Settings($data);
    });
};
