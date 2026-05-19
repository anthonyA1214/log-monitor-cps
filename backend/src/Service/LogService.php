<?php

declare(strict_types=1);

namespace LogMonitor\Backend\Service;

class LogService
{
    public function __construct(private \PDO $pdo) {}

    public function insertLog(string $fileName, string $filePath, string $fileModifiedAt): void
    {
        $sql = "
            INSERT INTO log_files (file_name, file_path, file_modified_at, status)
            VALUES (:file_name, :file_path, :file_modified_at, 'active') 
            ON DUPLICATE KEY UPDATE
                file_name = VALUES(file_name),
                file_modified_at = VALUES(file_modified_at),
                status = 'active'
        ";

        $this->pdo->prepare($sql)->execute([
            ':file_name' => $fileName,
            ':file_path' => $filePath,
            ':file_modified_at' => $fileModifiedAt,
        ]);
    }

    public function getLogFiles(): array
    {
        $sql = "
            SELECT file_name, file_modified_at
        ";
        $logs = [];

        foreach ($files as $file) {
            $logs[] = [
                'file_name' => basename($file),
                'date_modified' => date('c', filemtime($file)),
            ];
        }

        return $logs;
    }

    // public function getLogDetailByFileName(string $fileName): ?array
    // {
    //     $filePath = $this->logFolder . '/' . $fileName;

    //     if (!file_exists($filePath)) {
    //         return null;
    //     }

    //     return ['content' => file_get_contents($filePath)];
    // }
}
