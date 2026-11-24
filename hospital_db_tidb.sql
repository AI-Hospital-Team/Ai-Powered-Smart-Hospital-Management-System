-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: hospital_db
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Current Database: `hospital_db`
--


USE `hospital_db`;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `appointment_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `reason` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`appointment_id`),
  KEY `patient_id` (`patient_id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`),
  CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`doctor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,1,1,'2026-08-26','11:11:00','Cancelled','fever'),(2,1,1,'2026-09-03','03:44:00','Cancelled','â€œDoctor, Iâ€™ve been experiencing hair fall recently. Iâ€™m losing more hair than usual, especially when I comb or wash it.â€'),(4,3,2,'2026-09-12','11:15:00','Cancelled','Fever And Cough'),(5,1,2,'2026-09-18','23:18:00','Cancelled','Weakness'),(6,1,3,'2026-09-18','11:36:00','Completed','Cough'),(7,1,3,'2026-09-23','10:45:00','Expired','Teeth Checkup');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bills` (
  `bill_id` int NOT NULL AUTO_INCREMENT,
  `amount` decimal(38,2) DEFAULT NULL,
  `bill_date` date NOT NULL,
  `bill_type` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `doctor_id` int DEFAULT NULL,
  `patient_id` int NOT NULL,
  `patient_name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`bill_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
INSERT INTO `bills` VALUES (1,500.00,'2026-08-28','Consultation','Thank You.',1,1,'Radheshyam Wayak','Paid'),(2,1000.00,'2026-09-03','Hospital Service','',1,1,'Radheshyam Wayak','Paid'),(3,1000.00,'2026-09-10','Medicine','Pay',2,1,'Radheshyam Wayal','Paid'),(4,333.00,'2026-09-11','Room Charges','Rest',2,3,'Prathmesh Panmand','Paid'),(5,1000.00,'2026-09-25','Consultation','',3,3,'Prathmesh Panmand','Paid'),(6,2000.00,'2026-09-25','Medicine','Test Bill Payment.',2,3,'Prathmesh Panmand','Paid'),(7,500000.00,'2026-09-29','Surgery','',2,3,'Prathmesh Panmand','Paid');
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_approval_logs`
--

DROP TABLE IF EXISTS `doctor_approval_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_approval_logs` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `action` varchar(255) NOT NULL,
  `action_date_time` datetime(6) NOT NULL,
  `doctor_id` int DEFAULT NULL,
  `doctor_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_approval_logs`
--

LOCK TABLES `doctor_approval_logs` WRITE;
/*!40000 ALTER TABLE `doctor_approval_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `doctor_approval_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors` (
  `doctor_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `medical_registration_no` varchar(255) DEFAULT NULL,
  `hospital_association` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `shift` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (1,'Radheshyam Wayal','General Medicine','9876543211','radheshyam.doctor@gmail.com',NULL,NULL,NULL,'APPROVED',NULL,NULL,NULL,'DAY'),(2,'Dr.Rahul Patil','Cardiologist',NULL,NULL,NULL,NULL,NULL,'APPROVED',NULL,NULL,NULL,'NIGHT'),(3,'Dr Sneha Kulkarni','Pediatrician','6788888888','sneha@gmail.com','MBBS','1','Smart Hospital','APPROVED',NULL,NULL,NULL,'DAY'),(4,'Test Doctor','Cardiologist','9876543210','testdoctor@gmail.com','MBBS, MD','TEST123456','ABC Hospital','REJECTED','2001-02-21','male','Pune, Maharashtra','NIGHT');
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_records`
--

DROP TABLE IF EXISTS `medical_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_records` (
  `record_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `diagnosis` varchar(255) DEFAULT NULL,
  `treatment` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `record_date` date NOT NULL,
  `symptoms` varchar(255) DEFAULT NULL,
  `follow_up_date` date DEFAULT NULL,
  PRIMARY KEY (`record_id`),
  KEY `patient_id` (`patient_id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `medical_records_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`),
  CONSTRAINT `medical_records_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`doctor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_records`
--

LOCK TABLES `medical_records` WRITE;
/*!40000 ALTER TABLE `medical_records` DISABLE KEYS */;
INSERT INTO `medical_records` VALUES (6,3,3,'Malaria','Artemisinin-based combination therapies (ACTs)','Take Precaution , Proper Rest.','2026-09-20','fever, chills, headaches, and muscle aches.','2026-09-21');
/*!40000 ALTER TABLE `medical_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `is_read` bit(1) NOT NULL,
  `reference_id` int DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`notification_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,'2026-09-18 22:41:59.034923','A new patient appointment has been booked for 2026-09-23 at 10:45.',_binary '',7,'DOCTOR','New Appointment Booked','APPOINTMENT_BOOKED',20),(2,'2026-09-18 22:41:59.067883','A new appointment has been booked in the hospital system.',_binary '',7,'ADMIN','New Appointment','NEW_APPOINTMENT',6),(3,'2026-09-20 11:55:54.962769','A new prescription has been added to your medical records.',_binary '\0',3,'PATIENT','New Prescription Added','PRESCRIPTION_ADDED',3),(4,'2026-09-20 19:06:19.710192','Your appointment has been confirmed for 2026-09-23 at 10:45.',_binary '',7,'PATIENT','Appointment Confirmed','APPOINTMENT_CONFIRMED',4),(5,'2026-09-21 07:22:43.981743','Your follow-up date is today. Please consult your doctor for your scheduled follow-up.',_binary '',6,'PATIENT','Follow-up Reminder','FOLLOW_UP_REMINDER',7),(6,'2026-09-21 07:22:44.058745','A patient\'s scheduled follow-up date is today. Please review the patient\'s medical record.',_binary '',6,'DOCTOR','Patient Follow-up Reminder','FOLLOW_UP_REMINDER',20),(7,'2026-09-22 15:09:37.919744','Reminder: You have an appointment tomorrow at 10:45.',_binary '',7,'PATIENT','Appointment Tomorrow','APPOINTMENT_TOMORROW',4),(8,'2026-09-22 15:09:38.045738','You have a patient appointment tomorrow at 10:45.',_binary '',7,'DOCTOR','Appointment Tomorrow','APPOINTMENT_TOMORROW',20),(9,'2026-09-23 10:55:15.372946','Your appointment scheduled for 2026-09-23 at 10:45 has expired because the scheduled time has passed.',_binary '',7,'PATIENT','Appointment Expired','APPOINTMENT_EXPIRED',4),(10,'2026-09-23 10:55:15.428978','A patient appointment scheduled for 2026-09-23 at 10:45 has expired because the scheduled time has passed.',_binary '',7,'DOCTOR','Appointment Expired','APPOINTMENT_EXPIRED',20),(11,'2026-09-23 10:55:15.447674','An appointment scheduled for 2026-09-23 at 10:45 has expired.',_binary '',7,'ADMIN','Appointment Expired','APPOINTMENT_EXPIRED',6),(12,'2026-09-23 11:43:30.514916','A new prescription has been added to your medical records.',_binary '',4,'PATIENT','New Prescription Added','PRESCRIPTION_ADDED',7),(13,'2026-09-24 11:49:07.504465','Your prescription reaches its end date today. Please consult your doctor before continuing or changing your medication.',_binary '',4,'PATIENT','Prescription End Date','PRESCRIPTION_END_DATE',7),(14,'2026-09-25 12:32:45.911213','You have a pending bill of â‚¹1000.',_binary '\0',5,'PATIENT','Pending Bill','BILL_PENDING',3),(15,'2026-09-25 12:34:40.044844','Your bill of â‚¹1000.00 has been marked as paid.',_binary '\0',5,'PATIENT','Bill Paid','BILL_PAID',3),(16,'2026-09-25 12:44:25.930535','You have a pending bill of â‚¹2000.',_binary '\0',6,'PATIENT','Pending Bill','BILL_PENDING',3),(17,'2026-09-29 21:08:55.729362','You have a pending bill of â‚¹500000.',_binary '\0',7,'PATIENT','Pending Bill','BILL_PENDING',3),(18,'2026-10-19 20:58:19.839462','Your bill of â‚¹2000.00 has been marked as paid.',_binary '\0',6,'PATIENT','Bill Paid','BILL_PAID',3),(19,'2026-10-19 20:58:23.116269','Your bill of â‚¹500000.00 has been marked as paid.',_binary '\0',7,'PATIENT','Bill Paid','BILL_PAID',3);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_otp`
--

DROP TABLE IF EXISTS `password_reset_otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_otp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `expires_at` datetime(6) NOT NULL,
  `otp` varchar(255) NOT NULL,
  `used` bit(1) NOT NULL,
  `verified` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_otp`
--

LOCK TABLES `password_reset_otp` WRITE;
/*!40000 ALTER TABLE `password_reset_otp` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_otp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_requests`
--

DROP TABLE IF EXISTS `password_reset_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_requests` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `request_code` varchar(255) NOT NULL,
  `requested_at` datetime(6) NOT NULL,
  `reviewed_at` datetime(6) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`request_id`),
  UNIQUE KEY `UKsjbrn3wj5abea48jqqdw9j90` (`request_code`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_requests`
--

LOCK TABLES `password_reset_requests` WRITE;
/*!40000 ALTER TABLE `password_reset_requests` DISABLE KEYS */;
INSERT INTO `password_reset_requests` VALUES (1,'radheshyam@gmail.com','5C9FCD97','2026-09-22 21:46:08.867270','2026-09-22 22:15:30.565921','Patient','REJECTED'),(2,'prathmeshpatient@gmail.com','3760C971','2026-09-22 21:56:45.639512','2026-09-22 21:57:56.646977','Patient','COMPLETED'),(3,'radheshyam.doctor@gmail.com','727AC398','2026-09-22 22:11:18.047018','2026-09-22 22:15:29.531618','Doctor','REJECTED'),(4,'prathmeshpatient@gmail.com','CDFAF1A7','2026-09-22 22:14:21.925692','2026-09-22 22:15:27.803702','Patient','REJECTED'),(5,'prathmeshpatient@gmail.com','CF4FF27C','2026-09-22 22:15:49.167076','2026-09-22 22:16:54.239921','Patient','REJECTED'),(6,'prathmeshpatient@gmail.com','142CF307','2026-09-22 22:17:05.081761','2026-09-22 23:23:17.848097','Patient','REJECTED'),(7,'prathmeshpatient@gmail.com','60E70AD8','2026-09-26 22:45:45.989600','2026-09-26 22:46:29.000902','Patient','REJECTED');
/*!40000 ALTER TABLE `password_reset_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `patient_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `blood_group` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  PRIMARY KEY (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (1,'Radheshyam Wayal',20,'Male','8806735406','radheshyam@gmail.com','Pune, Maharashtra','O+','2006-09-03'),(3,'Prathmesh Panmand',NULL,'male','7237273727','prathmeshpatient@gmail.com',NULL,NULL,'2006-05-23'),(13,'Test',7,'male','8888888888','test@gmail.com','..','B-','2019-05-13'),(14,'Tests',0,'other','6777777777','tests@gmail.com','mmmm','O-','2026-09-09');
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescriptions`
--

DROP TABLE IF EXISTS `prescriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescriptions` (
  `prescription_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `medicine_name` varchar(255) NOT NULL,
  `dosage` varchar(255) DEFAULT NULL,
  `instructions` varchar(1000) DEFAULT NULL,
  `prescription_date` date NOT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `frequency` varchar(255) DEFAULT NULL,
  `diagnosis` varchar(255) DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  PRIMARY KEY (`prescription_id`),
  KEY `patient_id` (`patient_id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `prescriptions_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`),
  CONSTRAINT `prescriptions_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`doctor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescriptions`
--

LOCK TABLES `prescriptions` WRITE;
/*!40000 ALTER TABLE `prescriptions` DISABLE KEYS */;
/*!40000 ALTER TABLE `prescriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `patient_id` int DEFAULT NULL,
  `doctor_id` int DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `patient_id` (`patient_id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`),
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`doctor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'radheshyam@gmail.com','patient@123','Patient',1,NULL,'ACTIVE'),(5,'radheshyam.doctor@gmail.com','doctor@123','Doctor',NULL,1,'ACTIVE'),(6,'radheshyam.admin@gmail.com','admin@123','Admin',NULL,NULL,'ACTIVE'),(7,'prathmeshpatient@gmail.com','Panmand@123','Patient',3,NULL,'ACTIVE'),(9,'rahul.doctor@test.com','Doctor@123','Doctor',NULL,2,'ACTIVE'),(18,'test@gmail.com','Test@123','Patient',13,NULL,'ACTIVE'),(19,'tests@gmail.com','Tewr@123','Patient',14,NULL,'ACTIVE'),(20,'sneha@gmail.com','Sneha@123','Doctor',NULL,3,'ACTIVE'),(21,'testdoctor@gmail.com','Doctor@123','Doctor',NULL,4,'REJECTED');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'hospital_db'
--

--
-- Dumping routines for database 'hospital_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-24 20:00:42
