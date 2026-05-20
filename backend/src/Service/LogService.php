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
        $files = glob($this->settings->get('logs_directory') . '/*.txt');
        $logs = [];

        foreach ($files as $file) {
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
