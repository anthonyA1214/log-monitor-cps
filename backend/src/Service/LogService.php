<?php

declare(strict_types=1);

namespace LogMonitor\Backend\Service;

use LogMonitor\Backend\App\Settings;
use LogMonitor\Backend\Repository\LogRepository;

class LogService
{
    public function __construct(private Settings $settings, private LogRepository $logRepository) {}

    public function syncLogs(): void
    {
        $logsDir = $this->settings->get('logs_directory');
        $commonPrefix = $this->settings->get('common_prefix') ?: [];

        $files = glob($logsDir . '/*.txt');
        $activeFiles = [];

        foreach ($files as $file) {
            $fileName = basename($file);

            if (!$this->isValidLogFile($fileName)) {
                continue; // Skip files that don't match the expected pattern
            }

            if (!empty($commonPrefix)) {
                $matched = false;
                foreach ($commonPrefix as $prefix) {
                    if (str_starts_with($fileName, $prefix)) {
                        $matched = true;
                        break;
                    }
                }
                if (!$matched) {
                    continue; // Skip files that don't match any prefix
                }
            }

            $filePath = realpath($file);
            $fileModifiedAt = date('Y-m-d H:i:s', filemtime($file));

            $this->logRepository->upsert($fileName, $filePath, $fileModifiedAt);
            $activeFiles[] = $filePath;
        }

        $this->logRepository->markInactive($activeFiles);
    }

    public function getLogFiles(): array
    {
        // Implementation for getting log files
        $logsDir = $this->settings->get('logs_directory');
        $commonPrefix = $this->settings->get('common_prefix') ?: [];
        $logs = [];

        $files = glob($logsDir . '/*.txt');

        foreach ($files as $file) {
            $fileName = basename($file);

            // If common prefixes are defined, filter files accordingly
            if (!empty($commonPrefix)) {
                $matched = false;
                foreach ($commonPrefix as $prefix) {
                    if (str_starts_with($fileName, $prefix)) {
                        $matched = true;
                        break;
                    }
                }

                if (!$matched) {
                    continue; // Skip files that don't match any prefix
                }
            }

            $logs[] = [
                'file_name' => basename($file),
                'file_modified_at' => date('c', filemtime($file)),
            ];
        }

        return $logs;
    }

    public function getLogContent(string $fileName): ?array
    {
        // Implementation for getting log content by file name
        $filePath = $this->settings->get('logs_directory') . '/' . $fileName;

        if (!file_exists($filePath)) {
            return null;
        }

        $content = file_get_contents($filePath);


        return [
            'file_modified_at' => date('c', filemtime($filePath)),
            'content' => $content,
        ];
    }

    private function isValidLogFile(string $fileName): bool
    {
        return (bool) preg_match('/^[a-zA-Z]+_log-\d{4}-\d{2}-\d{2}\.txt$/', $fileName);
    }
}
