CREATE DATABASE  IF NOT EXISTS `dbcertificados` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `dbcertificados`;
-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: dbcertificados
-- ------------------------------------------------------
-- Server version	5.7.33-log

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
-- Table structure for table `alunos`
--

DROP TABLE IF EXISTS `alunos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alunos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alunos`
--

LOCK TABLES `alunos` WRITE;
/*!40000 ALTER TABLE `alunos` DISABLE KEYS */;
INSERT INTO `alunos` VALUES (1,'João Pedro da Silva','2021-03-15 03:49:48','2021-03-15 03:49:48'),(2,'Maria Eduarda Gonzales','2021-03-15 03:50:04','2021-03-15 03:50:04'),(3,'Enzo José Ribeiro Dantas da Cunha Barros','2021-03-15 03:50:15','2021-03-15 03:50:15'),(4,'Raphaela Albuquerque Lima Ribeiro Dantas Junior','2021-03-15 03:50:32','2021-03-15 03:50:32'),(5,'Betânea Alfreda do Santos Almeida','2021-03-15 03:50:43','2021-03-15 03:50:43'),(6,'Carlos Chagas Costa','2021-03-15 03:51:05','2021-03-15 03:51:05');
/*!40000 ALTER TABLE `alunos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `imagem` blob,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` VALUES (1,'Português',_binary 'fundo_01.jpg','2021-03-15 04:10:00','2021-03-15 04:10:00'),(2,'Matemática',_binary 'fundo_02.jpg','2021-03-15 04:10:19','2021-03-15 04:10:19'),(3,'Informática',_binary 'fundo_03.jpg','2021-03-15 04:10:32','2021-03-15 04:10:32'),(4,'Geografia',_binary 'fundo_04.jpg','2021-03-15 04:13:36','2021-03-15 04:13:36'),(5,'História',_binary 'fundo_05.jpg','2021-03-15 04:13:56','2021-03-15 04:13:56');
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relacoes`
--

DROP TABLE IF EXISTS `relacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relacoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idaluno` int(11) NOT NULL,
  `idcurso` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idaluno` (`idaluno`),
  KEY `idcurso` (`idcurso`),
  CONSTRAINT `relacoes_ibfk_1` FOREIGN KEY (`idaluno`) REFERENCES `alunos` (`id`),
  CONSTRAINT `relacoes_ibfk_2` FOREIGN KEY (`idcurso`) REFERENCES `cursos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relacoes`
--

LOCK TABLES `relacoes` WRITE;
/*!40000 ALTER TABLE `relacoes` DISABLE KEYS */;
/*!40000 ALTER TABLE `relacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dbcertificados'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-15 10:08:59
