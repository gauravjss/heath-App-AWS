-- phpMyAdmin SQL Dump
-- version 4.4.7
-- http://www.phpmyadmin.net
--
-- Host: aa10qbzke1jk3yp.cxgqc3vzpduv.us-east-1.rds.amazonaws.com:3306
-- Generation Time: Feb 29, 2016 at 02:18 AM
-- Server version: 5.6.23-log
-- PHP Version: 5.5.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ebdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `adherence_log`
--

CREATE TABLE IF NOT EXISTS `adherence_log` (
  `Adherance_Key` int(11) NOT NULL,
  `Reminder_Key` int(11) NOT NULL,
  `Drug_Time` varchar(20) NOT NULL,
  `Is_Taken` tinyint(1) NOT NULL,
  `Is_Missed` tinyint(1) NOT NULL,
  `Missed_Reason` varchar(30) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `adherence_log`
--

INSERT INTO `adherence_log` (`Adherance_Key`, `Reminder_Key`, `Drug_Time`, `Is_Taken`, `Is_Missed`, `Missed_Reason`) VALUES
(1, 5, '8:30 AM', 1, 0, 'No Reason'),
(2, 15, '12:00 PM', 1, 0, 'Forgot'),
(3, 15, '04:00 PM', 1, 0, ''),
(4, 17, '09:00 AM', 0, 1, ''),
(5, 17, '12:00 PM', 1, 0, ''),
(6, 18, '07:00 AM', 0, 1, ''),
(7, 18, '', 1, 0, 'Dr.''s Request'),
(8, 6, '07:00 PM', 1, 0, 'Forgot'),
(9, 6, '', 0, 1, 'Forgot'),
(10, 5, '02:00 PM', 1, 0, 'Forgot'),
(11, 6, '04:00 PM', 0, 1, 'Forgot'),
(12, 15, '', 0, 1, 'Forgot'),
(13, 12, '03:00 AM', 1, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `clinic_master`
--

CREATE TABLE IF NOT EXISTS `clinic_master` (
  `Clinic_Id` int(11) NOT NULL,
  `Clinic_Name` varchar(40) NOT NULL,
  `About_Clinic` text NOT NULL,
  `Address` text NOT NULL,
  `Phone` varchar(15) NOT NULL,
  `Phone_Secondary` varchar(15) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Email_Secondary` varchar(50) NOT NULL,
  `Drug_Store` tinyint(1) NOT NULL DEFAULT '0',
  `Oxygen` tinyint(1) NOT NULL DEFAULT '0',
  `Assistive` tinyint(1) NOT NULL DEFAULT '0',
  `Open247` tinyint(1) NOT NULL DEFAULT '0',
  `Lat_Long` varchar(25) NOT NULL,
  `CreatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `clinic_master`
--

INSERT INTO `clinic_master` (`Clinic_Id`, `Clinic_Name`, `About_Clinic`, `Address`, `Phone`, `Phone_Secondary`, `Email`, `Email_Secondary`, `Drug_Store`, `Oxygen`, `Assistive`, `Open247`, `Lat_Long`, `CreatedOn`, `UpdatedOn`) VALUES
(2, 'John''s Clinic', 'Multipurpose CLinic', '{"address1":"Line1","address2":"","state":"Test","city":"Stes","zip":"1232112"}', '12323211312', '', 'dd@dd.com', '', 1, 1, 1, 0, '', '2016-02-22 13:16:36', '2016-02-22 13:16:36'),
(3, 'Kate''s Pharmacy', 'General', '{"address1":"#2, Florence Park","address2":"Sector 21","state":"US","city":"New York","zip":"231103921"}', '2123211221', '', '', '', 0, 1, 1, 0, '', '2016-02-23 06:30:25', '2016-02-23 06:30:25');

-- --------------------------------------------------------

--
-- Table structure for table `drug_master`
--

CREATE TABLE IF NOT EXISTS `drug_master` (
  `Drug_Key` int(11) NOT NULL,
  `Drug_Name` varchar(50) NOT NULL,
  `Drug_Code` varchar(20) NOT NULL,
  `Drug_Power` varchar(10) NOT NULL,
  `Drug_Company` varchar(50) NOT NULL,
  `Drug_Appearance` varchar(30) NOT NULL,
  `Drug_Shape` varchar(30) NOT NULL,
  `Drug_Side` varchar(30) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `drug_master`
--

INSERT INTO `drug_master` (`Drug_Key`, `Drug_Name`, `Drug_Code`, `Drug_Power`, `Drug_Company`, `Drug_Appearance`, `Drug_Shape`, `Drug_Side`) VALUES
(1, 'T-Cort', '5639287639', '100 mg', 'Prasco Laboratories (on market)', 'black, cream, opaque', 'Capsule shaped', 'side 1:93'),
(2, 'Tadaliloral', '5639287623', '200 mg', 'Novartis', 'white, cream, transparent', 'Oval', 'side 1:87'),
(3, 'Talwin NX Oral', '2387564738', '500 mg', 'Zandu Pharmaceuticals', 'pale yellow, opaque', 'Round Shaped', 'side 1:89'),
(4, 'Cheston Cold', '5647382387', '350 mg', 'Novartis', 'white, texture, oval', 'Oval', 'side 1:99'),
(5, 'T-Cort', '5639287222', '500 mg', 'Prasco Laboratories (on market)', 'black, cream, opaque', 'Capsule shaped', 'side 1:93'),
(6, 'Cheston Cold', '5647382211', '200 mg', 'Novartis', 'white, texture, oval', 'Oval', 'side 1:99');

-- --------------------------------------------------------

--
-- Table structure for table `patient_bpm_master`
--

CREATE TABLE IF NOT EXISTS `patient_bpm_master` (
  `Bpm_Record_Id` int(11) NOT NULL,
  `Patient_Id` int(11) NOT NULL,
  `Heart_Rate` varchar(15) NOT NULL,
  `Unit` varchar(15) NOT NULL,
  `Activity` text NOT NULL,
  `CreatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patient_bpm_master`
--

INSERT INTO `patient_bpm_master` (`Bpm_Record_Id`, `Patient_Id`, `Heart_Rate`, `Unit`, `Activity`, `CreatedOn`) VALUES
(2, 59, '140', 'bpm', 'Climbing Stairs', '2015-11-24 06:42:30'),
(3, 59, '120', 'bpm', 'Rest', '2015-11-24 06:43:25'),
(4, 59, '100', 'bpm', '0', '2015-11-24 06:43:42'),
(5, 73, '85', 'bpm', 'Resting', '2015-11-24 08:25:56'),
(6, 59, '180', 'bpm', '0', '2015-11-24 12:56:54'),
(7, 59, '100', 'bpm', '0', '2015-11-24 13:53:29'),
(8, 59, '150', 'bpm', 'Jogging', '2015-11-24 14:33:49'),
(9, 69, '90', 'bpm', 'jog', '2015-11-24 14:48:38'),
(11, 68, '55', 'bpm', 'Jogging', '2015-12-09 11:51:45'),
(12, 68, '77', 'bpm', '0', '2015-12-11 13:46:54'),
(15, 90, '80', 'bpm', 'rest', '2016-01-06 13:03:05');

-- --------------------------------------------------------

--
-- Table structure for table `patient_bp_master`
--

CREATE TABLE IF NOT EXISTS `patient_bp_master` (
  `Bp_Record_Id` int(11) NOT NULL,
  `Patient_Id` int(11) NOT NULL,
  `Systolic` varchar(15) NOT NULL,
  `Diastolic` varchar(15) NOT NULL,
  `Unit` varchar(15) NOT NULL,
  `Heart_Rate` varchar(15) NOT NULL,
  `Heart_Rate_Unit` varchar(15) NOT NULL,
  `CreatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patient_bp_master`
--

INSERT INTO `patient_bp_master` (`Bp_Record_Id`, `Patient_Id`, `Systolic`, `Diastolic`, `Unit`, `Heart_Rate`, `Heart_Rate_Unit`, `CreatedOn`) VALUES
(1, 89, '120', '90', 'mmHg', '45', 'bpm', '2015-11-23 13:51:13'),
(2, 89, '145', '90', 'mmHg', '0', 'bpm', '2015-11-23 13:53:37'),
(3, 89, '145', '99', 'mmHg', '77', 'bpm', '2015-11-23 14:03:05'),
(5, 90, '140', '90', 'mmHg', '0', 'bpm', '2015-11-24 06:04:05'),
(6, 90, '120', '75', 'mmHg', '78', 'bpm', '2015-11-24 08:18:58'),
(7, 90, '130', '90', 'mmHg', '80', 'bpm', '2015-11-24 10:12:29'),
(8, 91, '120', '80', 'mmHg', '0', 'bpm', '2015-11-24 12:56:02'),
(9, 91, '130', '88', 'mmHg', '90', 'bpm', '2015-11-24 13:52:13'),
(10, 91, '120', '80', 'mmHg', '80', 'bpm', '2015-11-24 14:48:17'),
(11, 92, '120', '80', 'mmHg', '100', 'bpm', '2015-11-26 12:52:36'),
(12, 92, '140', '90', 'mmHg', '0', 'bpm', '2015-11-26 12:52:54'),
(13, 92, '130', '85', 'mmHg', '0', 'bpm', '2015-11-26 12:53:13');

-- --------------------------------------------------------

--
-- Table structure for table `patient_glucose_master`
--

CREATE TABLE IF NOT EXISTS `patient_glucose_master` (
  `Glucose_Record_Id` int(11) NOT NULL,
  `Patient_Id` int(11) NOT NULL,
  `Glucose` varchar(15) NOT NULL,
  `Type` varchar(25) NOT NULL,
  `Unit` varchar(15) NOT NULL,
  `CreatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patient_glucose_master`
--

INSERT INTO `patient_glucose_master` (`Glucose_Record_Id`, `Patient_Id`, `Glucose`, `Type`, `Unit`, `CreatedOn`) VALUES
(3, 89, '140', 'P', 'mg/dl', '2015-11-24 06:04:22'),
(4, 89, '105', 'P', 'mg/dl', '2015-11-24 08:21:44'),
(5, 89, '90', 'F', 'mg/dl', '2015-11-24 08:23:33'),
(6, 90, '100', 'R', 'mg/dl', '2015-11-24 08:24:46'),
(7, 90, '150', 'R', 'mg/dl', '2015-11-24 12:56:26'),
(8, 90, '80', 'F', 'mg/dl', '2015-11-24 13:52:23'),
(9, 91, '100', 'P', 'mg/dl', '2015-11-24 14:27:09'),
(10, 91, '80', 'F', 'mg/dl', '2015-11-24 14:48:26'),
(11, 92, '90', 'F', 'mg/dl', '2015-11-26 12:52:01'),
(12, 92, '120', 'R', 'mg/dl', '2015-11-26 12:53:23'),
(13, 92, '120', 'R', 'mg/dl', '2015-11-26 12:53:37'),
(14, 89, '140', 'P', 'mg/dl', '2015-12-24 12:21:51'),
(15, 89, '100', 'F', 'mg/dl', '2015-12-24 12:22:08'),
(16, 92, '150', 'P', 'mg/dl', '2015-12-24 12:27:05'),
(17, 92, '70', 'F', 'mg/dl', '2015-12-24 12:27:11'),
(18, 92, '100', 'R', 'mg/dl', '2015-12-24 12:27:29'),
(19, 90, '120', 'R', 'mg/dl', '2015-12-24 12:27:45'),
(20, 90, '80', 'F', 'mg/dl', '2015-12-24 12:27:54'),
(21, 91, '180', 'P', 'mg/dl', '2015-12-24 12:28:13'),
(22, 91, '90', 'F', 'mg/dl', '2015-12-24 12:28:20'),
(23, 91, '100', 'R', 'mg/dl', '2015-12-24 12:28:28');

-- --------------------------------------------------------

--
-- Table structure for table `patient_height_master`
--

CREATE TABLE IF NOT EXISTS `patient_height_master` (
  `Height_Record_Id` int(11) NOT NULL,
  `Patient_Id` int(11) NOT NULL,
  `Height` varchar(15) NOT NULL,
  `Unit` varchar(15) NOT NULL,
  `CreatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patient_height_master`
--

INSERT INTO `patient_height_master` (`Height_Record_Id`, `Patient_Id`, `Height`, `Unit`, `CreatedOn`) VALUES
(20, 67, '176', 'Cms', '2015-11-21 05:11:49'),
(21, 67, '178', 'Cms', '2015-11-21 05:13:45'),
(27, 67, '178', 'Cms', '2015-11-21 13:25:11'),
(28, 67, '145', 'Cms', '2015-11-21 13:27:15'),
(29, 67, '178', 'Cms', '2015-11-23 08:51:49'),
(30, 59, '188', 'Cms', '2015-11-23 08:52:54'),
(31, 60, '178', 'Cms', '2015-11-23 10:14:38'),
(32, 60, '179', 'Cms', '2015-11-23 13:00:43'),
(33, 60, '178', 'Cms', '2015-11-23 13:01:43'),
(34, 60, '183', 'Cms', '2015-11-23 13:01:58'),
(35, 60, '199', 'Cms', '2015-11-23 13:02:14'),
(36, 60, '127', 'Cms', '2015-11-23 13:02:29'),
(37, 73, '167', 'Cms', '2015-11-24 08:14:26'),
(38, 73, '168', 'Cms', '2015-11-24 08:15:30'),
(39, 59, '178', 'Cms', '2015-11-24 13:51:53'),
(40, 69, '178', 'Cms', '2015-11-24 14:48:04'),
(41, 69, '188', 'Cms', '2015-11-24 15:08:48'),
(44, 68, '163', 'Cms', '2015-12-15 09:13:10'),
(45, 68, '168', 'Cms', '2015-12-15 09:20:42'),
(47, 89, '176', 'Cms', '2016-01-06 13:16:10');

-- --------------------------------------------------------

--
-- Table structure for table `patient_master`
--

CREATE TABLE IF NOT EXISTS `patient_master` (
  `Patient_Key` int(11) NOT NULL,
  `Patient_Id` varchar(25) CHARACTER SET latin1 DEFAULT NULL,
  `Chat_Id` varchar(25) NOT NULL,
  `Name` varchar(25) DEFAULT NULL,
  `Gender` varchar(15) DEFAULT NULL,
  `Phone` varchar(15) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `Address` text,
  `Credit_Card_Number` varchar(20) NOT NULL,
  `Blood_Group` varchar(15) DEFAULT NULL,
  `Rh_Factor` varchar(11) NOT NULL,
  `Problems` text NOT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `CreatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `patient_master`
--

INSERT INTO `patient_master` (`Patient_Key`, `Patient_Id`, `Chat_Id`, `Name`, `Gender`, `Phone`, `DOB`, `Address`, `Credit_Card_Number`, `Blood_Group`, `Rh_Factor`, `Problems`, `Email`, `Password`, `CreatedOn`, `UpdatedOn`) VALUES
(89, NULL, '7777286', 'Ani Clair', 'F', '+918888888888', '1989-02-14', '{"address1":"300 BOYLSTON AVE E","address2":"PO BOX 1022","state":"WA","city":"SEATTLE","zip":"98102"}', '', 'A', '+', '{"diabetes":true,"heart":true,"bp":false,"kidney":false,"asthama":false,"liver":false,"others":"Not Much"}', 'a@a.com', '54ec42ffb0d753', '2015-12-22 14:03:33', '2015-12-22 14:03:33'),
(90, NULL, '7777349', 'George Key', 'M', '+917878787878', '1988-10-20', '{"address1":"8752 Hartford Road","address2":"","state":"IL","city":"Park Ridge","zip":"60068"}', '', 'O', '-', '{"diabetes":true,"heart":true,"bp":true,"kidney":false,"asthama":false,"liver":false,"others":"Obesity"}', 'b@b.com', '54ec42ffb0d753', '2015-12-22 14:06:37', '2015-12-22 14:06:37'),
(91, NULL, '7777379', 'Rosy Singh', 'F', '+917454215478', '1994-05-23', '{"address1":"3230 Valley View Road","address2":"Lake View","state":"MA","city":"Dorchester Center","zip":"02124"}', '', 'AB', '+', '{"diabetes":false,"heart":false,"bp":true,"kidney":false,"asthama":false,"liver":false,"others":""}', 'c@c.com', '54ec42ffb0d753', '2015-12-22 14:08:06', '2015-12-22 14:08:06'),
(92, NULL, '7777415', 'Carol Dev', 'F', '+9195644221154', '1985-01-08', '{"address1":"3225 Main Street South","address2":"Godzilla View","state":"GA","city":"Columbus","zip":"31904"}', '', 'B', '+', '{"diabetes":false,"heart":false,"bp":true,"kidney":false,"asthama":false,"liver":false,"others":""}', 'd@d.com', '54ec42ffb0d753', '2015-12-22 14:09:51', '2015-12-22 14:09:51');

-- --------------------------------------------------------

--
-- Table structure for table `patient_professional_mapping`
--

CREATE TABLE IF NOT EXISTS `patient_professional_mapping` (
  `Patient_Professional_Id` int(11) NOT NULL,
  `Professional_Key` int(11) NOT NULL,
  `Patient_key` int(11) NOT NULL,
  `Approved` tinyint(1) NOT NULL DEFAULT '0',
  `Is_Deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patient_professional_mapping`
--

INSERT INTO `patient_professional_mapping` (`Patient_Professional_Id`, `Professional_Key`, `Patient_key`, `Approved`, `Is_Deleted`) VALUES
(27, 1, 66, 1, 0),
(28, 1, 67, 1, 0),
(34, 1, 70, 1, 0),
(39, 1, 60, 1, 0),
(40, 1, 71, 1, 0),
(41, 2, 72, 1, 0),
(43, 1, 73, 1, 0),
(49, 1, 61, 1, 0),
(50, 14, 78, 1, 0),
(57, 1, 79, 1, 0),
(62, 1, 59, 1, 0),
(63, 1, 69, 1, 0),
(67, 2, 68, 1, 0),
(68, 14, 68, 1, 0),
(69, 1, 68, 1, 0),
(71, 1, 80, 1, 0),
(72, 2, 80, 1, 0),
(74, 14, 80, 1, 0),
(75, 2, 69, 1, 0),
(76, 14, 69, 1, 0),
(79, 20, 80, 1, 0),
(80, 20, 68, 1, 0),
(81, 20, 69, 1, 0),
(82, 1, 88, 1, 0),
(84, 22, 89, 1, 0),
(85, 22, 68, 1, 0),
(86, 25, 68, 1, 0),
(87, 21, 68, 0, 0),
(88, 23, 68, 0, 0),
(89, 24, 68, 0, 0),
(90, 22, 91, 1, 0),
(91, 24, 91, 1, 0),
(92, 25, 91, 1, 0),
(93, 22, 92, 1, 0),
(94, 23, 92, 1, 0),
(95, 24, 92, 1, 0),
(96, 25, 92, 1, 0),
(97, 22, 90, 1, 0),
(98, 24, 90, 1, 0),
(99, 25, 90, 1, 0),
(100, 23, 89, 1, 0),
(101, 24, 89, 1, 0),
(102, 25, 89, 1, 0),
(103, 23, 91, 1, 0),
(104, 26, 89, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `patient_weight_master`
--

CREATE TABLE IF NOT EXISTS `patient_weight_master` (
  `Weight_Record_Id` int(11) NOT NULL,
  `Patient_Id` int(11) NOT NULL,
  `Weight` varchar(15) NOT NULL,
  `Unit` varchar(15) NOT NULL,
  `CreatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patient_weight_master`
--

INSERT INTO `patient_weight_master` (`Weight_Record_Id`, `Patient_Id`, `Weight`, `Unit`, `CreatedOn`) VALUES
(23, 67, '60', 'Kgs', '2015-11-21 05:10:26'),
(25, 67, '45', 'Kgs', '2015-11-21 05:13:45'),
(31, 67, '101', 'Kgs', '2015-11-21 13:25:11'),
(32, 67, '123', 'Kgs', '2015-11-21 13:27:15'),
(33, 67, '80', 'Kgs', '2015-11-23 08:51:49'),
(34, 59, '78', 'Kgs', '2015-11-23 08:52:54'),
(35, 60, '41', 'Kgs', '2015-11-23 10:14:53'),
(36, 60, '88', 'Kgs', '2015-11-23 13:00:56'),
(37, 60, '99', 'Kgs', '2015-11-23 13:01:43'),
(38, 60, '55', 'Kgs', '2015-11-23 13:01:58'),
(39, 60, '66', 'Kgs', '2015-11-23 13:02:14'),
(40, 60, '88', 'Kgs', '2015-11-23 13:02:29'),
(41, 60, '89', 'Kgs', '2015-11-23 13:13:35'),
(43, 59, '54', 'Kgs', '2015-11-24 06:03:35'),
(44, 73, '65', 'Kgs', '2015-11-24 08:14:47'),
(45, 73, '81', 'Kgs', '2015-11-24 08:16:29'),
(46, 73, '65.6', 'Kgs', '2015-11-24 08:25:16'),
(47, 59, '47', 'Kgs', '2015-11-24 12:55:44'),
(48, 59, '50', 'Kgs', '2015-11-24 12:56:39'),
(49, 59, '54', 'Kgs', '2015-11-24 13:53:20'),
(50, 69, '80', 'Kgs', '2015-11-24 14:48:04'),
(51, 69, '80', 'Kgs', '2015-11-24 15:08:48'),
(54, 68, '60', 'Kgs', '2015-12-09 11:51:17'),
(55, 68, '45', 'Kgs', '2015-12-15 09:13:10'),
(59, 89, '90', 'Kgs', '2016-01-06 13:16:10');

-- --------------------------------------------------------

--
-- Table structure for table `professional_clinic_mapping`
--

CREATE TABLE IF NOT EXISTS `professional_clinic_mapping` (
  `Prof_Clinic_Key` int(11) NOT NULL,
  `Professional_Key` int(11) NOT NULL,
  `Clinic_Id` int(11) NOT NULL,
  `Availability` text NOT NULL,
  `Is_Deleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `professional_clinic_mapping`
--

INSERT INTO `professional_clinic_mapping` (`Prof_Clinic_Key`, `Professional_Key`, `Clinic_Id`, `Availability`, `Is_Deleted`) VALUES
(4, 25, 3, '{"days":[{"day":"Mon","on":1,"shifts":[{"id":"1","shiftStart":"0830","shiftEnd":"1500"}]},{"day":"Tues","on":1,"shifts":[{"id":"1","shiftStart":"1030","shiftEnd":"1400"},{"id":2,"shiftStart":"1400","shiftEnd":"1530"}]},{"day":"Wed","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]},{"day":"Thurs","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]},{"day":"Fri","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]},{"day":"Sat","on":1,"shifts":[{"id":"1","shiftStart":"1300","shiftEnd":"1600"}]},{"day":"Sun","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]}]}', 0),
(5, 24, 3, '{"days":[{"day":"Mon","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]},{"day":"Tues","on":1,"shifts":[{"id":"1","shiftStart":"1430","shiftEnd":"1700"}]},{"day":"Wed","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]},{"day":"Thurs","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]},{"day":"Fri","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]},{"day":"Sat","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]},{"day":"Sun","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]}]}', 0),
(9, 22, 2, '{"days":[{"day":"Mon","on":1,"shifts":[{"id":"1","shiftStart":"1130","shiftEnd":"1400"},{"id":2,"shiftStart":"1430","shiftEnd":"1700"}]},{"day":"Tues","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]},{"day":"Wed","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]},{"day":"Thurs","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]},{"day":"Fri","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]},{"day":"Sat","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]},{"day":"Sun","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]}]}', 0),
(10, 22, 3, '{"days":[{"day":"Mon","on":1,"shifts":[{"id":"1","shiftStart":"1430","shiftEnd":"1500"}]},{"day":"Tues","on":0,"shifts":[{"id":"1","shiftStart":"0830","shiftEnd":"1330"}]},{"day":"Wed","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]},{"day":"Thurs","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]},{"day":"Fri","on":0,"shifts":[{"id":"1","shiftStart":"1100","shiftEnd":"1630"}]},{"day":"Sat","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]},{"day":"Sun","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]}]}', 0),
(11, 23, 2, '{"days":[{"day":"Mon","on":1,"shifts":[{"id":"1","shiftStart":"0800","shiftEnd":"1000"}]},{"day":"Tues","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]},{"day":"Wed","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]},{"day":"Thurs","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]},{"day":"Fri","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]},{"day":"Sat","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]},{"day":"Sun","on":0,"shifts":[{"id":"1","shiftStart":"","shiftEnd":""}]}]}', 0),
(12, 26, 2, '{"days":[{"day":"Mon","on":1,"shifts":[{"id":"1","shiftStart":"1400","shiftEnd":"1530"}]},{"day":"Tues","on":1,"shifts":[{"id":"1","shiftStart":"1530","shiftEnd":"1700"}]},{"day":"Wed","on":1,"shifts":[{"id":"1","shiftStart":"1500","shiftEnd":"1630"}]},{"day":"Thurs","on":1,"shifts":[{"id":"1","shiftStart":"1630","shiftEnd":"1700"}]},{"day":"Fri","on":1,"shifts":[{"id":"1","shiftStart":"1330","shiftEnd":"1700"}]},{"day":"Sat","on":1,"shifts":[{"id":"1","shiftStart":"1600","shiftEnd":"1700"}]},{"day":"Sun","on":1,"shifts":[{"id":"1","shiftStart":"1630","shiftEnd":"1700"},{"id":2,"shiftStart":"0830","shiftEnd":"1300"}]}]}', 0);

-- --------------------------------------------------------

--
-- Table structure for table `professional_details`
--

CREATE TABLE IF NOT EXISTS `professional_details` (
  `Prof_Details_Key` int(11) NOT NULL,
  `Professional_Key` int(11) NOT NULL,
  `Speciality` text NOT NULL,
  `Qualification` text NOT NULL,
  `Experience` text NOT NULL,
  `Phone_Secondary` varchar(15) NOT NULL,
  `Email_Secondary` varchar(50) NOT NULL,
  `About_Me` text NOT NULL,
  `Consultation_Fee` varchar(10) NOT NULL,
  `Chat_Fee` varchar(10) NOT NULL,
  `Address` text NOT NULL,
  `Bank_Name` varchar(25) NOT NULL,
  `Bank_Code` varchar(25) NOT NULL,
  `Bank_Account_Number` varchar(25) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `professional_details`
--

INSERT INTO `professional_details` (`Prof_Details_Key`, `Professional_Key`, `Speciality`, `Qualification`, `Experience`, `Phone_Secondary`, `Email_Secondary`, `About_Me`, `Consultation_Fee`, `Chat_Fee`, `Address`, `Bank_Name`, `Bank_Code`, `Bank_Account_Number`) VALUES
(7, 22, 'General Physician', 'MBBS, MD', '15 Years', '+823338383939', 'test@test.com', 'Magsaysay Award', '100', '50', '{"address1":"2885 Sanford Ave","address2":"SW #00000","state":"MI","city":"Grandville","zip":"49418"}', 'BOA', '911', '1232113123'),
(8, 23, 'Cardiologist', 'MBBS, MD, DCH', '20 Years', '', '', 'Lifetime Award', '120', '70', '{"address1":"5042 Wilshire","address2":"Blvd #00000","state":"CA","city":"Los Angeles","zip":"90036"}', 'AMEX', '245', '12321122213'),
(9, 24, 'Dietitian', 'DDC', '5 Years', '', '', 'Best Dietitian in District', '80', '40', '{"address1":"2637 E Atlantic","address2":"Blvd #00000","state":"FL","city":"Pompano Beach","zip":"33062"}', 'BOI', '145', '34323223423'),
(10, 25, 'Diabetologist', 'MBBS, MD, DDR', '15 Years', '', '', 'Best Surgery Award', '150', '70', '{"address1":"1501 1st Avenue S","address2":"Suite 600","state":"WA","city":"Seattle","zip":"98134"}', 'SBI', '1234', '768857556'),
(11, 26, 'Angioplasty, Heart Surgeory', 'MD-Cardiology', '20 Years', '', '', 'Research Fellow at MIT.', '100', '70', '{"address1":"Lane No. 2","address2":"","state":"MI","city":"California","zip":"92819"}', 'BOA', 'NSD', '44353434534');

-- --------------------------------------------------------

--
-- Table structure for table `professional_master`
--

CREATE TABLE IF NOT EXISTS `professional_master` (
  `Professional_Key` int(11) NOT NULL,
  `Name` varchar(25) NOT NULL,
  `Gender` varchar(2) NOT NULL,
  `Chat_Id` varchar(25) NOT NULL,
  `Phone` varchar(15) NOT NULL,
  `DOB` date DEFAULT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Password_Attempt` int(2) NOT NULL DEFAULT '0',
  `Is_Locked` tinyint(1) NOT NULL DEFAULT '0',
  `CreatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Role` varchar(10) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `professional_master`
--

INSERT INTO `professional_master` (`Professional_Key`, `Name`, `Gender`, `Chat_Id`, `Phone`, `DOB`, `Email`, `Password`, `Password_Attempt`, `Is_Locked`, `CreatedOn`, `UpdatedOn`, `Role`) VALUES
(15, 'Helpdesk', 'O', '', '7599314131', NULL, 'admin', '54ec42ffb0d753', 0, 0, '2015-11-05 10:42:32', '2015-11-05 10:42:32', 'H'),
(16, 'Molly', 'F', '7691983', '9599721180', '1990-05-07', 'Molly@gmail.com', '54ec42ffb0d753', 0, 0, '2015-12-18 13:21:39', '2015-12-18 13:21:39', 'HA'),
(22, 'John S', 'M', '7777517', '+917412547896', '1972-03-03', '1@1.com', '54ec42ffb0d753', 0, 0, '2015-12-22 14:16:05', '2015-12-22 14:16:05', 'D'),
(23, 'Ajay S', 'M', '7777663', '+912356478964', '1980-06-10', '2@2.com', '54ec42ffb0d753', 0, 0, '2015-12-22 14:25:20', '2015-12-22 14:25:20', 'D'),
(24, 'Sona K', 'F', '7777739', '+919562244475', '1984-01-09', '3@3.com', '54ec42ffb0d753', 0, 0, '2015-12-22 14:29:44', '2015-12-22 14:29:44', 'D'),
(25, 'Ram S', 'M', '7777804', '+915878451236', '1979-03-05', '4@4.com', '54ec42ffb0d753', 0, 0, '2015-12-22 14:33:38', '2015-12-22 14:33:38', 'D'),
(26, 'Jack Dawson', 'M', '8877303', '93829122183', '1982-06-23', 'jack@jack.com', '54ec42ffb0d753', 0, 0, '2016-02-03 08:46:07', '2016-02-03 08:46:07', 'D');

-- --------------------------------------------------------

--
-- Table structure for table `reminder_master`
--

CREATE TABLE IF NOT EXISTS `reminder_master` (
  `Reminder_Key` int(11) NOT NULL,
  `Patient_Key` int(11) NOT NULL,
  `Drug_Key` int(11) NOT NULL,
  `Morning_Time` varchar(20) NOT NULL,
  `Midday_Time` varchar(20) NOT NULL,
  `Evening_Time` varchar(20) NOT NULL,
  `Bed_Time` varchar(20) NOT NULL,
  `Custom_Time` varchar(20) NOT NULL,
  `Duration_Type` text NOT NULL,
  `Start_Day` date NOT NULL,
  `Is_Deleted` tinyint(1) NOT NULL DEFAULT '0',
  `Note` varchar(30) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reminder_master`
--

INSERT INTO `reminder_master` (`Reminder_Key`, `Patient_Key`, `Drug_Key`, `Morning_Time`, `Midday_Time`, `Evening_Time`, `Bed_Time`, `Custom_Time`, `Duration_Type`, `Start_Day`, `Is_Deleted`, `Note`) VALUES
(5, 89, 5, '06:30 AM', '02:00 PM', '', '', '', '{"Type":"Regular","Name":"Everyday","Value":""}', '2016-01-25', 0, 'my reminder'),
(6, 89, 3, '', '07:00 PM', '04:00 PM', '', '', '{"Type":"Regular","Name":"Everyday","Value":""}', '2016-01-22', 0, 'sdsddsd'),
(7, 89, 6, '05:00 AM', '02:00 PM', '', '', '', '{"Type":"Regular","Name":"Everyday","Value":""}', '2016-01-20', 1, 'my New Reminder'),
(8, 89, 3, '07:30 AM', '', '', '', '', '{"Type":"Regular","Name":"Everyday","Value":""}', '2016-01-20', 1, 'wcdwc'),
(9, 89, 5, '07:00 AM', '', '', '', '', '{"Type":"Regular","Name":"Everyday","Value":""}', '2016-02-21', 0, 'wdwd'),
(10, 89, 1, '09:00 AM', '', '', '', '', '{"Type":"Regular","Name":"Everyday","Value":""}', '2016-01-25', 1, 'scsc'),
(11, 89, 3, '09:00 AM', '12:00 PM', '', '', '', '{"Type":"Regular","Name":"Every Week","Value":""}', '2016-01-21', 1, 'qdqsds'),
(12, 89, 2, '', '03:00 AM', '05:00 PM', '', '', '{"Type":"Regular","Name":"Every Week","Value":""}', '2016-01-14', 0, 'weekly reminder'),
(13, 89, 5, '', '07:00 AM', '05:00 PM', '', '', '{"Type":"Regular","Name":"Every Month","Value":""}', '2015-12-23', 0, 'week'),
(14, 89, 1, '', '12:00 PM', '', '', '', '{"Type":"Regular","Name":"Every Week","Value":""}', '2016-01-21', 1, 'fdewrerer'),
(15, 89, 1, '', '12:00 PM', '', '', '', '{"Type":"Regular","Name":"Everyday","Value":""}', '2016-01-20', 0, 'wdwd'),
(16, 89, 4, '09:00 AM', '12:00 PM', '', '', '', '{"Type":"Regular","Name":"Everyday","Value":""}', '2016-01-21', 1, 'ewfew'),
(17, 89, 2, '09:00 AM', '12:00 PM', '', '', '', '{"Type":"Regular","Name":"Everyday","Value":""}', '2016-01-21', 1, 'wdwd'),
(18, 89, 2, '07:00 AM', '06:00 AM', '08:00 AM', '', '', '{"Type":"Regular","Name":"Everyday","Value":""}', '2016-01-27', 0, 'wqdd'),
(19, 89, 3, '06:00 AM', '01:00 PM', '09:00 PM', '', '', '{"Type":"Regular","Name":"Everyday","Value":""}', '2016-02-27', 0, 'wdwdd'),
(20, 89, 5, '05:30 AM', '02:30 PM', '05:30 PM', '', '', '{"Type":"Regular","Name":"Everyday","Value":""}', '2016-02-27', 0, ''),
(21, 89, 6, '07:00 AM', '03:00 PM', '05:00 PM', '', '', '{"Type":"Regular","Name":"Everyday","Value":""}', '2016-02-27', 0, 'wdwdwd'),
(22, 89, 4, '05:30 AM', '02:30 PM', '', '', '', '{"Type":"Regular","Name":"Everyday","Value":""}', '2016-01-27', 0, 'ssc'),
(23, 89, 2, '07:30 AM', '07:00 AM', '', '', '', '{"Type":"Regular","Name":"Every Week","Value":""}', '2016-02-27', 0, 'wdwd'),
(24, 89, 4, '03:30 AM', '03:00 PM', '06:00 PM', '', '', '{"Type":"Regular","Name":"Every Week","Value":""}', '2016-02-27', 0, 'fggbgbf'),
(25, 89, 4, '05:30 AM', '12:30 PM', '', '', '', '{"Type":"Regular","Name":"Every Month","Value":""}', '2016-02-27', 0, 'gtjn'),
(26, 89, 4, '05:30 AM', '12:30 PM', '', '', '', '{"Type":"Regular","Name":"Every Month","Value":""}', '2016-02-27', 0, 'gtjn'),
(27, 89, 2, '09:00 AM', '08:00 AM', '12:30 PM', '09:30 PM', '', '{"Type":"Regular","Name":"Every Week","Value":""}', '2016-02-27', 0, 'jhgyjty'),
(28, 89, 3, '09:00 AM', '12:00 PM', '', '', '', '{"Type":"Regular","Name":"Every Week","Value":""}', '2016-01-27', 0, 'Ghhh'),
(29, 89, 4, '09:00 AM', '', '04:00 PM', '', '', '{"Type":"Regular","Name":"Everyday","Value":""}', '2016-01-27', 1, 'Hhhj'),
(30, 89, 5, '05:30 AM', '08:00 AM', '', '', '', '{"Type":"Regular","Name":"Every Week","Value":""}', '2016-02-05', 0, 'tyyuty');

-- --------------------------------------------------------

--
-- Table structure for table `schedule_appointment_manager`
--

CREATE TABLE IF NOT EXISTS `schedule_appointment_manager` (
  `Appointment_Key` int(11) NOT NULL,
  `Patient_Key` int(11) NOT NULL,
  `Professional_Key` int(11) NOT NULL,
  `Date` varchar(25) NOT NULL,
  `Time` varchar(25) NOT NULL,
  `Date_Time` date NOT NULL,
  `Is_Booked` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schedule_appointment_manager`
--

INSERT INTO `schedule_appointment_manager` (`Appointment_Key`, `Patient_Key`, `Professional_Key`, `Date`, `Time`, `Date_Time`, `Is_Booked`) VALUES
(1, 73, 1, '2015-11-17', '1:00 PM', '2015-11-17', 1),
(2, 68, 1, '2015-11-17', '11:00 AM', '2015-11-17', 0),
(3, 68, 1, '2015-11-18', '1:00 PM', '2015-11-18', 1),
(4, 69, 1, '2015-11-30', '5:00 PM', '2015-11-30', 0),
(5, 73, 1, '2015-11-26', '5:00 PM', '2015-11-26', 0),
(6, 68, 1, '2015-11-24', '4:30 PM', '2015-11-24', 0),
(7, 68, 1, '2015-11-26', '1:00 PM', '2015-11-26', 0),
(8, 68, 1, '2015-11-12', '11:00 AM', '2015-11-12', 1),
(9, 73, 1, '2016-1-20', '12:30 PM', '2016-01-20', 0),
(10, 73, 1, '2015-11-30', '4:30 PM', '2015-11-30', 0),
(11, 69, 1, '2015-11-25', '12:30 PM', '2015-11-25', 0),
(12, 68, 1, '2015-11-24', '10:30 AM', '2015-11-24', 1),
(13, 68, 1, '2015-11-26', '3:00 PM', '2015-11-26', 1),
(14, 73, 1, '2015-11-11', '10:30 AM', '2015-11-11', 1),
(15, 73, 1, '2015-12-1', '2:30 PM', '2015-12-01', 0),
(16, 73, 1, '2015-12-3', '5:00 PM', '2015-12-03', 0),
(17, 73, 1, '2015-11-30', '2:30 PM', '2015-11-30', 0),
(18, 68, 1, '2015-12-3', '2:00 PM', '2015-12-03', 0),
(19, 69, 1, '2015-12-4', '8:00 AM', '2015-12-04', 0),
(20, 73, 1, '2015-12-2', '2:00 PM', '2015-12-02', 0),
(21, 73, 1, '2015-12-17', '7:00 PM', '2015-12-17', 0),
(22, 68, 1, '2015-12-4', '8:30 AM', '2015-12-04', 0),
(23, 68, 1, '2015-12-1', '1:30 PM', '2015-12-01', 0),
(24, 68, 1, '2015-12-12', '2:30 PM', '2015-12-12', 1),
(25, 68, 1, '2015-12-10', '2:00 PM', '2015-12-10', 0),
(26, 73, 1, '2015-12-5', '11:00 AM', '2015-12-05', 1),
(27, 68, 1, '2015-12-9', '3:00 PM', '2015-12-09', 0),
(28, 68, 1, '2015-12-29', '3:00 PM', '2015-12-29', 1),
(29, 69, 1, '2015-12-11', '8:00 AM', '2015-12-11', 1),
(30, 69, 1, '2015-12-3', '10:30 AM', '2015-12-03', 0),
(31, 73, 1, '2015-12-3', '4:00 PM', '2015-12-03', 0),
(32, 73, 1, '2015-12-15', '4:00 PM', '2015-12-15', 1),
(33, 73, 1, '2015-12-2', '3:00 PM', '2015-12-02', 0),
(34, 73, 1, '2015-12-2', '1:30 PM', '2015-12-02', 0),
(35, 73, 1, '2015-12-2', '11:00 AM', '2015-12-02', 0),
(36, 68, 1, '2016-1-6', '1:30 PM', '2016-01-06', 1),
(37, 68, 1, '2015-12-19', '1:30 PM', '2015-12-19', 0),
(38, 68, 1, '2015-12-26', '2:30 PM', '2015-12-26', 0),
(39, 68, 1, '2015-12-16', '2:30 PM', '2015-12-16', 0),
(40, 68, 1, '2015-12-30', '2:30 PM', '2015-12-30', 1),
(41, 68, 1, '2015-12-16', '4:00 PM', '2015-12-16', 0),
(42, 68, 1, '2015-12-16', '4:00 PM', '2015-12-16', 0),
(43, 73, 1, '2015-12-30', '4:00 PM', '2015-12-30', 1),
(44, 69, 1, '2015-12-30', '12:00 PM', '2015-12-30', 1),
(45, 69, 1, '2015-12-23', '11:00 AM', '2015-12-23', 1),
(46, 73, 1, '2015-12-29', '11:00 AM', '2015-12-29', 1),
(47, 73, 1, '2015-12-28', '12:00 PM', '2015-12-28', 0),
(48, 73, 1, '2015-12-7', '5:00 PM', '2015-12-07', 1),
(49, 73, 1, '2015-12-21', '1:30 PM', '2015-12-21', 1),
(50, 73, 1, '2015-12-13', '12:30 PM', '2015-12-13', 1),
(51, 73, 1, '2015-12-14', '5:00 PM', '2015-12-14', 1),
(52, 73, 1, '2016-1-14', '11:30 AM', '2016-01-14', 1),
(53, 73, 1, '2015-12-8', '1:00 PM', '2015-12-08', 1),
(54, 73, 1, '2015-12-25', '11:00 AM', '2015-12-25', 0),
(55, 73, 1, '2015-12-27', '11:30 AM', '2015-12-27', 1),
(56, 69, 1, '2015-12-7', '1:30 PM', '2015-12-07', 1),
(57, 69, 1, '2016-1-14', '2:00 PM', '2016-01-14', 1),
(58, 69, 1, '2015-12-29', '1:00 PM', '2015-12-29', 1),
(59, 69, 1, '2015-12-9', '1:30 PM', '2015-12-09', 0),
(60, 68, 1, '2016-1-7', '1:30 PM', '2016-01-07', 1),
(61, 68, 1, '2015-12-31', '12:30 PM', '2015-12-31', 1),
(62, 68, 1, '2016-1-1', '1:30 PM', '2016-01-01', 1),
(63, 68, 1, '2015-12-21', '11:30 AM', '2015-12-21', 1),
(64, 68, 1, '2015-12-14', '1:30 PM', '2015-12-14', 1),
(65, 68, 1, '2015-12-27', '1:30 PM', '2015-12-27', 0),
(66, 68, 1, '2015-12-7', '2:30 PM', '2015-12-07', 1),
(67, 68, 1, '2015-12-24', '1:30 PM', '2015-12-24', 1),
(68, 68, 1, '2015-12-17', '1:30 PM', '2015-12-17', 0),
(69, 68, 1, '2015-12-1', '1:00 PM', '2015-12-01', 0),
(70, 68, 1, '2015-12-20', '2:00 PM', '2015-12-20', 1),
(71, 68, 1, '2015-12-15', '11:30 AM', '2015-12-15', 1),
(72, 69, 1, '2016-1-16', '12:00 PM', '2016-01-16', 1),
(73, 69, 1, '2015-12-12', '12:30 PM', '2015-12-12', 1),
(74, 69, 1, '2015-12-26', '11:30 AM', '2015-12-26', 1),
(75, 73, 1, '2015-12-16', '10:30 AM', '2015-12-16', 0),
(77, 69, 1, '2015-12-2', '5:00 PM', '2015-12-02', 0),
(78, 69, 1, '2015-12-2', '8:00 AM', '2015-12-02', 0),
(79, 68, 1, '2015-12-3', '8:30 AM', '2015-12-03', 0),
(80, 69, 1, '2015-12-17', '9:30 AM', '2015-12-17', 0),
(81, 69, 1, '2015-12-17', '11:00 AM', '2015-12-17', 1),
(82, 68, 1, '2015-12-27', '3:00 PM', '2015-12-27', 1),
(83, 68, 1, '2015-12-17', '12:00 PM', '2015-12-17', 1),
(84, 68, 1, '2015-12-2', '1:00 PM', '2015-12-02', 0),
(85, 73, 1, '2015-12-2', '10:00 AM', '2015-12-02', 0),
(86, 73, 1, '2015-12-26', '10:30 AM', '2015-12-26', 1),
(87, 69, 1, '2015-12-3', '10:00 AM', '2015-12-03', 0),
(88, 69, 1, '2015-12-3', '10:30 AM', '2015-12-03', 0),
(89, 68, 1, '2015-12-2', '12:00 PM', '2015-12-02', 1),
(90, 68, 1, '2015-12-3', '1:30 PM', '2015-12-03', 0),
(91, 68, 1, '2015-12-18', '8:30 AM', '2015-12-18', 1),
(92, 68, 1, '2016-1-13', '10:00 AM', '2016-01-13', 1),
(93, 68, 1, '2016-1-30', '11:30 AM', '2016-01-30', 1),
(94, 68, 1, '2016-1-23', '4:00 PM', '2016-01-23', 1),
(95, 68, 1, '2016-1-2', '11:00 AM', '2016-01-02', 1),
(96, 68, 1, '2016-1-9', '11:30 AM', '2016-01-09', 1),
(97, 68, 1, '2016-1-8', '12:00 PM', '2016-01-08', 1),
(98, 68, 1, '2016-1-12', '12:30 PM', '2016-01-12', 1),
(99, 68, 1, '2015-12-26', '2:00 PM', '2015-12-26', 1),
(100, 68, 1, '2016-1-3', '10:00 AM', '2016-01-03', 1),
(101, 68, 1, '2015-12-23', '10:30 AM', '2015-12-23', 0),
(102, 73, 1, '2015-12-3', '11:00 AM', '2015-12-03', 0),
(103, 73, 1, '2015-12-10', '2:30 PM', '2015-12-10', 1),
(104, 68, 1, '2015-12-4', '10:00 AM', '2015-12-04', 0),
(105, 68, 1, '2016-1-11', '2:30 PM', '2016-01-11', 1),
(106, 68, 1, '2015-12-16', '4:30 PM', '2015-12-16', 1),
(107, 73, 1, '2015-12-16', '5:30 PM', '2015-12-16', 1),
(108, 68, 1, '2015-12-4', '8:00 AM', '2015-12-04', 0),
(109, 68, 1, '2015-12-9', '3:00 PM', '2015-12-09', 0),
(110, 68, 1, '2015-12-8', '3:00 PM', '2015-12-08', 0),
(111, 68, 1, '2016-1-10', '1:30 PM', '2016-01-10', 1),
(112, 69, 1, '2015-12-14', '12:00 PM', '2015-12-14', 1),
(113, 68, 1, '2016-1-26', '1:00 PM', '2016-01-26', 1),
(114, 80, 1, '2015-12-24', '2:00 PM', '2015-12-24', 0),
(115, 80, 1, '2015-12-26', '1:30 PM', '2015-12-26', 0),
(116, 80, 1, '2015-12-16', '1:30 PM', '2015-12-16', 1),
(117, 80, 1, '2015-12-18', '1:00 PM', '2015-12-18', 1),
(118, 80, 2, '2016-1-21', '2:30 PM', '2016-01-21', 1),
(119, 68, 2, '2015-12-24', '10:00 AM', '2015-12-24', 0),
(120, 80, 1, '2015-12-22', '7:00 PM', '2015-12-22', 1),
(121, 80, 2, '2015-12-21', '3:00 PM', '2015-12-21', 1),
(122, 80, 2, '2015-12-30', '4:00 PM', '2015-12-30', 1),
(123, 80, 1, '2016-2-1', '3:00 PM', '2016-02-01', 1),
(124, 80, 1, '2015-12-28', '3:00 PM', '2015-12-28', 1),
(125, 80, 1, '2016-1-11', '3:00 PM', '2016-01-11', 1),
(126, 80, 1, '2016-2-9', '6:00 PM', '2016-02-09', 1),
(127, 80, 2, '2016-1-25', '2:30 PM', '2016-01-25', 1),
(128, 80, 2, '2015-12-23', '3:00 PM', '2015-12-23', 1),
(129, 80, 1, '2015-12-21', '10:30 AM', '2015-12-21', 1),
(130, 80, 2, '2015-12-28', '2:30 PM', '2015-12-28', 1),
(131, 87, 2, '2015-12-28', '10:00 AM', '2015-12-28', 1),
(132, 68, 1, '2015-12-22', '1:00 PM', '2015-12-22', 1),
(133, 68, 1, '2015-12-28', '8:30 AM', '2015-12-28', 1),
(134, 68, 1, '2016-1-4', '8:30 AM', '2016-01-04', 1),
(135, 73, 1, '2015-12-25', '9:00 AM', '2015-12-25', 1),
(136, 68, 1, '2016-1-21', '2:30 PM', '2016-01-21', 1),
(137, 68, 1, '2016-1-27', '12:00 PM', '2016-01-27', 1),
(138, 68, 22, '2015-12-28', '6:30 PM', '2015-12-28', 1),
(139, 68, 20, '2016-1-23', '12:00 PM', '2016-01-23', 1),
(140, 68, 20, '2016-1-25', '2:30 PM', '2016-01-25', 1),
(141, 89, 22, '2015-12-28', '10:00 AM', '2015-12-28', 0),
(142, 89, 20, '2015-12-25', '12:00 PM', '2015-12-25', 1),
(143, 89, 22, '2015-12-26', '12:00 PM', '2015-12-26', 0),
(144, 89, 23, '2016-1-5', '3:00 PM', '2016-01-05', 0),
(145, 89, 25, '2016-1-8', '5:30 PM', '2016-01-08', 1),
(146, 89, 22, '2015-12-28', '2:30 PM', '2015-12-28', 0),
(147, 89, 22, '2015-12-25', '1:00 PM', '2015-12-25', 0),
(148, 89, 22, '2015-12-26', '6:00 PM', '2015-12-26', 0),
(149, 89, 22, '2015-12-24', '11:30 AM', '2015-12-24', 0),
(150, 89, 23, '2015-12-25', '11:30 AM', '2015-12-25', 0),
(151, 89, 23, '2015-12-25', '4:30 PM', '2015-12-25', 0),
(152, 89, 22, '2016-1-14', '10:00 AM', '2016-01-14', 0),
(153, 89, 22, '2015-12-30', '12:30 PM', '2015-12-30', 1),
(154, 89, 22, '2015-12-25', '1:30 PM', '2015-12-25', 0),
(155, 89, 24, '2015-12-30', '3:00 PM', '2015-12-30', 1),
(156, 89, 22, '2016-1-27', '10:00 AM', '2016-01-27', 1),
(157, 89, 22, '2016-1-28', '10:30 AM', '2016-01-28', 1),
(158, 90, 22, '2015-12-29', '2:00 PM', '2015-12-29', 1),
(159, 90, 22, '2015-12-30', '2:30 PM', '2015-12-30', 1),
(160, 90, 22, '2015-12-31', '3:30 PM', '2015-12-31', 1),
(161, 89, 22, '2015-12-26', '2:30 PM', '2015-12-26', 0),
(162, 91, 22, '2015-12-25', '2:30 PM', '2015-12-25', 0),
(163, 91, 22, '2016-1-5', '3:30 PM', '2016-01-05', 1),
(164, 89, 22, '2015-12-26', '11:00 AM', '2015-12-26', 0),
(165, 89, 25, '2016-1-25', '7:00 PM', '2016-01-25', 1),
(166, 89, 22, '2015-12-28', '9:00 AM', '2015-12-28', 1),
(167, 91, 22, '2015-12-25', '10:00 AM', '2015-12-25', 1),
(168, 89, 22, '2016-1-7', '8:00 AM', '2016-01-07', 1),
(171, 89, 22, '2016-1-23', '8:00 AM', '2016-01-23', 1),
(172, 89, 22, '2016-1-26', '8:30 AM', '2016-01-26', 1),
(173, 89, 22, '2016-1-30', '8:30 AM', '2016-01-30', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adherence_log`
--
ALTER TABLE `adherence_log`
  ADD PRIMARY KEY (`Adherance_Key`),
  ADD KEY `Reminder_Key` (`Reminder_Key`);

--
-- Indexes for table `clinic_master`
--
ALTER TABLE `clinic_master`
  ADD PRIMARY KEY (`Clinic_Id`);

--
-- Indexes for table `drug_master`
--
ALTER TABLE `drug_master`
  ADD PRIMARY KEY (`Drug_Key`);

--
-- Indexes for table `patient_bpm_master`
--
ALTER TABLE `patient_bpm_master`
  ADD PRIMARY KEY (`Bpm_Record_Id`),
  ADD KEY `Patient_Id` (`Patient_Id`);

--
-- Indexes for table `patient_bp_master`
--
ALTER TABLE `patient_bp_master`
  ADD PRIMARY KEY (`Bp_Record_Id`),
  ADD KEY `Patient_Id` (`Patient_Id`);

--
-- Indexes for table `patient_glucose_master`
--
ALTER TABLE `patient_glucose_master`
  ADD PRIMARY KEY (`Glucose_Record_Id`),
  ADD KEY `Patient_Id` (`Patient_Id`);

--
-- Indexes for table `patient_height_master`
--
ALTER TABLE `patient_height_master`
  ADD PRIMARY KEY (`Height_Record_Id`),
  ADD KEY `Patient_Id` (`Patient_Id`);

--
-- Indexes for table `patient_master`
--
ALTER TABLE `patient_master`
  ADD PRIMARY KEY (`Patient_Key`),
  ADD UNIQUE KEY `Patient_Id` (`Patient_Id`);

--
-- Indexes for table `patient_professional_mapping`
--
ALTER TABLE `patient_professional_mapping`
  ADD PRIMARY KEY (`Patient_Professional_Id`),
  ADD KEY `Professional_Key` (`Professional_Key`,`Patient_key`),
  ADD KEY `Patient_key` (`Patient_key`);

--
-- Indexes for table `patient_weight_master`
--
ALTER TABLE `patient_weight_master`
  ADD PRIMARY KEY (`Weight_Record_Id`),
  ADD KEY `Patient_Id` (`Patient_Id`);

--
-- Indexes for table `professional_clinic_mapping`
--
ALTER TABLE `professional_clinic_mapping`
  ADD PRIMARY KEY (`Prof_Clinic_Key`),
  ADD KEY `Professional_Key` (`Professional_Key`,`Clinic_Id`),
  ADD KEY `Clinic_Id` (`Clinic_Id`);

--
-- Indexes for table `professional_details`
--
ALTER TABLE `professional_details`
  ADD PRIMARY KEY (`Prof_Details_Key`),
  ADD KEY `Professional_Key` (`Professional_Key`);

--
-- Indexes for table `professional_master`
--
ALTER TABLE `professional_master`
  ADD PRIMARY KEY (`Professional_Key`),
  ADD KEY `Password_Attempt` (`Password_Attempt`);

--
-- Indexes for table `reminder_master`
--
ALTER TABLE `reminder_master`
  ADD PRIMARY KEY (`Reminder_Key`);

--
-- Indexes for table `schedule_appointment_manager`
--
ALTER TABLE `schedule_appointment_manager`
  ADD PRIMARY KEY (`Appointment_Key`),
  ADD KEY `Patient_Key` (`Patient_Key`),
  ADD KEY `Professional_Key` (`Professional_Key`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adherence_log`
--
ALTER TABLE `adherence_log`
  MODIFY `Adherance_Key` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `clinic_master`
--
ALTER TABLE `clinic_master`
  MODIFY `Clinic_Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `drug_master`
--
ALTER TABLE `drug_master`
  MODIFY `Drug_Key` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `patient_bpm_master`
--
ALTER TABLE `patient_bpm_master`
  MODIFY `Bpm_Record_Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `patient_bp_master`
--
ALTER TABLE `patient_bp_master`
  MODIFY `Bp_Record_Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `patient_glucose_master`
--
ALTER TABLE `patient_glucose_master`
  MODIFY `Glucose_Record_Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `patient_height_master`
--
ALTER TABLE `patient_height_master`
  MODIFY `Height_Record_Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=48;
--
-- AUTO_INCREMENT for table `patient_master`
--
ALTER TABLE `patient_master`
  MODIFY `Patient_Key` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=93;
--
-- AUTO_INCREMENT for table `patient_professional_mapping`
--
ALTER TABLE `patient_professional_mapping`
  MODIFY `Patient_Professional_Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=105;
--
-- AUTO_INCREMENT for table `patient_weight_master`
--
ALTER TABLE `patient_weight_master`
  MODIFY `Weight_Record_Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=60;
--
-- AUTO_INCREMENT for table `professional_clinic_mapping`
--
ALTER TABLE `professional_clinic_mapping`
  MODIFY `Prof_Clinic_Key` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `professional_details`
--
ALTER TABLE `professional_details`
  MODIFY `Prof_Details_Key` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `professional_master`
--
ALTER TABLE `professional_master`
  MODIFY `Professional_Key` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT for table `reminder_master`
--
ALTER TABLE `reminder_master`
  MODIFY `Reminder_Key` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `schedule_appointment_manager`
--
ALTER TABLE `schedule_appointment_manager`
  MODIFY `Appointment_Key` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=174;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `adherence_log`
--
ALTER TABLE `adherence_log`
  ADD CONSTRAINT `reminder_adherance` FOREIGN KEY (`Reminder_Key`) REFERENCES `reminder_master` (`Reminder_Key`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `professional_clinic_mapping`
--
ALTER TABLE `professional_clinic_mapping`
  ADD CONSTRAINT `clinic_map` FOREIGN KEY (`Clinic_Id`) REFERENCES `clinic_master` (`Clinic_Id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `prof_map` FOREIGN KEY (`Professional_Key`) REFERENCES `professional_master` (`Professional_Key`) ON DELETE NO ACTION ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
