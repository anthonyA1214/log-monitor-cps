<?php

namespace LogMonitor\Backend\Controllers;

use LogMonitor\Backend\Services\LogService;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class LogController
{
    private LogService $logService;

    public function __construct()
    {
        $this->logService = new LogService();
    }

    public function getLogs(Request $request, Response $response): Response
    {
        $logs = $this->logService->getLogFiles();
        $response->getBody()->write(json_encode($logs));
        return $response;
    }

    public function getLogDetailByFileName(Request $request, Response $response, array $args): Response
    {
        $fileName = $args['fileName'];
        $logDetail = $this->logService->getLogDetailByFileName($fileName);

        if ($logDetail === null) {
            $response->getBody()->write(json_encode(['error' => 'Log file not found']));
            return $response->withStatus(404);
        }

        $response->getBody()->write(json_encode($logDetail));
        return $response;
    }
}