<?php

declare(strict_types=1);

namespace LogMonitor\Backend\Controller;

use LogMonitor\Backend\Service\SettingsService;
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use Respect\Validation\Validator as v;
use Respect\Validation\Exceptions\NestedValidationException;

class SettingsController
{
    public function __construct(private SettingsService $settingsService) {}

    public function index(Request $request, Response $response): Response
    {
        $settings = $this->settingsService->getSettings();
        $response->getBody()->write(json_encode($settings));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    public function update(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();

        try {
            v::arrayType()
                ->key('logs_directory', v::stringType()->notEmpty())
                ->assert($data);
        } catch (NestedValidationException $e) {
            $response->getBody()->write(json_encode([
                'error' => 'Validation failed',
                'messages' => $e->getMessages(),
            ]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(422);
        }

        $updatedSettings = $this->settingsService->updateSettings($data);
        $response->getBody()->write(json_encode($updatedSettings));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}
