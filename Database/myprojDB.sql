-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: gofreshdb
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas` (
  `area_id` int NOT NULL AUTO_INCREMENT,
  `area_name` varchar(45) NOT NULL,
  `city_id` int NOT NULL,
  PRIMARY KEY (`area_id`),
  UNIQUE KEY `area_name_UNIQUE` (`area_name`),
  KEY `FKme0tu6jvrflho5lmhptod99w` (`city_id`),
  CONSTRAINT `FKme0tu6jvrflho5lmhptod99w` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas`
--

LOCK TABLES `areas` WRITE;
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
INSERT INTO `areas` VALUES (1,'Hinjewadi',1),(2,'Kothrud',1),(3,'Dadar',2);
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `cart_item_id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `vendor_id` int NOT NULL,
  PRIMARY KEY (`cart_item_id`),
  KEY `vendor_id_fk2_idx` (`vendor_id`),
  KEY `cart_id_fk_idx` (`cart_id`),
  KEY `pid_fk_idx` (`product_id`),
  CONSTRAINT `cart_fk` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`),
  CONSTRAINT `pid_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`prod_id`),
  CONSTRAINT `vendor_id_fk2` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `user_id_fk3_idx` (`user_id`),
  CONSTRAINT `user_id_fk3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,1,'ACTIVE');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `cat_id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cat_id`),
  UNIQUE KEY `cat_name_UNIQUE` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (2,'Fruits'),(1,'Vegetables');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `city_id` int NOT NULL AUTO_INCREMENT,
  `city_name` varchar(45) NOT NULL,
  PRIMARY KEY (`city_id`),
  UNIQUE KEY `city_name_UNIQUE` (`city_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (2,'Mumbai'),(1,'Pune');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `order_details_id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `qty` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`order_details_id`),
  KEY `cart_id_fk_idx` (`cart_id`),
  KEY `user_id_fk_idx` (`user_id`),
  CONSTRAINT `cart_id_fk` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `cart_id` int NOT NULL,
  PRIMARY KEY (`order_item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_detail_id` int NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `order_detail_id_fk_idx` (`order_detail_id`),
  CONSTRAINT `order_detail_id_fk` FOREIGN KEY (`order_detail_id`) REFERENCES `order_details` (`order_details_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_modes`
--

DROP TABLE IF EXISTS `payment_modes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_modes` (
  `pay_mode_id` int NOT NULL AUTO_INCREMENT,
  `payment_method` varchar(45) NOT NULL,
  PRIMARY KEY (`pay_mode_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_modes`
--

LOCK TABLES `payment_modes` WRITE;
/*!40000 ALTER TABLE `payment_modes` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_modes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `prod_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) DEFAULT NULL,
  `cat_id` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image_url` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`prod_id`),
  KEY `cat_id_idx` (`cat_id`),
  CONSTRAINT `cat_id` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Tomato',1,'Fresh organic tomatoes',NULL),(2,'Potato',2,'Fresh farm potatoes','potato.jpg'),(3,'Apple',1,'Sweet red apples','apple.jpg'),(4,'Carrot',2,'Crunchy orange carrots','carrot.jpg'),(5,'Banana',1,'Ripe yellow bananas','banana.jpg'),(6,'Tomato',2,'Juicy red tomatoes','tomato.jpg'),(7,'Mango',1,'Seasonal fresh mangoes','mango.jpg'),(8,'Spinach',2,'Green leafy spinach','spinach.jpg'),(9,'Orange',1,'Citrus oranges full of vitamin C','orange.jpg'),(11,'Grapes',1,'Fresh green grapes','grapes.jpg'),(12,'Onion',2,'Strong flavored onions','onion.jpg'),(13,'Pineapple',1,'Sweet pineapple slices','pineapple.jpg'),(14,'Cauliflower',2,'White cauliflower head','cauliflower.jpg'),(15,'Papaya',1,'Fresh papaya fruit','papaya.jpg'),(16,'Brinjal',2,'Purple brinjal vegetable','brinjal.jpg'),(17,'Potato',2,'Fresh farm potatoes','potato.jpg'),(18,'Apple',1,'Sweet red apples','apple.jpg'),(19,'Carrot',2,'Crunchy orange carrots','carrot.jpg'),(20,'Banana',1,'Ripe yellow bananas','banana.jpg'),(21,'Tomato',2,'Juicy red tomatoes','tomato.jpg'),(22,'Mango',1,'Seasonal fresh mangoes','mango.jpg'),(23,'Spinach',2,'Green leafy spinach','spinach.jpg'),(24,'Orange',1,'Citrus oranges full of vitamin C','orange.jpg'),(25,'Cabbage',2,'Healthy green cabbage','cabbage.jpg'),(26,'Grapes',1,'Fresh green grapes','grapes.jpg'),(27,'Onion',2,'Strong flavored onions','onion.jpg'),(28,'Pineapple',1,'Sweet pineapple slices','pineapple.jpg'),(30,'Papaya',1,'Fresh papaya fruit','papaya.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `rating_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `rating` int NOT NULL,
  PRIMARY KEY (`rating_id`),
  KEY `user_id_idx` (`user_id`),
  KEY `vendor_id_idx` (`vendor_id`),
  CONSTRAINT `users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `vendors_id` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL,
  `role_name` varchar(50) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name_UNIQUE` (`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(3,'Customer'),(2,'Vendor');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stocks`
--

DROP TABLE IF EXISTS `stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stocks` (
  `stock_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `price` double DEFAULT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`stock_id`),
  KEY `FKff7be959jyco0iukc1dcjj9qm` (`product_id`),
  KEY `FK2i4qq02cn39iil6al6xlwjdmh` (`vendor_id`),
  CONSTRAINT `FK2i4qq02cn39iil6al6xlwjdmh` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_id`),
  CONSTRAINT `FKff7be959jyco0iukc1dcjj9qm` FOREIGN KEY (`product_id`) REFERENCES `products` (`prod_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocks`
--

LOCK TABLES `stocks` WRITE;
/*!40000 ALTER TABLE `stocks` DISABLE KEYS */;
INSERT INTO `stocks` VALUES (1,1,2,100,100);
/*!40000 ALTER TABLE `stocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(60) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `phone_number` varchar(15) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password_hash` varchar(300) NOT NULL,
  `role_id` int NOT NULL,
  `IsActive` bit(1) DEFAULT b'1',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `phone_number_UNIQUE` (`phone_number`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `role_id_idx` (`role_id`),
  CONSTRAINT `rrrole` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'y1234','Yadnesh','Patil','12345','y123@gmail.com','12345',2,_binary '\0'),(2,'sha132','Shashank','Dubey','12234','sha123@gmail.com','12345',3,_binary ''),(3,'pra321','Pranjali','Sharma','1252345',NULL,'1234',1,_binary ''),(4,'anu567','Anuj','Chavhan','123445',NULL,'12345',1,_binary ''),(5,'vendor_rahul','Rahul','Patil','9876543210','rahul.patil@gmail.com','plain_password_for_now',2,_binary '\0'),(6,'vendor_rahul2222','Raju','Patil','9876243210','rahull.patil@gmail.com','plain_password_for_now',2,_binary '\0'),(7,'vendor_user_1','Ramesh','Patil','187699910','rameessh@gmail.com','test@123',2,_binary '\0'),(8,'vendor_user_2','Ramesh','Patil','187695910','rameessh2@gmail.com','test@123',2,_binary '\0'),(11,'vendor_user_3','Ramesh2','Patil','1876999108','rameessh3@gmail.com','test@123',2,_binary '\0'),(12,'abc','abc','abc','123','abc','123',1,_binary '\0'),(13,'abcde','praj','','1234','praj@gmail.com','1234',1,_binary ''),(15,'dubeyji','Shashank2','Dubey','1234567','sha12345@gmail.com','123',2,_binary ''),(18,'hello','hello','w','1234567890','hell@gmail.com','1234',2,_binary ''),(21,'hello25','hello26','w34','1234887890','hell3@gmail.com','123',2,_binary ''),(22,'hello2577','hellooo','world','9364269319','helloworld@gmail.com','1234',3,_binary '');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendors` (
  `vendor_id` int NOT NULL AUTO_INCREMENT,
  `business_reg_no` varchar(50) NOT NULL,
  `business_name` varchar(100) NOT NULL,
  `area_id` int NOT NULL,
  `user_id` int NOT NULL,
  `is_approved` bit(1) DEFAULT b'0',
  `is_active` bit(1) DEFAULT b'1',
  PRIMARY KEY (`vendor_id`),
  UNIQUE KEY `aadhar_number_UNIQUE` (`business_reg_no`),
  KEY `area_id_fk_idx` (`area_id`),
  KEY `user_id_fk_idx` (`user_id`),
  CONSTRAINT `area_id_fk` FOREIGN KEY (`area_id`) REFERENCES `areas` (`area_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` VALUES (1,'BUS-PN-2025-004','Yadnesh Electronics',1,2,_binary '',_binary '\0'),(2,'BUS-MH-2025-004','PureEarth Store',1,3,_binary '',_binary ''),(3,'BUS-PN-2025-003','Shivaji Grocery Store',1,4,_binary '',_binary '\0'),(4,'BUS-PN-2026-005','Green Fresh Mart',1,1,_binary '',_binary '\0'),(5,'BUS-ABC-2026-006','FreshMart',1,1,_binary '',_binary '\0'),(6,'BUS-ABC-2026-007','FreshMart2',1,1,_binary '',_binary '\0');
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-02 14:10:19
