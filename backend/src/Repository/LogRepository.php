<?php

declare(strict_types=1);

namespace LogMonitor\Backend\Repository;

class LogRepository
{
    public function __construct(private \PDO $pdo) {}

    public function upsert(string $fileName, string $filePath, string $fileModifiedAt): void
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

    public function findAll(): array
    {
        $sql = "SELECT id, file_name, file_modified_at FROM log_files WHERE status = 'active'";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll();
    }

    public function findPathById(int $id): ?string
    {
        $sql = "SELECT file_path FROM log_files WHERE id = :id AND status = 'active'";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':id' => $id]);
        
        return $stmt->fetch()['file_path'] ?? null;
    }
}