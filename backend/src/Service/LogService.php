<?php

declare(strict_types=1);

namespace LogMonitor\Backend\Service;

use LogMonitor\Backend\App\Settings;

class LogService
{
    public function __construct(private Settings $settings) {}

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
        return ['content' => $content];
    }
}
