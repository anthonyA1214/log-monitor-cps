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

    public function index(Request $request, Response $response): Response
    {
        $logs = $this->logService->getLogFiles();
        $response->getBody()->write(json_encode($logs));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    public function store(Request $request, Response $response): Response
    {
        $body = json_decode($request->getbody()->getContents(), true);

        if (!is_array($body)) {
            $response->getBody()->write(json_encode(['error' => 'Invalid JSON format']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        $errors = [];
        foreach ($body as $index => $log) {
            try {
                v::key('file_name', v::stringType()->notEmpty())
                ->key('file_path', v::stringType()->notEmpty())
                ->key('file_modified_at', v::dateTime()->notEmpty())
                ->assert($log);
            } catch (NestedValidationException $e) {
                $errors[$index] = $e->getMessages();
            }
        }
        
        if (!empty($errors)) {
            $response->getBody()->write(json_encode(['error' => $errors]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        foreach ($body as $log) {
            $this->logService->syncLog(
                $log['file_name'],
                $log['file_path'],
                $log['file_modified_at'],
            );
        }

        $response->getBody()->write(json_encode(['success' => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }


    public function show(Request $request, Response $response, array $args): Response
    {
        $logId = (int) $args['id'];
        $log = $this->logService->getLogContent($logId);

        if ($log === null) {
            $response->getBody()->write(json_encode(['error' => 'Log not found']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        $response->getBody()->write(json_encode($log));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}
