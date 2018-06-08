DROP DATABASE IF EXISTS world_cup;
CREATE DATABASE world_cup;
USE world_cup;

CREATE TABLE `teams` (
  `id` Int( 11 ) AUTO_INCREMENT NOT NULL,
  `name` VARCHAR ( 255 ) NOT NULL,
  `emoji` VARCHAR ( 255 ) NOT NULL,
  `emojiString` VARCHAR ( 255 ) NOT NULL,
  PRIMARY KEY ( `id` ) 
);

CREATE TABLE `stadiums` (
  `id` Int( 11 ) AUTO_INCREMENT NOT NULL,
  `name` VARCHAR( 255) NOT NULL,
  `city` VARCHAR( 255 ) NOT NULL,
  `lat`  FLOAT ( 11 ) NOT NULL,
  `lng` FLOAT ( 11 ) NOT NULL,
  `image` VARCHAR ( 255 ) NOT NULL,

  PRIMARY KEY ( `id` ) 
);

CREATE TABLE `brackets` (
  `id` Int( 11 ) AUTO_INCREMENT NOT NULL,
  `group` VARCHAR( 255) NOT NULL,
  `date` VARCHAR( 255 ) NOT NULL,
  `stadium` VARCHAR ( 255 ) NOT NULL,
  `channels` VARCHAR ( 255 ) NOT NULL,
  `matchday` VARCHAR ( 255 ) NOT NULL,

  PRIMARY KEY ( `id` ) 
);
