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

    public function markInactive(array $activeFiles): void
    {
        if (empty($activeFiles)) {
            // If no active files, mark all as inactive
            $sql = "UPDATE log_files SET status = 'inactive'";
            $this->pdo->exec($sql);
            return;
        }

        // Mark files not in the active list as inactive
        $placeholders = implode(',', array_fill(0, count($activeFiles), '?'));
        $sql = "UPDATE log_files SET status = 'inactive' WHERE file_path NOT IN ($placeholders)";
        $this->pdo->prepare($sql)->execute($activeFiles);
    }

    public function deactivateOldLogs(): void
    {
        $sql = "UPDATE log_files lf 
                INNER JOIN (
                    SELECT
                        SUBSTRING_INDEX(file_name, '_log-', 1) AS prefix,
                        MAX(SUBSTRING_INDEX(SUBSTRING_INDEX(file_name, '_log-', -1), '.txt', 1)) AS latest_date
                    FROM log_files
                    WHERE status = 'active'
                    GROUP BY prefix
                ) AS latest ON SUBSTRING_INDEX(lf.file_name, '_log-', 1) = latest.prefix
                SET lf.status = 'inactive'
                WHERE lf.status = 'active' AND SUBSTRING_INDEX(SUBSTRING_INDEX(lf.file_name, '_log-', -1), '.txt', 1) < latest.latest_date";
        $this->pdo->exec($sql);
    }

    public function findCurrentLogs(): array
    {
        $sql = "SELECT lf.* FROM log_files lf
                INNER JOIN (
                    SELECT
                        SUBSTRING_INDEX(file_name, '_log-', 1) AS prefix,
                        MAX(CASE 
                            WHEN DATE(file_modified_at) = CURDATE() THEN file_modified_at 
                            ELSE NULL 
                        END) AS today_modified_at,
                        MAX(file_modified_at) AS latest_modified_at
                    FROM log_files
                    WHERE status = 'active'
                    GROUP BY prefix
                ) AS latest ON SUBSTRING_INDEX(lf.file_name, '_log-', 1) = latest.prefix
                AND lf.file_modified_at = COALESCE(latest.today_modified_at, latest.latest_modified_at)
                WHERE lf.status = 'active'";
        
        return $this->pdo->query($sql)->fetchAll();
    }

    public function updateModifiedAt(int $id, string $fileModifiedAt): void
    {
        $sql = "UPDATE log_files SET file_modified_at = :file_modified_at WHERE id = :id";

        $this->pdo->prepare($sql)->execute([
            ':file_modified_at' => $fileModifiedAt,
            ':id' => $id,
        ]);
    }

    public function markInactiveById(int $id): void
    {
        $sql = "UPDATE log_files SET status = 'inactive' WHERE id = :id";
        $this->pdo->prepare($sql)->execute([
            ':id' => $id,
        ]);
    }

    public function findById(int $id): ?array
    {
        $sql = "SELECT id, file_name, file_path, file_modified_at FROM log_files WHERE id = :id";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':id' => $id]);
        return $stmt->fetch() ?: null;
    }
}
