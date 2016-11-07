
-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'book'
--
-- ---

DROP TABLE IF EXISTS `book`;

CREATE TABLE `book` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `author_id` INTEGER NULL DEFAULT NULL,
  `genre_id` INTEGER NULL DEFAULT NULL,
  `description_id` INTEGER NULL DEFAULT NULL,
  `image_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'author'
--
-- ---

DROP TABLE IF EXISTS `author`;

CREATE TABLE `author` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `author_name` CHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'genre'
--
-- ---

DROP TABLE IF EXISTS `genre`;

CREATE TABLE `genre` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `genre_name` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'description'
--
-- ---

DROP TABLE IF EXISTS `description`;

CREATE TABLE `description` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `description_field` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'image'
--
-- ---

DROP TABLE IF EXISTS `image`;

CREATE TABLE `image` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `img_url` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `book` ADD FOREIGN KEY (author_id) REFERENCES `author` (`id`);
ALTER TABLE `book` ADD FOREIGN KEY (genre_id) REFERENCES `genre` (`id`);
ALTER TABLE `book` ADD FOREIGN KEY (description_id) REFERENCES `description` (`id`);
ALTER TABLE `book` ADD FOREIGN KEY (image_id) REFERENCES `image` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `book` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `author` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `genre` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `description` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `image` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `book` (`id`,`author_id`,`genre_id`,`description_id`,`image_id`) VALUES
-- ('','','','','');
-- INSERT INTO `author` (`id`,`author_name`) VALUES
-- ('','');
-- INSERT INTO `genre` (`id`,`genre_name`) VALUES
-- ('','');
-- INSERT INTO `description` (`id`,`description_field`) VALUES
-- ('','');
-- INSERT INTO `image` (`id`,`img_url`) VALUES
-- ('','');
