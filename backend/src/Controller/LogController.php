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
            $this->logService->insertLog(
                $log['file_name'],
                $log['file_path'],
                $log['file_modified_at'],
            );
        }

        $response->getBody()->write(json_encode(['success' => true]));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // public function getLogs(Request $request, Response $response): Response
    // {
    //     $logs = $this->logService->getLogFiles();
    //     $response->getBody()->write(json_encode($logs));
    //     return $response;
    // }

    // public function getLogDetailByFileName(Request $request, Response $response, array $args): Response
    // {
    //     $fileName = $args['fileName'];
    //     $logDetail = $this->logService->getLogDetailByFileName($fileName);

    //     if ($logDetail === null) {
    //         $response->getBody()->write(json_encode(['error' => 'Log file not found']));
    //         return $response->withStatus(404);
    //     }

    //     $response->getBody()->write(json_encode($logDetail));
    //     return $response;
    // }
}
