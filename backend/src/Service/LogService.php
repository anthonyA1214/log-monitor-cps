<?php

declare(strict_types=1);

namespace LogMonitor\Backend\Service;

use LogMonitor\Backend\Repository\LogRepository;

class LogService
{
    public function __construct(private LogRepository $logRepository) {}

    public function syncLog(string $fileName, string $filePath, string $fileModifiedAt): void
    {
        $this->logRepository->upsert($fileName, $filePath, $fileModifiedAt);
    }

    public function getLogFiles(): array
    {
        $logs = $this->logRepository->findAll();

        return $logs;
    }

    public function getLogContent(int $logId): ?array
    {
        $filePath = $this->logRepository->findPathById($logId);

        if ($filePath === null || !file_exists($filePath)) {
            return null;
        }

        return ['content' => file_get_contents($filePath)];
    }
}
