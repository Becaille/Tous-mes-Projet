-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 11 déc. 2020 à 11:22
-- Version du serveur :  5.7.32-0ubuntu0.18.04.1
-- Version de PHP : 7.3.15-3+ubuntu18.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `tls-07_ecommerce`
--

-- --------------------------------------------------------

--
-- Structure de la table `Brands`
--

CREATE TABLE `Brands` (
  `Id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Logo` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Brands`
--

INSERT INTO `Brands` (`Id`, `Name`, `Logo`) VALUES
(11, 'Aoc', '11.png');

-- --------------------------------------------------------

--
-- Structure de la table `Diaporama_photos`
--

CREATE TABLE `Diaporama_photos` (
  `Id` int(11) NOT NULL,
  `Product_Id` int(11) NOT NULL,
  `Photo_md` varchar(10) DEFAULT NULL,
  `Photo_lg` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Diaporama_photos`
--

INSERT INTO `Diaporama_photos` (`Id`, `Product_Id`, `Photo_md`, `Photo_lg`) VALUES
(1, 5, '1_min.png', '1_max.png'),
(3, 5, '3_min.png', '3_max.png'),
(4, 5, '4_min.png', '4_max.png'),
(5, 4, '5_min.png', '5_max.png');

-- --------------------------------------------------------

--
-- Structure de la table `Orders`
--

CREATE TABLE `Orders` (
  `Id` int(11) NOT NULL,
  `User_Id` int(11) NOT NULL,
  `Status` tinyint(1) NOT NULL,
  `Created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Paiement_at` datetime DEFAULT NULL,
  `Shipping_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Orders`
--

INSERT INTO `Orders` (`Id`, `User_Id`, `Status`, `Created_at`, `Paiement_at`, `Shipping_at`) VALUES
(17, 4, 2, '2020-12-10 16:43:23', '2020-12-11 08:55:59', NULL),
(18, 4, 2, '2020-12-11 10:46:45', '2020-12-11 10:47:29', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `Order_details`
--

CREATE TABLE `Order_details` (
  `Order_id` int(11) NOT NULL,
  `Product_Id` int(11) NOT NULL,
  `Quantity` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Order_details`
--

INSERT INTO `Order_details` (`Order_id`, `Product_Id`, `Quantity`) VALUES
(17, 4, 2),
(17, 5, 3),
(18, 4, 2),
(18, 5, 3);

-- --------------------------------------------------------

--
-- Structure de la table `ProductLines`
--

CREATE TABLE `ProductLines` (
  `Id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Icon` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `ProductLines`
--

INSERT INTO `ProductLines` (`Id`, `Name`, `Icon`) VALUES
(1, 'Ordinateurs', 'icon-display'),
(2, 'Péripheriques & composants', 'icon-data'),
(3, 'Téléphones', 'icon-phone'),
(4, 'Objets connectés', 'icon-clock');

-- --------------------------------------------------------

--
-- Structure de la table `Products`
--

CREATE TABLE `Products` (
  `Id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Visuel` varchar(10) DEFAULT NULL,
  `Brand_Id` int(11) NOT NULL,
  `ProductLine_Id` int(11) NOT NULL,
  `Buy_price` double NOT NULL,
  `MSRP` double NOT NULL,
  `Eco_tax` double NOT NULL,
  `QuantityInStock` int(5) DEFAULT NULL,
  `Status` tinyint(1) NOT NULL,
  `Primary_content` longtext NOT NULL,
  `Description_title1` varchar(50) DEFAULT NULL,
  `Description_title2` varchar(50) DEFAULT NULL,
  `Description_visuel1` varchar(10) DEFAULT NULL,
  `Description_visuel2` varchar(10) DEFAULT NULL,
  `Description_content1` longtext,
  `Description_content2` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Products`
--

INSERT INTO `Products` (`Id`, `Name`, `Visuel`, `Brand_Id`, `ProductLine_Id`, `Buy_price`, `MSRP`, `Eco_tax`, `QuantityInStock`, `Status`, `Primary_content`, `Description_title1`, `Description_title2`, `Description_visuel1`, `Description_visuel2`, `Description_content1`, `Description_content2`) VALUES
(1, 'ThinkPad', '1.png', 11, 1, 500, 1000.99, 20, 0, 2, 'Donec vehicula vitae libero non molestie. \r\n\r\nMorbi at justo et enim feugiat tristique. Phasellus ultricies neque ac magna aliquam gravida. Donec pellentesque vehicula finibus. \r\n\r\nIn purus neque, sagittis at lacus vel, volutpat semper lectus. Curabitur ut massa in sapien iaculis pellentesque eu consectetur orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum aliquam tempor laoreet.', '', '', NULL, NULL, '', ''),
(2, 'MacBook pro', '2.png', 11, 1, 700, 1400, 60, 0, 2, 'Donec vehicula vitae libero non molestie. Morbi at justo et enim feugiat tristique. Phasellus ultricies neque ac magna aliquam gravida. Donec pellentesque vehicula finibus. In purus neque, sagittis at lacus vel, volutpat semper lectus. Curabitur ut massa in sapien iaculis pellentesque eu consectetur orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum aliquam tempor laoreet.', '', '', NULL, NULL, '', ''),
(4, 'souris bluetooth', '4.png', 11, 4, 20, 60, 2, 10, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum ante eget enim dignissim dignissim. Sed consectetur maximus augue id tincidunt. Curabitur sed arcu sit amet quam tristique vestibulum ac vel augue. Cras a justo et lacus tristique dictum in in ex. Vivamus sagittis mollis nisl vel rutrum. Morbi hendrerit diam at enim egestas aliquam. Suspendisse porta nisi nec metus sagittis, eget consequat mauris vulputate. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed nulla tortor, lacinia id imperdiet a, finibus sit amet mi. Morbi at neque placerat, vestibulum justo quis, ultricies purus. Nulla porttitor vehicula metus, quis egestas elit placerat eget. Praesent sem diam, finibus eget vulputate a, rhoncus dapibus metus. Vivamus faucibus eget ex nec blandit. Cras non erat tempus, lacinia tellus nec, laoreet nisl. In viverra tempus lorem, id viverra erat ullamcorper vel.', 'titre descriptif 1', 'titre descriptif 2', '4_1.png', '4_2.png', 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer eleifend justo a metus bibendum, eu hendrerit sem suscipit. Curabitur sit amet laoreet nulla, sit amet maximus metus. Vivamus auctor mi eget hendrerit congue. Pellentesque tristique purus eget pharetra pretium. Vivamus imperdiet mauris nec congue feugiat. Curabitur a condimentum augue. Suspendisse sed pharetra nibh, et molestie enim. Ut tempor mauris in metus pretium, in suscipit erat aliquam. Fusce interdum lorem sapien. Mauris vulputate massa ex, nec faucibus lacus imperdiet nec. Aliquam felis tortor, pharetra eu neque sed, dignissim hendrerit turpis.\r\n\r\nInteger maximus felis a leo maximus porttitor. Aenean eu arcu maximus, tristique urna sit amet, dapibus lectus. Mauris viverra diam vel lacus tincidunt condimentum. Maecenas a ante ex. Morbi mollis suscipit sem, sit amet consectetur massa mattis id. Mauris venenatis egestas sem quis varius. Praesent vel lorem dignissim, dictum libero id, rutrum enim. Quisque posuere vulputate elit sed tincidunt. Aliquam erat volutpat. Integer hendrerit dapibus dui, sed mattis quam elementum eget. Ut ac lacus tortor. Mauris volutpat massa a dictum pulvinar. Praesent posuere aliquam urna, ac tristique elit tempor eu. Sed congue blandit mi sit amet blandit. In hac habitasse platea dictumst. Pellentesque venenatis lorem vel nibh gravida consequat.', 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer eleifend justo a metus bibendum, eu hendrerit sem suscipit. Curabitur sit amet laoreet nulla, sit amet maximus metus. Vivamus auctor mi eget hendrerit congue. Pellentesque tristique purus eget pharetra pretium. Vivamus imperdiet mauris nec congue feugiat. Curabitur a condimentum augue. Suspendisse sed pharetra nibh, et molestie enim. Ut tempor mauris in metus pretium, in suscipit erat aliquam. Fusce interdum lorem sapien. Mauris vulputate massa ex, nec faucibus lacus imperdiet nec. Aliquam felis tortor, pharetra eu neque sed, dignissim hendrerit turpis.\r\n\r\nInteger maximus felis a leo maximus porttitor. Aenean eu arcu maximus, tristique urna sit amet, dapibus lectus. Mauris viverra diam vel lacus tincidunt condimentum. Maecenas a ante ex. Morbi mollis suscipit sem, sit amet consectetur massa mattis id. Mauris venenatis egestas sem quis varius. Praesent vel lorem dignissim, dictum libero id, rutrum enim. Quisque posuere vulputate elit sed tincidunt. Aliquam erat volutpat. Integer hendrerit dapibus dui, sed mattis quam elementum eget. Ut ac lacus tortor. Mauris volutpat massa a dictum pulvinar. Praesent posuere aliquam urna, ac tristique elit tempor eu. Sed congue blandit mi sit amet blandit. In hac habitasse platea dictumst. Pellentesque venenatis lorem vel nibh gravida consequat.'),
(5, 'test souris', '5.png', 11, 4, 18, 30, 5, 4, 2, 'shshshshhs', '', '', NULL, NULL, '', '');

-- --------------------------------------------------------

--
-- Structure de la table `Tags`
--

CREATE TABLE `Tags` (
  `Id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Tags`
--

INSERT INTO `Tags` (`Id`, `Name`) VALUES
(1, 'ecran'),
(2, 'hdmi'),
(3, 'full HD');

-- --------------------------------------------------------

--
-- Structure de la table `Tag_product`
--

CREATE TABLE `Tag_product` (
  `Product_Id` int(11) NOT NULL,
  `Tag_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Tag_product`
--

INSERT INTO `Tag_product` (`Product_Id`, `Tag_Id`) VALUES
(4, 1),
(4, 2),
(4, 3),
(5, 3);

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `Id` int(11) NOT NULL,
  `FirstName` varchar(40) NOT NULL,
  `LastName` varchar(20) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(64) NOT NULL,
  `Address` varchar(250) NOT NULL,
  `City` varchar(40) NOT NULL,
  `ZipCode` char(5) NOT NULL,
  `Phone` char(10) DEFAULT NULL,
  `Created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Last_login` datetime DEFAULT NULL,
  `Admin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`Id`, `FirstName`, `LastName`, `Email`, `Password`, `Address`, `City`, `ZipCode`, `Phone`, `Created_at`, `Last_login`, `Admin`) VALUES
(4, 'toto', 'leheros', 'toto@gmail.com', 'XaFeR1mlGKj8AE+vup+XyQ==', 'test', 'toulouse', '31000', '0505050505', '2020-12-07 14:58:38', '2020-12-11 11:20:32', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Brands`
--
ALTER TABLE `Brands`
  ADD PRIMARY KEY (`Id`);

--
-- Index pour la table `Diaporama_photos`
--
ALTER TABLE `Diaporama_photos`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Product_Id` (`Product_Id`);

--
-- Index pour la table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `User_Id` (`User_Id`);

--
-- Index pour la table `Order_details`
--
ALTER TABLE `Order_details`
  ADD PRIMARY KEY (`Order_id`,`Product_Id`),
  ADD KEY `Order_id` (`Order_id`),
  ADD KEY `Product_Id` (`Product_Id`);

--
-- Index pour la table `ProductLines`
--
ALTER TABLE `ProductLines`
  ADD PRIMARY KEY (`Id`);

--
-- Index pour la table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Name` (`Name`),
  ADD KEY `Brand_Id` (`Brand_Id`),
  ADD KEY `ProductLine_Id` (`ProductLine_Id`);

--
-- Index pour la table `Tags`
--
ALTER TABLE `Tags`
  ADD PRIMARY KEY (`Id`);

--
-- Index pour la table `Tag_product`
--
ALTER TABLE `Tag_product`
  ADD PRIMARY KEY (`Product_Id`,`Tag_Id`),
  ADD KEY `Product_Id` (`Product_Id`),
  ADD KEY `Tag_Id` (`Tag_Id`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Brands`
--
ALTER TABLE `Brands`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `Diaporama_photos`
--
ALTER TABLE `Diaporama_photos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `ProductLines`
--
ALTER TABLE `ProductLines`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `Products`
--
ALTER TABLE `Products`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `Tags`
--
ALTER TABLE `Tags`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Diaporama_photos`
--
ALTER TABLE `Diaporama_photos`
  ADD CONSTRAINT `Diaporama_photos_ibfk_1` FOREIGN KEY (`Product_Id`) REFERENCES `Products` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`User_Id`) REFERENCES `Users` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Order_details`
--
ALTER TABLE `Order_details`
  ADD CONSTRAINT `Order_details_ibfk_1` FOREIGN KEY (`Order_id`) REFERENCES `Orders` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Order_details_ibfk_2` FOREIGN KEY (`Product_Id`) REFERENCES `Products` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`Brand_Id`) REFERENCES `Brands` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Products_ibfk_2` FOREIGN KEY (`ProductLine_Id`) REFERENCES `ProductLines` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Tag_product`
--
ALTER TABLE `Tag_product`
  ADD CONSTRAINT `Tag_product_ibfk_1` FOREIGN KEY (`Product_Id`) REFERENCES `Products` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Tag_product_ibfk_2` FOREIGN KEY (`Tag_Id`) REFERENCES `Tags` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
