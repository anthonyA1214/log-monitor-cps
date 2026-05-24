<?php

declare(strict_types=1);

namespace LogMonitor\Backend\Controller;

use LogMonitor\Backend\Service\LogService;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class LogController
{
    public function __construct(private LogService $logService) {}

    public function sync(Request $request, Response $response): Response
    {
        $this->logService->syncLogs();
        $response->getBody()->write(json_encode(['message' => 'Logs synchronized successfully']));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    public function index(Request $request, Response $response): Response
    {
        $logs = $this->logService->getLogFiles();
        $response->getBody()->write(json_encode($logs));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    public function show(Request $request, Response $response, array $args): Response
    {
        $fileName = $args['fileName'];

        $log = $this->logService->getLogContent($fileName);

        if ($log === null) {
            $response->getBody()->write(json_encode(['error' => 'Log not found']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        $response->getBody()->write(json_encode($log));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}
