SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for `log_files`
-- ----------------------------
DROP TABLE IF EXISTS `log_files`;

CREATE TABLE IF NOT EXISTS `log_files` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `file_name` VARCHAR(255) NOT NULL,
    `file_path` VARCHAR(500) NOT NULL,
    `file_modified_at` DATETIME NOT NULL,
    `status` ENUM('active', 'missing') NOT NULL DEFAULT 'active',
    PRIMARY KEY (`id`),
    UNIQUE KEY `log_files_file_path_unique` (`file_path`)
);

SET FOREIGN_KEY_CHECKS = 1;