-- Event table SQL schema for MySQL
-- Import this file into phpMyAdmin to create the event table
-- Make sure you're using the database specified in your DATABASE_URL

CREATE TABLE IF NOT EXISTS `Event` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  `date` DATETIME(3) NOT NULL,
  `time` VARCHAR(191) NOT NULL,
  `location` VARCHAR(191) NOT NULL,
  `image` VARCHAR(191) NULL,
  `category` VARCHAR(191) NOT NULL,
  `capacity` INT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

