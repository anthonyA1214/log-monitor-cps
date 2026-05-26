<?php

declare(strict_types=1);

namespace LogMonitor\Backend\Controller;

use LogMonitor\Backend\Service\LogService;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Respect\Validation\Validator as v;
use Respect\Validation\Exceptions\NestedValidationException;

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
        $logId = $args['logId'];

        $log = $this->logService->getLogInfo($logId);

        if ($log === null) {
            $response->getBody()->write(json_encode(['error' => 'Log not found']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        $response->getBody()->write(json_encode($log));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    public function update(Request $request, Response $response, array $args): Response
    {
        $logId = $args['logId'];
        $data = $request->getParsedBody();
        
        try {
            v::arrayType()
                ->key('title', v::stringType())
                ->key('file_name', v::stringType()->notEmpty())
                ->key('file_path', v::stringType()->notEmpty())
                ->assert($data);
        } catch (NestedValidationException $e) {
            $response->getBody()->write(json_encode([
                'error' => 'Validation failed',
                'messages' => $e->getMessages(),
            ]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(422);
        }

        $this->logService->updateLogInfo($logId, $data);

        $response->getBody()->write(json_encode(['message' => 'Log info updated successfully']));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}
