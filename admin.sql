-- Admin table SQL schema for MySQL
-- Import this file into phpMyAdmin to create the Admin table
-- Make sure you're using the database specified in your DATABASE_URL

CREATE TABLE IF NOT EXISTS `Admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(191) NOT NULL,
  `password` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Admin_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

