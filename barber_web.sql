-- MySQL Script generated by MySQL Workbench
-- dom 01 may 2022 19:11:06
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`barbero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`barbero` (
  `barbero_id` VARCHAR(45) NOT NULL,
  `barbero_nombre` VARCHAR(45) NULL,
  `barbero_telefono` VARCHAR(45) NULL,
  `barbero_usuario` VARCHAR(45) NULL,
  `barbero_password` VARCHAR(45) NULL,
  PRIMARY KEY (`barbero_id`),
  UNIQUE INDEX `barbero_nombre_UNIQUE` (`barbero_nombre` ASC) VISIBLE,
  UNIQUE INDEX `barbero_telefono_UNIQUE` (`barbero_telefono` ASC) VISIBLE,
  UNIQUE INDEX `barbero_usuario_UNIQUE` (`barbero_usuario` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`reserva` (
  `reserva_id` VARCHAR(45) NOT NULL,
  `resreva_nombre-cliente` VARCHAR(45) NOT NULL,
  `reserva_email-cliente` VARCHAR(45) NOT NULL,
  `reserva_telefono-cliente` VARCHAR(45) NOT NULL,
  `reserva_datetime` VARCHAR(45) NOT NULL,
  `barbero_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`reserva_id`),
  INDEX `reservas_barbero_idx` (`barbero_id` ASC) VISIBLE,
  CONSTRAINT `barbero_id`
    FOREIGN KEY (`barbero_id`)
    REFERENCES `mydb`.`barbero` (`barbero_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`admin` (
  `admin_id` VARCHAR(45) NOT NULL,
  `admin_usuario` VARCHAR(45) NOT NULL,
  `admin_password` VARCHAR(45) NOT NULL,
  `reserva_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE INDEX `admin_usuario_UNIQUE` (`admin_usuario` ASC) VISIBLE,
  INDEX `reserva_id_idx` (`reserva_id` ASC) VISIBLE,
  UNIQUE INDEX `reserva_id_UNIQUE` (`reserva_id` ASC) VISIBLE,
  CONSTRAINT `reserva_id`
    FOREIGN KEY (`reserva_id`)
    REFERENCES `mydb`.`reserva` (`reserva_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
