<?php

/**
 * FICHIER DE CONFIGURATION DU SITE !
 * ----------------------
 * On met en place ici tout ce qui sert à la configuration
 */

/**
 * MISE EN PLACE DE LA SESSION
 * ---------------------------
 * On le sait très bien, on aura besoin de la session dans ce site dans plus ou moins tous les fichiers
 * C'est donc une bonne pratique de la mettre en oeuvre tout de suite ici avant toute autre action
 *
 * Comprenez bien : le fichier configuration.php sera la première chose qui s'exécutera quand on appellera notre site.
 * On est donc surs que session_start() sera appelé tout le temps, et avant tout le reste !
 */
session_start();

/**
 * CONFIGURATION DE LA BASE DE DONNEES
 * -----------------------------------
 * Ca facilite l'évolution, le jour où on change de base de données ou que l'utilisateur
 * ou que le mot de passe change, on peut simplement modifier ce fichier
 * et hop ! Tout remarche à nouveau
 */
const DB_HOST = "db.3wa.io";
const DB_USER = "jeanluclacaze";
const DB_PASSWORD = "db7134646ba3cb921081c69354532772";
const DB_NAME = "jeanluclacaze_htechMaster";




const SECRETKEY = 'mysecretkey1234';

/**
 * LISTE DES TABLES de LA BDD
 */
 
const T_USERS = "Users";
const T_BRANDS = "Brands";
const T_DIAP = "Diaporama_photos";
const T_ORDERS = "Orders";
const T_O_DETAILS = "Order_details";
const T_P_LINES = "ProductLines";
const T_PROD = "Products";
const T_TAGS = "Tags";
const T_T_PROD = "Tag_product";


/* TVA */

const TVA = 0.2;










