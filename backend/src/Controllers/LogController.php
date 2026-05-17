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
}