-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Car_Dealer
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Car_Dealer
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Car_Dealer` DEFAULT CHARACTER SET utf8 ;
USE `Car_Dealer` ;

-- -----------------------------------------------------
-- Table `Car_Dealer`.`Salesperson`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Car_Dealer`.`Salesperson` (
  `SSN` CHAR(10) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `belong` VARCHAR(45) NULL,
  PRIMARY KEY (`SSN`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Car_Dealer`.`Customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Car_Dealer`.`Customer` (
  `SSN` CHAR(10) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NULL,
  `reserve_count` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`SSN`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Car_Dealer`.`Car`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Car_Dealer`.`Car` (
  `Vin` CHAR(17) NOT NULL,
  `model` VARCHAR(45) NOT NULL,
  `manufacturer` VARCHAR(45) NULL,
  `fuel_efficiency` FLOAT NULL,
  `price` INT NOT NULL,
  `c_SSN` CHAR(10) NULL,
  `s_SSN` CHAR(10) NULL,
  `reserve_date` DATE NULL,
  `purchase_date` DATE NULL,
  PRIMARY KEY (`Vin`),
  INDEX `fk_Car_Salesperson_idx` (`s_SSN` ASC) VISIBLE,
  INDEX `fk_Car_Customer1_idx` (`c_SSN` ASC) VISIBLE,
  CONSTRAINT `fk_Car_Salesperson`
    FOREIGN KEY (`s_SSN`)
    REFERENCES `Car_Dealer`.`Salesperson` (`SSN`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Car_Customer1`
    FOREIGN KEY (`c_SSN`)
    REFERENCES `Car_Dealer`.`Customer` (`SSN`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Car_Dealer`.`Sedan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Car_Dealer`.`Sedan` (
  `Vin` CHAR(17) NOT NULL,
  `seats_num` INT NULL,
  `doors_num` INT NULL,
  `color` VARCHAR(45) NULL,
  PRIMARY KEY (`Vin`),
  CONSTRAINT `fk_Sedan_Car1`
    FOREIGN KEY (`Vin`)
    REFERENCES `Car_Dealer`.`Car` (`Vin`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Car_Dealer`.`SUV`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Car_Dealer`.`SUV` (
  `Vin` CHAR(17) NOT NULL,
  `seats_num` INT NULL,
  `size` VARCHAR(45) NULL,
  `color` VARCHAR(45) NULL,
  PRIMARY KEY (`Vin`),
  CONSTRAINT `fk_SUV_Car1`
    FOREIGN KEY (`Vin`)
    REFERENCES `Car_Dealer`.`Car` (`Vin`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Car_Dealer`.`Bus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Car_Dealer`.`Bus` (
  `Vin` CHAR(17) NOT NULL,
  `seats_num` INT NULL,
  `floors_num` INT NULL,
  PRIMARY KEY (`Vin`),
  CONSTRAINT `fk_Bus_Car1`
    FOREIGN KEY (`Vin`)
    REFERENCES `Car_Dealer`.`Car` (`Vin`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Car_Dealer`.`Truck`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Car_Dealer`.`Truck` (
  `Vin` CHAR(17) NOT NULL,
  `tonnage` FLOAT NULL,
  `wheels_num` INT NULL,
  `height` FLOAT NULL,
  PRIMARY KEY (`Vin`),
  CONSTRAINT `fk_Truck_Car1`
    FOREIGN KEY (`Vin`)
    REFERENCES `Car_Dealer`.`Car` (`Vin`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Car_Dealer`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Car_Dealer`.`User` (
  `id` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `role` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO Salesperson (SSN, name, belong) VALUES ("1234567890", "홍길동", "HYUNDAI");
INSERT INTO Salesperson (SSN, name, belong) VALUES ("2345678901", "아무개", "KIA");
INSERT INTO Salesperson (SSN, name, belong) VALUES ("3456789012", "이순신", "BENZ");
INSERT INTO Salesperson (SSN, name, belong) VALUES ("4567890123", "김세종", "VOLVO");
INSERT INTO Salesperson (SSN, name, belong) VALUES ("5678901234", "박가나", "SSANGYONG");
INSERT INTO Salesperson (SSN, name, belong) VALUES ("6789012345", "최다라", "HYUNDAI");
INSERT INTO Salesperson (SSN, name, belong) VALUES ("7890123456", "손마바", "BMW");
INSERT INTO Salesperson (SSN, name, belong) VALUES ("8901234567", "박사아", "TESLA");
INSERT INTO Salesperson (SSN, name, belong) VALUES ("9012345678", "조파하", "CHEVORLET");
INSERT INTO Salesperson (SSN, name, belong) VALUES ("0123456789", "곽자카", "TOYOTA");

INSERT INTO Customer (SSN, name, address, reserve_count) VALUES ("1111111111", "김고객", "수원시", 0);
INSERT INTO Customer (SSN, name, address, reserve_count) VALUES ("2222222222", "이고객", "인천시", 0);
INSERT INTO Customer (SSN, name, address, reserve_count) VALUES ("3333333333", "최고객", "서울시", 0);
INSERT INTO Customer (SSN, name, address, reserve_count) VALUES ("4444444444", "박고객", "서울시", 0);
INSERT INTO Customer (SSN, name, address, reserve_count) VALUES ("5555555555", "한고객", "인천시", 0);
INSERT INTO Customer (SSN, name, address, reserve_count) VALUES ("6666666666", "조고객", "강릉시", 0);
INSERT INTO Customer (SSN, name, address, reserve_count) VALUES ("7777777777", "장고객", "성남시", 0);
INSERT INTO Customer (SSN, name, address, reserve_count) VALUES ("8888888888", "곽고객", "용인시", 0);
INSERT INTO Customer (SSN, name, address, reserve_count) VALUES ("9999999999", "정고객", "안산시", 0);
INSERT INTO Customer (SSN, name, address, reserve_count) VALUES ("9876543210", "유고객", "시흥시", 0);

INSERT INTO User (id, password, role) VALUES ("1111111111", "pw1111", "customer");
INSERT INTO User (id, password, role) VALUES ("2222222222", "pw2222", "customer");
INSERT INTO User (id, password, role) VALUES ("3333333333", "pw3333", "customer");
INSERT INTO User (id, password, role) VALUES ("4444444444", "pw4444", "customer");
INSERT INTO User (id, password, role) VALUES ("5555555555", "pw5555", "customer");
INSERT INTO User (id, password, role) VALUES ("6666666666", "pw6666", "customer");
INSERT INTO User (id, password, role) VALUES ("7777777777", "pw7777", "customer");
INSERT INTO User (id, password, role) VALUES ("8888888888", "pw8888", "customer");
INSERT INTO User (id, password, role) VALUES ("9999999999", "pw9999", "customer");
INSERT INTO User (id, password, role) VALUES ("9876543210", "pw9876", "customer");
INSERT INTO User (id, password, role) VALUES ("admin", "admin", "admin");

create view getSedan as select car.vin, model, manufacturer, fuel_efficiency, price, seats_num, doors_num, color, s_SSN 
    from car, sedan where sedan.Vin = car.Vin and car.reserve_date is NULL limit 3;
create view getSUV as select car.vin, model, manufacturer, fuel_efficiency, price, seats_num, size, color, s_SSN 
    from car, suv where suv.Vin = car.Vin and car.reserve_date is NULL limit 3;
create view getBus as select car.vin, model, manufacturer, fuel_efficiency, price, seats_num, floors_num, s_SSN 
    from car, bus where bus.Vin = car.Vin and car.reserve_date is NULL limit 3;
create view getTruck as select car.vin, model, manufacturer, fuel_efficiency, price, tonnage, wheels_num, height, s_SSN 
    from car, truck where truck.Vin = car.Vin and car.reserve_date is NULL limit 3;

create view getSedanAdmin as select car.vin, model, manufacturer, fuel_efficiency, price, seats_num, doors_num, color, s_SSN 
    from car, sedan where sedan.Vin = car.Vin limit 3;
create view getSUVAdmin as select car.vin, model, manufacturer, fuel_efficiency, price, seats_num, size, color, s_SSN 
    from car, suv where suv.Vin = car.Vin limit 3;
create view getBusAdmin as select car.vin, model, manufacturer, fuel_efficiency, price, seats_num, floors_num, s_SSN 
    from car, bus where bus.Vin = car.Vin limit 3;
create view getTruckAdmin as select car.vin, model, manufacturer, fuel_efficiency, price, tonnage, wheels_num, height, s_SSN 
    from car, truck where truck.Vin = car.Vin limit 3;

create view getSedanAdminReserved as select car.vin, model, manufacturer, fuel_efficiency, price, seats_num, doors_num, color, s_SSN, c_SSN,DATE_FORMAT(reserve_date,'%Y-%m-%d') as reserve_date 
    from car, sedan where sedan.Vin = car.Vin and car.reserve_date is not NULL and car.purchase_date is NULL limit 3;
create view getSUVAdminReserved as select car.vin, model, manufacturer, fuel_efficiency, price, seats_num, size, color, s_SSN, c_SSN,DATE_FORMAT(reserve_date,'%Y-%m-%d') as reserve_date 
    from car, suv where suv.Vin = car.Vin and car.reserve_date is not NULL and car.purchase_date is NULL limit 3;
create view getBusAdminReserved as select car.vin, model, manufacturer, fuel_efficiency, price, seats_num, floors_num, s_SSN, c_SSN,DATE_FORMAT(reserve_date,'%Y-%m-%d') as reserve_date 
    from car, bus where bus.Vin = car.Vin and car.reserve_date is not NULL and car.purchase_date is NULL limit 3;
create view getTruckAdminReserved as select car.vin, model, manufacturer, fuel_efficiency, price, tonnage, wheels_num, height, s_SSN, c_SSN, DATE_FORMAT(reserve_date,'%Y-%m-%d') as reserve_date 
    from car, truck where truck.Vin = car.Vin and car.reserve_date is not NULL and car.purchase_date is NULL limit 3;

create index index_reserveDate on car(reserve_date) using btree;
create index index_purchaseDate on car(purchase_date) using btree;
create index index_cSSN on car(c_ssn) using btree;
