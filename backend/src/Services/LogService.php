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

    public function getLogDetailByFileName(string $fileName)
    {
        $filePath = $this->logFolder . '/' . $fileName;

        if (!file_exists($filePath)) {
            return null;
        }

        $content = file_get_contents($filePath);
        return ['content' => $content];
    }
}