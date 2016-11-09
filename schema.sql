-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
      -- Table "book"
--
-- ---

CREATE TABLE "book" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR NULL DEFAULT NULL,
  "description" VARCHAR NULL DEFAULT NULL,
  "image_url" VARCHAR NULL DEFAULT NULL
);

-- ---
-- Table "author"
--
-- ---

CREATE TABLE "author" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR NULL DEFAULT NULL
);

-- ---
-- Table "genre"
--
-- ---

CREATE TABLE "genre" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR NULL DEFAULT NULL
);

-- ---
-- Table "book_author"
--
-- ---

CREATE TABLE "book_author" (
  "id" SERIAL PRIMARY KEY,
  "book_id" INTEGER NULL DEFAULT NULL,
  "author_id" INTEGER NULL DEFAULT NULL
);

-- ---
-- Table "book_genre"
--
-- ---

CREATE TABLE "book_genre" (
  "id" SERIAL PRIMARY KEY,
  "book_id" INTEGER NULL DEFAULT NULL,
  "genre_id" INTEGER NULL DEFAULT NULL
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE "book_author" ADD FOREIGN KEY (book_id) REFERENCES "book" ("id");
ALTER TABLE "book_author" ADD FOREIGN KEY (author_id) REFERENCES "author" ("id");
ALTER TABLE "book_genre" ADD FOREIGN KEY (genre_id) REFERENCES "genre" ("id");
ALTER TABLE "book_genre" ADD FOREIGN KEY (book_id) REFERENCES "book" ("id");

-- ---
-- Table Properties
-- ---

-- ALTER TABLE "book" ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE "author" ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE "genre" ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE "book_author" ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE "book_genre" ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

 INSERT INTO "book" ("id","description","image_url") VALUES
 ("1","this is a book","www.google.com");
 INSERT INTO "author" ("id","author_name") VALUES
 ("1","Karl Marx");
 INSERT INTO "genre" ("id","genre_name") VALUES
 ("1","Communist Manifesto");
 INSERT INTO "book_author" ("id","book_id","author_id") VALUES
 ("1","1","1");
 INSERT INTO "book_genre" ("id","book_id","genre_id") VALUES
 ("1","1","1");
