<?php

namespace LogMonitor\Backend\Services;

class LogService
{
    private string $logFolder;

    public function __construct()
    {
        $this->logFolder = $_ENV['LOG_FOLDER'] ?? './logs';
    }

    public function getLogFiles(): array
    {
        $files = glob($this->logFolder . '/*.txt');
        $logs = [];

        foreach ($files as $file) {
            $logs[] = [
                'file_name' => basename($file),
                'date_modified' => date('c', filemtime($file)),
            ];
        }

        return $logs;
    }
}