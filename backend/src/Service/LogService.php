<?php

declare(strict_types=1);

namespace LogMonitor\Backend\Service;

use LogMonitor\Backend\App\Settings;
use LogMonitor\Backend\Repository\LogRepository;

final class LogService
{
    public function __construct(
        private Settings $settings,
        private LogRepository $logRepository,
        private \PDO $pdo,
    ) {
    }

    public function addLogFiles(array $logs): array
    {
        $createdLogs = [];

        $this->pdo->beginTransaction();

        try {
            foreach ($logs as $log) {
                $fileModifiedAt = \date('Y-m-d H:i:s', \filemtime($log['file_path']));

                $createdLogs[] = $this->logRepository->insert(
                    $log['title'],
                    $log['file_name'],
                    $log['file_path'],
                    $fileModifiedAt,
                );
            }

            $this->pdo->commit();
        } catch (\Exception $e) {
            $this->pdo->rollBack();

            throw $e;
        }

        return $createdLogs;
    }

    public function syncLogs(): void
    {
        $logsDir      = $this->settings->get('logs_directory');
        $commonPrefix = $this->settings->get('common_prefix') ?: [];

        $files       = \glob($logsDir . '/*.txt');
        $activeFiles = [];

        foreach ($files as $file) {
            $fileName = \basename($file);
            if (!self::isValidLogFile($fileName)) {
                continue; // Skip files that don't match the expected pattern
            }

            if (!empty($commonPrefix)) {
                $matched = false;

                foreach ($commonPrefix as $prefix) {
                    if (\str_starts_with($fileName, $prefix)) {
                        $matched = true;

                        break;
                    }
                }

                if (!$matched) {
                    continue; // Skip files that don't match any prefix
                }
            }

            $filePath       = \realpath($file);
            $fileModifiedAt = \date('Y-m-d H:i:s', \filemtime($file));

            $this->logRepository->upsert($fileName, $filePath, $fileModifiedAt);
            $activeFiles[] = $filePath;
        }

        $this->logRepository->markInactive($activeFiles);
        $this->logRepository->deactivateOldLogs();
    }

    public function getLogFiles(): array
    {
        $logs   = $this->logRepository->findCurrentLogs();
        $result = [];
        foreach ($logs as $log) {
            $filePath = $log['file_path'];

            if (!\file_exists($filePath)) {
                $this->logRepository->markInactiveById((int) $log['id']);

                continue; // Skip files that no longer exist
            }

            $fileModifiedAt = \date('Y-m-d H:i:s', \filemtime($filePath));

            if ($fileModifiedAt !== $log['file_modified_at']) {
                $this->logRepository->updateModifiedAt((int) $log['id'], $fileModifiedAt);
            }

            $result[] = $log;
        }

        return $result;
    }

    public function getLogInfo(string $logId): ?array
    {
        // Implementation for getting log info by log ID
        $log = $this->logRepository->findById((int) $logId);

        if (!$log) {
            return null;
        }

        $filePath = $log['file_path'];

        if (!\file_exists($filePath)) {
            return null;
        }

        $content = \file_get_contents($filePath);

        return [
            'id'               => $log['id'],
            'title'            => $log['title'],
            'file_name'        => $log['file_name'],
            'file_path'        => $log['file_path'],
            'file_modified_at' => \date('c', \filemtime($filePath)),
            'source'           => $log['source'],
            'status'           => $log['status'],
            'content'          => $content,
        ];
    }

    public function updateLogInfo(string $logId, array $data): ?array
    {
        // Implementation for updating log info (e.g., title) by log ID
        $log = $this->logRepository->findById((int) $logId);

        if (!$log) {
            return null;
        }

        $this->logRepository->updateLogInfo((int) $logId, $data);

        return $this->getLogInfo($logId);
    }

    private static function isValidLogFile(string $fileName): bool
    {
        return (bool) \preg_match('/^.+_\d{8}\.txt$/', $fileName);
    }
}
