SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for `log_files`
-- ----------------------------
DROP TABLE IF EXISTS `log_files`;

CREATE TABLE IF NOT EXISTS `log_files` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255),
    `file_name` VARCHAR(255) NOT NULL,
    `file_path` VARCHAR(500) NOT NULL,
    `file_modified_at` DATETIME NOT NULL,
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `log_files_file_path_unique` (`file_path`)
);

SET FOREIGN_KEY_CHECKS = 1;