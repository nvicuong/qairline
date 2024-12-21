-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: localhost    Database: Qairline
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aircrafts`
--

DROP TABLE IF EXISTS `aircrafts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aircrafts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `manufacturer_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `aircraft_type` varchar(255) DEFAULT NULL,
  `registration_code` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `business_seat` bigint NOT NULL,
  `economy_seat` bigint NOT NULL,
  `year_of_manufacture` bigint DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `aircrafts_manufacturer_id_foreign` (`manufacturer_id`),
  CONSTRAINT `aircrafts_manufacturer_id_foreign` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aircrafts`
--

LOCK TABLES `aircrafts` WRITE;
/*!40000 ALTER TABLE `aircrafts` DISABLE KEYS */;
INSERT INTO `aircrafts` VALUES (1,1,'Boeing737','Boeing 737','VSJ123','ACTIVE',50,120,2004,'John Smith'),(2,2,'Airbus A320','Airbus A320','JSK456','ACTIVE',60,150,2010,'Maria Garcia'),(3,3,'Boeing 777','Boeing 777','TYU789','ACTIVE',80,200,2015,'David Johnson'),(4,4,'Embraer E190','Embraer E190','KJS123','ACTIVE',40,100,2017,'Sophia Williams'),(5,5,'Lockheed Martin C-130','Lockheed Martin C-130','LKM456','ACTIVE',50,130,2008,'James Brown'),(6,6,'Cessna Citation X','Cessna Citation X','CIT123','ACTIVE',20,80,2012,'Isabella Martinez'),(7,7,'Bombardier CRJ900','Bombardier CRJ900','BOM789','ACTIVE',40,110,2010,'Michael Davis'),(8,8,'Gulfstream G650','Gulfstream G650','GUL123','ACTIVE',20,50,2018,'Emma Taylor'),(9,9,'Dassault Falcon 7X','Dassault Falcon 7X','DAS456','ACTIVE',25,70,2013,'William Anderson'),(10,10,'Sukhoi Superjet 100','Sukhoi Superjet 100','SUK123','ACTIVE',50,140,2011,'Olivia Thomas'),(11,1,'Boeing 747','Boeing 747','B74X89','ACTIVE',100,250,2000,'John Smith'),(12,2,'Airbus A380','Airbus A380','A380X1','ACTIVE',200,500,2013,'Maria Garcia'),(13,3,'Boeing 767','Boeing 767','B767D2','ACTIVE',90,220,2007,'David Johnson'),(14,4,'Embraer E175','Embraer E175','EMB175C','ACTIVE',30,90,2016,'Sophia Williams'),(15,5,'Lockheed Martin L-1011','Lockheed Martin L-1011','L1011X','ACTIVE',70,200,1988,'James Brown'),(16,6,'Cessna Caravan','Cessna Caravan','CAV123','ACTIVE',10,30,2005,'Isabella Martinez'),(17,7,'Bombardier Global 6000','Bombardier Global 6000','BOM6000','ACTIVE',25,60,2014,'Michael Davis'),(18,8,'Gulfstream G450','Gulfstream G450','GUL450','ACTIVE',15,40,2010,'Emma Taylor'),(19,9,'Dassault Falcon 900','Dassault Falcon 900','DAS900','ACTIVE',30,80,2006,'William Anderson'),(20,1,'Boeing 737 Max','Boeing 737 Max','B737MX','ACTIVE',70,180,2018,'John Smith'),(21,2,'Airbus A350','Airbus A350','A350X2','ACTIVE',120,320,2019,'Maria Garcia'),(22,3,'Boeing 787','Boeing 787','B787J3','ACTIVE',100,250,2014,'David Johnson'),(23,4,'Airbus A220','Airbus A220','A220SW','ACTIVE',60,150,2017,'Sophia Williams'),(24,5,'Boeing 757','Boeing 757','B757JB','ACTIVE',90,210,2003,'James Brown'),(25,6,'Embraer E145','Embraer E145','EMB145IM','ACTIVE',20,50,2000,'Isabella Martinez'),(26,1,'MH370','Boeing 747','MH370','ACTIVE',50,200,2010,'John Smith');
/*!40000 ALTER TABLE `aircrafts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `airports`
--

DROP TABLE IF EXISTS `airports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airports` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `link` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airports`
--

LOCK TABLES `airports` WRITE;
/*!40000 ALTER TABLE `airports` DISABLE KEYS */;
INSERT INTO `airports` VALUES (1,'VDO','Vân Đồn','Việt Nam','Quảng Ninh','http://localhost:8080/qairline/images/airport/1734591414120.png'),(2,'HAN','Nội Bài','Việt Nam','Hà Nội','http://localhost:8080/qairline/images/airport/1734591529295.png'),(3,'HPH','Cát Bi','Việt Nam','Hải Phòng','http://localhost:8080/qairline/images/airport/1734591655122.png'),(4,'VII','Vinh','Việt Nam','Nghệ An','http://localhost:8080/qairline/images/airport/1734591743913.png'),(5,'DAD','Đà Nẵng','Việt Nam','Đà Nẵng','http://localhost:8080/qairline/images/airport/1734591911146.png'),(6,'CXR','Cam Ranh','Việt Nam','Khánh Hòa ','http://localhost:8080/qairline/images/airport/1734592003439.png'),(7,'SGN','Tân Sơn Nhất','Việt Nam','Thành Phố Hồ Chí Minh','http://localhost:8080/qairline/images/airport/1734592111683.png'),(8,'VCA','Cần Thơ','Việt Nam','Thành Phố Cần Thơ','http://localhost:8080/qairline/images/airport/1734592200437.png'),(9,'PQC','Phú Quốc','Việt Nam','Kiên Giang','http://localhost:8080/qairline/images/airport/1734592282495.png'),(10,'SIN','Changi','Singapore','Singapore','http://localhost:8080/qairline/images/airport/1734592538883.png'),(11,'DOH','Hamad','Qutar','Doha ','http://localhost:8080/qairline/images/airport/1734592650246.png'),(12,'HND','Haneda','Nhật Bản ','Tokyo ','http://localhost:8080/qairline/images/airport/1734592824061.png'),(13,'MUC','Munich','Đức  ','Munich','http://localhost:8080/qairline/images/airport/1734593002612.png'),(14,'LAX','Los Angeles','Hoa Kỳ ','Los Angeles','http://localhost:8080/qairline/images/airport/1734593081891.png');
/*!40000 ALTER TABLE `airports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `price` double DEFAULT NULL,
  `status` varchar(255) DEFAULT 'SUCCESS',
  PRIMARY KEY (`id`),
  KEY `bookings_user_id_foreign` (`user_id`),
  CONSTRAINT `bookings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES ('2024-12-15 10:00:00','2024-12-15 09:15:00',2,1,3400000,'SUCCESS'),('2024-12-16 10:30:00','2024-12-16 10:00:00',3,2,8750000,'SUCCESS'),('2024-12-16 11:30:00','2024-12-16 11:00:00',4,3,7500000,'SUCCESS'),('2024-12-17 13:30:00','2024-12-17 13:00:00',5,4,6900000,'SUCCESS'),('2024-12-18 10:00:00','2024-12-18 09:30:00',7,5,4250000,'SUCCESS'),('2024-12-16 09:15:00','2024-12-16 08:45:00',7,6,6250000,'SUCCESS'),('2024-12-17 15:00:00','2024-12-17 14:30:00',9,7,8750000,'SUCCESS'),('2024-12-16 09:30:00','2024-12-16 09:00:00',14,9,6900000,'SUCCESS'),('2024-12-17 10:30:00','2024-12-17 10:00:00',4,10,3000000,'SUCCESS'),('2024-12-19 10:15:00','2024-12-19 09:45:00',15,11,6250000,'SUCCESS'),('2024-12-19 12:00:00','2024-12-19 11:30:00',8,12,3400000,'SUCCESS'),('2024-12-18 12:30:00','2024-12-18 12:00:00',3,13,8750000,'SUCCESS'),('2024-12-16 15:30:00','2024-12-16 15:00:00',6,14,5750000,'SUCCESS'),('2024-12-18 10:45:00','2024-12-18 10:15:00',2,15,3450000,'SUCCESS'),('2024-12-16 17:30:00','2024-12-16 17:00:00',13,16,8750000,'SUCCESS'),('2024-12-17 17:00:00','2024-12-17 16:30:00',19,17,9000000,'SUCCESS'),('2024-12-19 13:30:00','2024-12-19 13:00:00',10,18,5000000,'SUCCESS'),('2024-12-16 18:30:00','2024-12-16 18:00:00',5,19,8750000,'SUCCESS'),('2024-12-18 14:30:00','2024-12-18 14:00:00',20,20,5750000,'SUCCESS'),('2024-12-17 12:00:00','2024-12-17 11:30:00',1,21,6250000,'SUCCESS'),('2024-12-19 11:45:00','2024-12-19 11:15:00',16,22,4600000,'SUCCESS'),('2024-12-19 11:00:00','2024-12-19 10:30:00',11,23,6250000,'SUCCESS'),('2024-12-19 11:00:00','2024-12-19 10:30:00',5,24,8750000,'CANCEL');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flights`
--

DROP TABLE IF EXISTS `flights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flights` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `airplane_id` bigint unsigned DEFAULT NULL,
  `airplane_name` varchar(255) DEFAULT NULL,
  `remain_economy_seat` bigint NOT NULL,
  `remain_business_seat` bigint NOT NULL,
  `departure_time` datetime DEFAULT NULL,
  `arrival_time` datetime DEFAULT NULL,
  `departure_airport_id` bigint unsigned DEFAULT NULL,
  `arrival_airport_id` bigint unsigned DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `economy_pricing` bigint unsigned DEFAULT NULL,
  `business_pricing` bigint unsigned DEFAULT NULL,
  `flight_code` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `flights_airplane_id_foreign` (`airplane_id`),
  KEY `flights_arrival_airport_id_foreign` (`arrival_airport_id`),
  KEY `flights_departure_airport_id_foreign` (`departure_airport_id`),
  CONSTRAINT `flights_airplane_id_foreign` FOREIGN KEY (`airplane_id`) REFERENCES `aircrafts` (`id`),
  CONSTRAINT `flights_arrival_airport_id_foreign` FOREIGN KEY (`arrival_airport_id`) REFERENCES `airports` (`id`),
  CONSTRAINT `flights_departure_airport_id_foreign` FOREIGN KEY (`departure_airport_id`) REFERENCES `airports` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flights`
--

LOCK TABLES `flights` WRITE;
/*!40000 ALTER TABLE `flights` DISABLE KEYS */;
INSERT INTO `flights` VALUES (1,1,'Boeing737',100,20,'2024-12-18 05:00:00','2024-12-20 12:00:00',2,5,'READY','None','2024-12-20 00:00:00','2024-11-20 00:00:00',1500000,2000000,'4SEJDBM7'),(2,2,'Airbus A320',120,27,'2024-12-17 06:00:00','2024-12-21 13:00:00',9,8,'READY','None','2024-12-21 00:00:00','2024-11-21 00:00:00',1200000,1700000,'77XIPQH3'),(3,3,'Boeing 777',132,20,'2024-12-22 14:00:00','2024-12-22 18:00:00',1,10,'READY','None','2024-12-22 00:00:00','2024-11-22 00:00:00',1800000,2500000,'ZG0HCGR1'),(4,14,'Embraer E175',60,4,'2024-12-23 11:00:00','2024-12-23 15:00:00',6,12,'READY','None','2024-12-23 00:00:00','2024-11-23 00:00:00',2200000,3000000,'2QWDTE02'),(5,20,'Boeing 737 MAX',122,25,'2024-12-18 10:00:00','2024-12-21 15:30:00',14,7,'DELAY','Broken','2024-12-24 00:00:00','2024-11-24 00:00:00',1700000,2300000,'WJSG49QT'),(6,1,'Boeing737',100,18,'2024-12-20 08:00:00','2024-12-20 12:00:00',2,5,'READY','None','2024-12-20 00:00:00','2024-11-20 00:00:00',1500000,2000000,'UMICDOU5'),(7,2,'Airbus A320',113,26,'2024-12-21 09:00:00','2024-12-21 13:00:00',9,8,'READY','None','2024-12-21 00:00:00','2024-11-21 00:00:00',1200000,1700000,'D29LQH8B'),(8,3,'Boeing 777',136,20,'2024-12-22 14:00:00','2024-12-22 18:00:00',1,10,'READY','None','2024-12-22 00:00:00','2024-11-22 00:00:00',1800000,2500000,'ZFKGCZME'),(9,14,'Embraer E175',60,6,'2024-12-23 11:00:00','2024-12-23 15:00:00',6,12,'READY','None','2024-12-23 00:00:00','2024-11-23 00:00:00',2200000,3000000,'6TLOUEVY'),(10,20,'Boeing 737 MAX',130,23,'2024-12-24 12:00:00','2024-12-24 16:00:00',14,7,'READY','None','2024-12-24 00:00:00','2024-11-24 00:00:00',1700000,2300000,'33IKJ382'),(11,3,'Boeing 777',140,17,'2024-12-22 14:00:00','2024-12-22 18:00:00',1,10,'READY','None','2024-12-22 00:00:00','2024-11-22 00:00:00',1800000,2500000,'9SHDUW4O'),(12,4,'Embraer E190',57,10,'2024-12-23 11:00:00','2024-12-23 15:00:00',6,12,'READY','None','2024-12-23 00:00:00','2024-11-23 00:00:00',2200000,3000000,'AIGPDEAW'),(13,5,'Lockheed Martin C-130',130,25,'2024-12-24 12:00:00','2024-12-24 16:00:00',14,7,'READY','None','2024-12-24 00:00:00','2024-11-24 00:00:00',1700000,2300000,'6TKW2NRL'),(14,6,'Cessna Citation X',146,20,'2024-12-25 13:00:00','2024-12-25 17:00:00',4,3,'READY','None','2024-12-25 00:00:00','2024-11-25 00:00:00',1300000,1900000,'SR7QKJ0F'),(15,7,'Bombardier CRJ900',147,30,'2024-12-26 10:00:00','2024-12-26 14:00:00',7,13,'READY','None','2024-12-26 00:00:00','2024-11-26 00:00:00',2000000,2500000,'4BNS9NFX'),(16,8,'Gulfstream G650',80,12,'2024-12-27 15:00:00','2024-12-27 19:00:00',12,8,'READY','None','2024-12-27 00:00:00','2024-11-27 00:00:00',1600000,2200000,'ZYFN0TYW'),(17,9,'Dassault Falcon 7X',117,25,'2024-12-28 07:00:00','2024-12-28 11:00:00',9,4,'READY','None','2024-12-28 00:00:00','2024-11-28 00:00:00',1700000,2300000,'UOUY97O5'),(18,12,'Airbus A380',120,27,'2024-12-21 09:00:00','2024-12-21 13:00:00',9,8,'READY','None','2024-12-21 00:00:00','2024-11-21 00:00:00',1200000,1700000,'CNPE8NL7'),(19,13,'Boeing 767',140,17,'2024-12-22 14:00:00','2024-12-22 18:00:00',1,10,'READY','None','2024-12-22 00:00:00','2024-11-22 00:00:00',1800000,2500000,'06YPDBZ4'),(20,14,'Embraer E175',57,6,'2024-12-23 11:00:00','2024-12-23 15:00:00',6,12,'READY','None','2024-12-23 00:00:00','2024-11-23 00:00:00',2200000,3000000,'WRDK8730'),(21,15,'Lockheed Martin L-1011',130,25,'2024-12-24 12:00:00','2024-12-24 16:00:00',14,7,'READY','None','2024-12-24 00:00:00','2024-11-24 00:00:00',1700000,2300000,'TKM4QAVI'),(22,16,'Cessna Caravan',150,20,'2024-12-25 13:00:00','2024-12-25 17:00:00',4,3,'READY','None','2024-12-25 00:00:00','2024-11-25 00:00:00',1300000,1900000,'1OQLYBV9'),(23,17,'Bombardier Global 6000',150,30,'2024-12-26 10:00:00','2024-12-26 14:00:00',7,13,'READY','None','2024-12-26 00:00:00','2024-11-26 00:00:00',2000000,2500000,'5B6E2QIC'),(24,18,'Gulfstream G450',80,15,'2024-12-27 15:00:00','2024-12-27 19:00:00',12,8,'READY','None','2024-12-27 00:00:00','2024-11-27 00:00:00',1600000,2200000,'BDZIW6QV'),(25,19,'Dassault Falcon 900',120,25,'2024-12-28 07:00:00','2024-12-28 11:00:00',9,4,'READY','None','2024-12-28 00:00:00','2024-11-28 00:00:00',1700000,2300000,'WW4JW7LY'),(26,22,'Boeing 787',150,20,'2024-12-30 10:00:00','2024-12-30 14:00:00',2,5,'READY','None','2024-12-30 00:00:00','2024-11-30 00:00:00',1500000,2000000,'3JAHL2EP'),(27,23,'Airbus A220',150,20,'2024-12-31 10:00:00','2024-12-31 14:00:00',2,5,'READY','None','2024-12-31 00:00:00','2024-11-30 00:00:00',1500000,2000000,'ULEVJY9U'),(28,24,'Boeing 757',150,20,'2025-01-01 10:00:00','2025-01-01 14:00:00',2,5,'READY','None','2025-01-01 00:00:00','2024-11-30 00:00:00',1500000,2000000,'19HNMTPZ'),(29,25,'Embraer E145',150,20,'2025-01-02 10:00:00','2025-01-02 14:00:00',2,5,'READY','None','2025-01-02 00:00:00','2024-11-30 00:00:00',1500000,2000000,'TIQ89AWF'),(30,3,'Boeing 777',150,20,'2024-12-22 10:00:00','2024-12-22 14:00:00',7,6,'READY','None','2024-12-22 00:00:00','2024-11-20 00:00:00',1500000,2000000,'CSK5PABE'),(31,4,'Embraer E190',150,20,'2024-12-23 10:00:00','2024-12-23 14:00:00',7,4,'READY','None','2024-12-23 00:00:00','2024-11-20 00:00:00',1500000,2000000,'RYMHZK1C'),(32,13,'Boeing 767',150,20,'2024-12-28 10:00:00','2024-12-28 14:00:00',7,6,'READY','None','2024-12-28 00:00:00','2024-11-20 00:00:00',1500000,2000000,'3PI87ZOT'),(33,13,'Boeing 767',100,100,'2024-12-30 10:00:00','2024-12-31 14:00:00',7,6,'READY','None','2024-12-28 00:00:00','2024-11-20 00:00:00',1500000,2000000,'NTP1D12D'),(34,13,'Boeing 767',100,120,'2024-12-29 10:00:00','2024-12-29 14:00:00',5,6,'READY','None','2024-12-28 00:00:00','2024-11-20 00:00:00',1600000,2000000,'FTWE1984'),(35,2,'Airbus A320',200,50,'2024-12-22 22:25:00','2024-12-22 23:25:00',1,2,'DELAY','Broken','2024-12-20 22:25:28','2024-12-20 22:25:28',1000000,5000000,'FP4N8TTX');
/*!40000 ALTER TABLE `flights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invalidated_token`
--

DROP TABLE IF EXISTS `invalidated_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invalidated_token` (
  `id` varchar(255) NOT NULL,
  `expiry_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invalidated_token`
--

LOCK TABLES `invalidated_token` WRITE;
/*!40000 ALTER TABLE `invalidated_token` DISABLE KEYS */;
INSERT INTO `invalidated_token` VALUES ('0ec554a6-bd35-435e-9a7b-11108122d012','2024-12-21 21:23:40.000000'),('0f1edbfa-a529-4323-8796-ecb82fb987fd','2024-11-21 12:55:16.000000'),('247f65c6-4b9d-4902-a6d6-395171778c4f','2024-11-21 13:01:33.000000'),('5c56f0f5-93cd-46dd-9143-85fa961646ee','2024-12-09 10:04:31.000000'),('71d53bfa-c988-4544-b18f-31610051d5ce','2024-12-15 23:16:59.000000'),('82141042-435b-4c5d-93c9-590cc59ca4c2','2024-11-21 12:38:13.000000'),('85e00d3a-3b73-4df8-aa32-44804db45eb9','2024-11-21 12:28:36.000000'),('9c5f1720-e7d2-4639-a012-e911991cb2d5','2024-11-21 12:50:57.000000'),('a66717e1-f450-4ce9-9c84-c05c1cf925b0','2024-12-15 23:16:20.000000'),('b63fcd66-373d-4b79-86df-f4bf1ea64cc6','2024-11-21 12:36:30.000000'),('c76a3e59-67f9-4ad4-81cb-3000355a6b6c','2024-12-21 22:35:13.000000'),('cb5e2067-a84b-45b1-aaf0-14e6441d6316','2024-12-21 16:12:08.000000'),('cf6cea26-410f-4f62-aaf5-3656545adc91','2024-12-09 10:14:42.000000'),('d8b14d99-35ea-47bb-8a2c-ad74ca18328f','2024-12-16 17:48:14.000000'),('f1bd4895-80f4-4605-a090-1e087e159185','2024-12-21 20:29:38.000000'),('fad95534-2251-43f4-aea0-60bd57276f46','2024-11-21 12:32:10.000000'),('fc11a4e2-b346-4399-86e3-780b79322448','2024-11-21 13:03:19.000000'),('ffab87f3-c4e4-4c96-be0e-3d8debc1927b','2024-12-09 10:01:58.000000'),('ffee8a6b-2109-42ec-88a4-28c82e5b0c7f','2024-12-09 10:16:21.000000');
/*!40000 ALTER TABLE `invalidated_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manufacturers`
--

DROP TABLE IF EXISTS `manufacturers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manufacturers` (
  `name` text NOT NULL,
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturers`
--

LOCK TABLES `manufacturers` WRITE;
/*!40000 ALTER TABLE `manufacturers` DISABLE KEYS */;
INSERT INTO `manufacturers` VALUES ('John Smith',1),('Maria Garcia',2),('David Johnson',3),('Sophia Williams',4),('James Brown',5),('Isabella Martinez',6),('Michael Davis',7),('Emma Taylor',8),('William Anderson',9),('Olivia Thomas',10);
/*!40000 ALTER TABLE `manufacturers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `title` text NOT NULL,
  `content` text NOT NULL,
  `type` enum('announcement','procedure','travel-guide','experience') NOT NULL DEFAULT 'announcement',
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `image` text NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES ('Khám Phá Du Lịch Phượt Việt Nam','Hãy cùng khám phá những địa điểm du lịch hấp dẫn tại Việt Nam. Từ miền núi cao đến những bãi biển xinh đẹp, trải nghiệm chuyến đi không thể nào quên.','announcement',1,'/images/news/1734595535558.jpg','2024-12-19 04:13:58'),('Hành Trình Xanh - Bảo Vệ Hành Tinh','Chúng tôi tự hào cam kết hướng tới các giải pháp thân thiện với môi trường: sử dụng nhiên liệu bền vững và giảm thiểu khí thải. Bay cùng chúng tôi là đồng hành vì một tương lai xanh','announcement',2,'/images/news/1734595653875.png','2024-12-19 04:13:58'),('Bay Đến Tương Lai - Mở Đường Bay Mới','Khám phá những chân trời mới cùng chúng tôi với đường bay thẳng vừa ra mắt. Hãy sẵn sàng cho hành trình thuận tiện, tiết kiệm thời gian, và trải nghiệm dịch vụ hàng đầu trên mỗi chuyến đi.','announcement',3,'/images/news/1734595720120.jpg','2024-12-19 04:13:58'),('Ưu Đãi Đặc Biệt Cho Kỳ Nghỉ','Chào đón mùa lễ hội với những ưu đãi hấp dẫn chưa từng có! Đặt vé ngay hôm nay để tận hưởng giá vé giảm đến 50% và bắt đầu kỳ nghỉ trọn vẹn bên gia đình và bạn bè.','announcement',4,'/images/news/1734596469290.jpg','2024-12-19 04:13:58'),('Dịch Vụ Internet Trên Không - Luôn Kết Nối Mọi Nơi','Giờ đây, bạn có thể làm việc, giải trí hoặc kết nối với người thân ngay trên máy bay với dịch vụ Wi-Fi hiện đại của chúng tôi. Trải nghiệm bay tiện nghi và không bỏ lỡ khoảnh khắc nào','announcement',6,'/images/news/1734596536261.jpg','2024-12-19 04:13:58'),('Khám Phá Mùa Thu Tại Nhật Bản','Cùng chúng tôi khám phá vẻ đẹp tuyệt vời của mùa thu Nhật Bản. Từ những con đường rợp lá vàng đến các lễ hội đặc sắc, hãy tận hưởng chuyến đi không thể nào quên.','announcement',7,'/images/news/1734596570790.jpg','2024-12-19 04:13:58'),('Tính Năng Mới Của Ứng Dụng Mobile','Chúng tôi vừa cập nhật tính năng mới trên ứng dụng mobile, giúp bạn dễ dàng đặt vé, theo dõi lịch trình bay, và nhận thông báo trực tiếp từ chúng tôi.','announcement',8,'/images/news/1734596601469.jpg','2024-12-19 04:13:58'),('Kết Nối Thế Giới - Chuyến Bay Thẳng Đến Châu Mỹ','Chúng tôi tự hào thông báo về chuyến bay thẳng đến các thành phố lớn của Châu Mỹ. Khám phá những điểm đến mới lạ và tận hưởng chuyến bay ấn tượng với chúng tôi.','announcement',9,'/images/news/1734596629037.jpg','2024-12-19 04:13:58'),('Ưu Đãi Vé Máy Bay Cho Sinh Viên','Sinh viên có thể tận hưởng những ưu đãi vé máy bay giảm giá cực kỳ hấp dẫn khi đặt vé với chúng tôi. Hãy nhanh tay đăng ký và khởi hành chuyến đi mơ ước.','announcement',10,'/images/news/1734596666423.jpg','2024-12-19 04:13:58'),('Tối Ưu Hóa Thời Gian Bay - Đảm Bảo Sự Tiện Nghi','Chúng tôi luôn nỗ lực để tối ưu hóa thời gian bay của bạn. Đảm bảo rằng mỗi chuyến bay sẽ là một trải nghiệm tiện nghi và dễ chịu nhất','announcement',11,'/images/news/1734596697127.jpg','2024-12-19 04:13:58'),('Bảo Vệ An Toàn Cho Mỗi Chuyến Bay','Đảm bảo an toàn tuyệt đối cho hành khách là ưu tiên hàng đầu của chúng tôi. Cùng khám phá các biện pháp bảo vệ và các cải tiến trong quy trình an toàn của chúng tôi.','announcement',12,'/images/news/1734600146515.jpg','2024-12-19 04:13:58'),('Bảo Vệ An Toàn Cho Mỗi Chuyến Bay','Đảm bảo an toàn tuyệt đối cho hành khách là ưu tiên hàng đầu của chúng tôi. Cùng khám phá các biện pháp bảo vệ và các cải tiến trong quy trình an toàn của chúng tôi.','announcement',13,'/images/news/1734664955834.jpg','2024-12-20 10:22:36'),('Thông Báo Quan Trọng: Thay Đổi Lịch Bay và Dịch Vụ Mới!','Kính gửi Quý hành khách,\n\nChúng tôi xin thông báo về một số thay đổi quan trọng trong lịch bay và dịch vụ của [Tên Hãng Hàng Không]. Những điều chỉnh này sẽ giúp nâng cao trải nghiệm của quý hành khách khi sử dụng dịch vụ của chúng tôi. Quý hành khách vui lòng lưu ý các thông tin chi tiết dưới đây:\n\nThay Đổi Lịch Bay:\n\nMột số chuyến bay sẽ được điều chỉnh giờ khởi hành và hạ cánh. Vui lòng kiểm tra lại lịch bay của quý khách trên trang web của chúng tôi để cập nhật thông tin mới nhất.\nDịch Vụ Đặc Biệt Mới:\n\nChúng tôi đã triển khai các dịch vụ mới như Wi-Fi trên máy bay, lựa chọn ghế ngồi đặc biệt và nhiều dịch vụ tiện ích khác. Quý khách có thể tìm hiểu thêm và đăng ký các dịch vụ này khi làm thủ tục trực tuyến hoặc tại sân bay.\nChính Sách Hành Lý:\n\nChính sách hành lý đã được điều chỉnh để phục vụ tốt hơn nhu cầu của quý khách. Vui lòng tham khảo các quy định mới nhất về hành lý tại trang web của chúng tôi trước khi bắt đầu chuyến đi.\nChúng tôi xin cảm ơn sự hợp tác và hy vọng tiếp tục nhận được sự ủng hộ từ quý hành khách. Nếu quý khách cần thêm thông tin, vui lòng liên hệ với chúng tôi qua tổng đài hoặc email.\n\nTrân trọng,','procedure',14,'/images/news/1734717555835.jpg','2024-12-21 00:59:16'),('Thông Báo Không Quan Trọng lẮM','Kính gửi Quý hành khách,\n\nChúng tôi xin thông báo về một số thay đổi quan trọng trong lịch bay và dịch vụ của [Tên Hãng Hàng Không]. Để đảm bảo trải nghiệm tốt nhất cho quý hành khách, vui lòng lưu ý những thông tin dưới đây:\n\nThay Đổi Lịch Bay:\n\nMột số chuyến bay sẽ được điều chỉnh giờ khởi hành hoặc hạ cánh. Vui lòng kiểm tra lại lịch bay của quý khách trên trang web chính thức của chúng tôi hoặc liên hệ với tổng đài dịch vụ khách hàng để biết thêm thông tin chi tiết.\nDịch Vụ Đặc Biệt Mới:\n\nChúng tôi đã triển khai các dịch vụ mới như Wi-Fi trên máy bay và lựa chọn ghế ngồi đặc biệt. Quý khách có thể tìm hiểu thêm và đăng ký các dịch vụ này khi làm thủ tục trực tuyến hoặc tại sân bay.\nChính Sách Hành Lý:\n\nChính sách hành lý sẽ có một số điều chỉnh nhằm đáp ứng nhu cầu ngày càng cao của hành khách. Quý khách vui lòng tham khảo các quy định mới nhất về hành lý tại trang web của chúng tôi trước khi bắt đầu chuyến đi.\nChúng tôi xin cảm ơn sự hợp tác và lựa chọn sử dụng dịch vụ của [Tên Hãng Hàng Không]. Nếu quý khách cần hỗ trợ thêm thông tin, đừng ngần ngại liên hệ với chúng tôi qua tổng đài hoặc email.\n\nChúc quý khách có một chuyến bay an toàn và thuận lợi!','announcement',15,'/images/news/1734719808083.jpg','2024-12-21 01:36:50');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_amount` double NOT NULL,
  `payment_method` enum('bank','credit-card') NOT NULL DEFAULT 'bank',
  `payment_date` datetime NOT NULL,
  `payment_status` enum('pending','success','fail') NOT NULL DEFAULT 'pending',
  `booking_id` bigint unsigned DEFAULT NULL,
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `fk_payments_booking_id` (`booking_id`),
  CONSTRAINT `fk_payments_booking_id` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `payments_booking_id_foreign` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (3400000,'bank','2024-12-15 09:15:00','success',1,5),(8750000,'bank','2024-12-16 10:00:00','success',2,6),(7500000,'bank','2024-12-16 11:00:00','success',3,7),(6900000,'bank','2024-12-17 13:00:00','success',4,8),(4250000,'bank','2024-12-18 09:30:00','success',5,9),(6250000,'bank','2024-12-16 08:45:00','success',6,10),(8750000,'bank','2024-12-17 14:30:00','success',7,11),(6900000,'bank','2024-12-16 09:00:00','success',9,13),(3000000,'bank','2024-12-17 10:00:00','success',10,14),(6250000,'bank','2024-12-19 09:45:00','success',11,15),(3400000,'bank','2024-12-19 11:30:00','success',12,16),(8750000,'bank','2024-12-18 12:00:00','success',13,17),(5750000,'bank','2024-12-16 15:00:00','success',14,18),(3450000,'bank','2024-12-18 10:15:00','success',15,19),(8750000,'bank','2024-12-16 17:00:00','success',16,20),(9000000,'bank','2024-12-17 16:30:00','success',17,21),(5000000,'bank','2024-12-19 13:00:00','success',18,22),(8750000,'bank','2024-12-16 18:00:00','success',19,23),(5750000,'bank','2024-12-18 14:00:00','success',20,24),(6250000,'bank','2024-12-17 11:30:00','success',21,25),(4600000,'bank','2024-12-19 11:15:00','success',22,26),(6250000,'bank','2024-12-19 10:30:00','success',23,27),(8750000,'bank','2024-12-19 10:30:00','success',24,28);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `booking_id` bigint unsigned DEFAULT NULL,
  `flight_id` bigint unsigned DEFAULT NULL,
  `seat_class` varchar(255) DEFAULT NULL,
  `seat_type` varchar(255) DEFAULT NULL,
  `pricing` double NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `num` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tickets_flight_id_foreign` (`flight_id`),
  KEY `tickets_booking_id_foreign` (`booking_id`),
  CONSTRAINT `tickets_booking_id_foreign` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tickets_flight_id_foreign` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (1,1,2,'business','adult',1700000,'2024-12-15 09:15:00','2024-12-15 10:00:00',1),(2,1,2,'business','child',850000,'2024-12-15 09:15:00','2024-12-15 10:00:00',2),(3,2,3,'economy','adult',2500000,'2024-12-16 10:00:00','2024-12-16 10:30:00',3),(4,2,3,'economy','child',1250000,'2024-12-16 10:00:00','2024-12-16 10:30:00',1),(5,3,4,'business','adult',3000000,'2024-12-16 11:00:00','2024-12-16 11:30:00',2),(6,3,4,'business','child',1500000,'2024-12-16 11:00:00','2024-12-16 11:30:00',1),(7,4,5,'economy','adult',2300000,'2024-12-17 13:00:00','2024-12-17 13:30:00',2),(8,4,5,'economy','child',1150000,'2024-12-17 13:00:00','2024-12-17 13:30:00',2),(9,5,7,'economy','adult',1700000,'2024-12-18 09:30:00','2024-12-18 10:00:00',2),(10,5,7,'economy','child',850000,'2024-12-18 09:30:00','2024-12-18 10:00:00',1),(11,6,15,'economy','adult',2500000,'2024-12-16 08:45:00','2024-12-16 09:15:00',2),(12,6,15,'economy','child',1250000,'2024-12-16 08:45:00','2024-12-16 09:15:00',1),(13,7,8,'economy','adult',2500000,'2024-12-17 14:30:00','2024-12-17 15:00:00',3),(14,7,8,'economy','child',1250000,'2024-12-17 14:30:00','2024-12-17 15:00:00',1),(17,9,3,'economy','adult',2300000,'2024-12-16 09:00:00','2024-12-16 09:30:00',2),(18,9,3,'economy','child',1150000,'2024-12-16 09:00:00','2024-12-16 09:30:00',2),(19,10,6,'business','adult',2000000,'2024-12-17 10:00:00','2024-12-17 10:30:00',1),(20,10,6,'business','child',1000000,'2024-12-17 10:00:00','2024-12-17 10:30:00',1),(21,11,20,'economy','adult',2500000,'2024-12-19 09:45:00','2024-12-19 10:15:00',2),(22,11,20,'economy','child',1250000,'2024-12-19 09:45:00','2024-12-19 10:15:00',1),(23,12,16,'business','adult',1700000,'2024-12-19 11:30:00','2024-12-19 12:00:00',1),(24,12,16,'business','child',850000,'2024-12-19 11:30:00','2024-12-19 12:00:00',2),(25,13,5,'economy','adult',2500000,'2024-12-18 12:00:00','2024-12-18 12:30:00',3),(26,13,5,'economy','child',1250000,'2024-12-18 12:00:00','2024-12-18 12:30:00',1),(27,14,11,'business','adult',2300000,'2024-12-16 15:00:00','2024-12-16 15:30:00',2),(28,14,11,'business','child',1150000,'2024-12-16 15:00:00','2024-12-16 15:30:00',1),(29,15,10,'business','adult',2300000,'2024-12-18 10:15:00','2024-12-18 10:45:00',1),(30,15,10,'business','child',1150000,'2024-12-18 10:15:00','2024-12-18 10:45:00',1),(31,16,7,'economy','adult',2500000,'2024-12-16 17:00:00','2024-12-16 17:30:00',3),(32,16,7,'economy','child',1250000,'2024-12-16 17:00:00','2024-12-16 17:30:00',1),(33,17,9,'business','adult',3000000,'2024-12-17 16:30:00','2024-12-17 17:00:00',2),(34,17,9,'business','child',1500000,'2024-12-17 16:30:00','2024-12-17 17:00:00',2),(35,18,14,'economy','adult',2000000,'2024-12-19 13:00:00','2024-12-19 13:30:00',1),(36,18,14,'economy','child',1000000,'2024-12-19 13:00:00','2024-12-19 13:30:00',3),(37,19,20,'business','adult',2500000,'2024-12-16 18:00:00','2024-12-16 18:30:00',3),(38,19,20,'business','child',1250000,'2024-12-16 18:00:00','2024-12-16 18:30:00',1),(39,20,17,'economy','adult',2300000,'2024-12-18 14:00:00','2024-12-18 14:30:00',2),(40,20,17,'economy','child',1150000,'2024-12-18 14:00:00','2024-12-18 14:30:00',1),(41,21,4,'business','adult',2500000,'2024-12-17 11:30:00','2024-12-17 12:00:00',2),(42,21,4,'business','child',1250000,'2024-12-17 11:30:00','2024-12-17 12:00:00',1),(43,22,12,'economy','adult',2300000,'2024-12-19 11:15:00','2024-12-19 11:45:00',1),(44,22,12,'economy','child',1150000,'2024-12-19 11:15:00','2024-12-19 11:45:00',2),(45,23,18,'business','adult',2500000,'2024-12-19 10:30:00','2024-12-19 11:00:00',2),(46,23,18,'business','child',1250000,'2024-12-19 10:30:00','2024-12-19 11:00:00',1),(47,24,18,'economy','adult',2500000,'2024-12-19 10:30:00','2024-12-19 11:00:00',3),(48,24,18,'economy','child',1250000,'2024-12-19 10:30:00','2024-12-19 11:00:00',1);
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) NOT NULL DEFAULT 'default_facebook_url',
  `google` varchar(255) NOT NULL DEFAULT 'default_google_url',
  `phone_number` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','$2a$05$ljkOWVl8Y/IWZCcd1KVWbOTYf3xh2Z3imcmaLM6vCspHx30QudS0i','Default Address',NULL,'default_facebook_url','default_google_url','0000000000',NULL,'2024-12-18','ADMIN','admin'),(2,'thuchoang13@gmail.com','$2a$05$ypCvBVpPo97k7NP3pUSUzu2MhdMnMo/zcVvZ79xf5LLwodtpZWRym','Hà Nội','email@gmail.com','default_facebook_url','default_google_url','0999999999','femal','2004-02-13','USER','Hoàng Văn Thực'),(3,'tiendo51@gmail.com','$2a$05$.YBdjQ7rTpuw8Wv52jyzge9UzQVasWN85TnBS0ZuHUs.GSFJfL0b2','Hải Phòng  ','email@gmail.com','default_facebook_url','default_google_url','0999999999','female','2001-12-15','USER','Đỗ Thùy Tiên'),(4,'linhtran95@gmail.com','$2a$05$qo1mlWT53k4cm8TjGq1WP.ulWEW5Jtx0oxp0qZ8j2MDDbKkePxkbi','Hải Dương ','email@gmail.com','default_facebook_url','default_google_url','0999999999','female','2000-10-09','USER','Trần Hà Linh'),(5,'thucpham59@gmail.com','$2a$05$1vp9hMAo4vwc7yMt38DDj.772uOt29e6/C2cjStC5orznp/BBOJy2','Hải Dương ','email@gmail.com','default_facebook_url','default_google_url','0999999999','male','2001-09-02','USER','Phạm Đình Thực'),(6,'tienpham35@gmail.com','$2a$05$8mG5d7jwDJUrMk/iHJQ8A.GpQXYBtE.I0zFHZX4JQAklI68nILipO','Hòa Bình   ','email@gmail.com','default_facebook_url','default_google_url','0999999999','male','2000-09-08','USER','Phạm Văn Tiến '),(7,'anhpham55@gmail.com','$2a$05$pws4vOhvcj/59mTG/sNaR.TT1P/VBGYzMu/0gz/sqm2NPO9NTeM5G','Sơn La ','email@gmail.com','default_facebook_url','default_google_url','0999999999','male','2002-06-15','USER','Phạm Hoàng Anh '),(8,'thucnguyen71@gmail.com','$2a$05$bzu9hsK3sr18kNZEbJdsyOdH/hRFvF5zrak1H1wspEfahvEgwdU/K','Lào Cai ','email@gmail.com','default_facebook_url','default_google_url','0999999999','female','2001-03-08','USER','Nguyễn Hoàng Thu '),(9,'linhpham7@gmail.com','$2a$05$78eayTa1H.6kZgGlEHvYou0jutdl10zcAWwlqIuql2BmX2mlU8URy','Thanh Hóa ','email@gmail.com','default_facebook_url','default_google_url','0999999999','female','2004-01-07','USER','Phạm Thị Ngọc Linh '),(10,'linhdo40@gmail.com','$2a$05$rs8W86Y.cPX/.0bNFBVeReIsH3EffyBjVP4jd0B/.4Phh.AMzpqS.','NGhệ An ','email@gmail.com','default_facebook_url','default_google_url','0999999999','female','1999-12-07','USER','Đỗ Ngọc Linh '),(11,'linhtran85@gmail.com','$2a$05$5yieCRFuoRqsNyOusVf6XOb3TAFUz.nBPGIxTPzTwz.kXWYxEYGb6','Hà TĨnh ','email@gmail.com','default_facebook_url','default_google_url','0999999999','male','1998-11-05','USER','Trần Mạnh Linh '),(12,'huyhuynh67@gmail.com','$2a$05$sGC7l7UGjmZK78ePVgib2.qqomZhMPj0T42Imo12U6j/QThf/gg/S','Quảng Ninh ','email@gmail.com','default_facebook_url','default_google_url','0999999999','male','2005-11-06','USER','Nguyễn Quang Huy '),(13,'baole26@gmail.com','$2a$05$YlodUbNFtMI9nd1a3pRGMuPxIHdFcmGHOvD7ZKukRoGDsQPEovNq2','Nam Định ','email@gmail.com','default_facebook_url','default_google_url','0999999999','male','2001-08-06','USER','Lê Ngọc Bảo  '),(14,'ngocpham17@gmail.com','$2a$05$frp9UdCYzyMXAC5ubtFhjOXDgIvGUE2ueR2ms5XQg1/cdxWhDe0F6','Tuyên Quang ','email@gmail.com','default_facebook_url','default_google_url','0999999999','female','2004-09-07','USER','Phạm Bảo Ngọc '),(15,'baonguyen70@gmail.com','$2a$05$4L8HAjwxiNL/0kJ2CKE7puJXwAvQbLyHZkMXivgGMCXm2bqx/R1NS','Thừa Thiên Huế ','email@gmail.com','default_facebook_url','default_google_url','0999999999','male','2001-01-05','USER','NGuyễn Ngọc Bảo '),(16,'huytran23@gmail.com','$2a$05$DDw5qciHA0sclkVIvCct9uq82JnGjn3EHpwFSmOoUtN/MovkbbZOi','Đà Nẵng ','email@gmail.com','default_facebook_url','default_google_url','0999999999','male','2002-12-05','USER','Trần Thế Huy '),(17,'anhpham96@gmail.com','$2a$05$v1wAX69cCsD7dUp5tEMRYO.Ou.lBnjSnLuXr6O0toalDXbSRNzsJ6','Đồng Nai ','email@gmail.com','default_facebook_url','default_google_url','0999999999','female','2001-06-07','USER','Phạm Ngọc Anh '),(19,'minhdo38@gmail.com','$2a$05$kvX0KzLE4nkS1vnL6FcH5.8odXMnPxIWIfeNdLWCodccHjgZb4Av2','TP Hồ Chí Minh ','email@gmail.com','default_facebook_url','default_google_url','0999999999','male','2001-03-17','USER','Đỗ Ngọc Minh '),(20,'thuchoang90@gmail.com','$2a$05$p1h3oVLEk6ut/IfM2hf.5eHnWtp2lRaXcCfR2rOG52ij4OTdrtW3a','Cà Mau ','email@gmail.com','default_facebook_url','default_google_url','0999999999','male','2004-08-27','USER','Hoàng Đình Thức ');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-21  2:04:28
