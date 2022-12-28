'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* **************************************** DONNEES JEU **************************************** */
/*************************************************************************************************/
// L'unique variable globale est un objet contenant l'état du jeu.
let game;

// Déclaration des constantes du jeu, rend le code plus compréhensible
const PLAYER = 'player';
const DRAGON = 'dragon';

const LEVEL_EASY   = 1;
const LEVEL_NORMAL = 2;
const LEVEL_HARD   = 3;

/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/
/**
 * Détermine qui du joueur ou du dragon prend l'initiative et attaque
 * @returns {string} - DRAGON|PLAYER
 */
function getAttacker()
{
    // On lance 10D6 pour le joueur et pour le dragon
    let playerInitiative = throwDices(10, 6)
    let dragonInitiative = throwDices(10, 6)
    
    // On compare les scores d'initiatives et on retourne le résultat
    if(playerInitiative>dragonInitiative){
        return PLAYER
    }else{
        return DRAGON
    }
    
    
}

/**
 * Calcule les points de dommages causés par le dragon au chevalier
 * @returns {number} - le nombre de points de dommages
 */
function computeDamagePoint(attacker)
{
    // On tire 3D6 pour le calcul des points de dommages causés par le dragon
    let damagePoints = throwDices(3,6)
    /*
      Majoration ou minoration des points de dommage en fonction du niveau de difficulté
      Pas de pondération si niveau normal ( condition ;-) )
    */
    switch(game.level){
        /*
         Au niveau Facile,
         Si le dragon attaque, on diminue les points de dommage de 2D6 %
         Si le joueur attaque, on augmente les points de dommage de 2D6 %
        */
        case LEVEL_EASY:
            if(attacker == DRAGON){
                damagePoints -= Math.round(damagePoints * throwDices(2,6) / 100)
            }else{
                damagePoints += Math.round(damagePoints * throwDices(2,6) / 100)
            }
        break;
        
        /*
         Au niveau difficile,
         Si le dragon attaque, on augmente les points de dommage de 1D6 %
         Si le joueur attaque, on diminue les points de dommage de 1D6 %
        */
        case LEVEL_HARD:
             if(attacker == DRAGON){
                damagePoints += Math.round(damagePoints * throwDices(1,6) / 100)
            }else{
                damagePoints -= Math.round(damagePoints * throwDices(1,6) / 100)
            }
        break;
    }    
    // On retourne les points de dommage
    return damagePoints
}

/**
 * Boucle du jeu : répète l'exécution d'un tour de jeu tant que les 2 personnages sont vivants
 */
function gameLoop()
{
    // Le jeu s'exécute tant que le dragon et le joueur sont vivants.
    while(game.hpDragon > 0 && game.hpPlayer > 0) {
        // Qui va attaquer lors de ce tour de jeu ?
        let attacker = getAttacker();
        // Combien de dommages infligent l'assaillant = PV que va perdre le personnage attaqué
        let damagePoints = computeDamagePoint(attacker);
        // Est-ce que le dragon est plus rapide que le joueur ?
        if(attacker == DRAGON) {
            // Diminution des points de vie du joueur.
            game.hpPlayer -= damagePoints; // Identique à game.hpPlayer = game.hpPlayer - damagePoint;
        //sinon (c'est le player)
        }else{    
            // Diminution des points de vie du dragon.
            game.hpDragon -= damagePoints; // Identique à game.hpDragon = game.hpDragon - damagePoint;
        }    
        // Affichage du journal : que s'est-il passé ?
        showGameLog(attacker, damagePoints);
        // Affichage de l'état du jeu
        showGameState();
        // On passe au tour suivant.
        game.round++;
    }        
}


/**
 * Initialise les paramètres du jeu
 *  Création d'un objet permettant de stocker les données du jeu
 *      ->  les données seront stockées dans une propriété de l'objet,
 *          on évite ainsi de manipuler des variables globales à l'intérieur des fonctions qui font évoluer les valeurs
 *
 * Quelles sont les données necessaires tout au long du jeu (pour chaque round)
 *    -  N° du round (affichage)
 *    -  Niveau de difficulté (calcul des dommages)
 *    -  Points de vie du joueur ( affichage + fin de jeu )
 *    -  Points de vie du dragon ( affichage + fin de jeu )
 */
function initializeGame()
{
    // Initialisation de la variable globale du jeu. (devient un objet)
    game = new Object()
    game.round = 1
    // Choix du niveau du jeu
    game.level = requestInteger('Choisissez le niveau de difficulté ' +
        '1. Facile - 2. Normal - 3. Difficile',
        1, 3)
    /*
    * Détermination des points de vie de départ selon le niveau de difficulté.
    * 10 tirages, la pondération se joue sur le nombre de faces
    *    -> plus il y a de faces, plus le nombre tiré peut-être élévé
    *  CONDITION
    */
    switch(game.level){
        case LEVEL_EASY:
            game.hpDragon = 100 + throwDices(5, 10)
            game.hpPlayer = 100 + throwDices(10, 10)
        break;
        case LEVEL_NORMAL:
            game.hpDragon = 100 + throwDices(10, 10)
            game.hpPlayer = 100 + throwDices(10, 10)
        break;
        case LEVEL_HARD:
            game.hpDragon = 100 + throwDices(10, 10)
            game.hpPlayer = 100 + throwDices(7, 10)
        break;
    }
    
}

/**
 * Affichage de l'état du jeu, c'est-à-dire des points de vie respectifs des deux combattants
 */
function showGameState()
{
    // Au départ du jeu, les joueurs sont encore en bonne état !
    const imageFilePlayer = 'knight.png';
    const imageFileDragon = 'dragon.png';
    
    // Affichage du code HTML
    document.write('<li class="game-state">');
    // Affichage de l'état du joueur
    document.write('<figure class="game-state_player">');
    document.write('<img src="images/' + imageFilePlayer + '" alt="Chevalier">');
    // Si le joueur est toujours vivant
    if (game.hpPlayer > 0) {
        // on affiche ses points de vie
        document.write('<figcaption>' + game.hpPlayer + ' PV</figcaption>');
    //sinon
    }else{
        // Le joueur est mort, on affiche 'GAME OVER'
        document.write('<figcaption>GAME OVER</figcaption>');
    }    
    
    document.write('</figure>');
    
    // Affichage de l'état du dragon
    document.write('<figure class="game-state_dragon">');
    document.write('<img src="images/' + imageFileDragon + '" alt="Dragon">');
    
    // Si le dragon est toujours vivant 
    if (game.hpDragon > 0) {
        //on affiche ses points de vie
        document.write('<figcaption>' + game.hpDragon + ' PV</figcaption>');
    //sinon
    }else{
        // Le dragon est mort on affiche 'GAME OVER'
        document.write('<figcaption">GAME OVER</figcaption>');
    }
    document.write('</figure>');
    document.write('</li>');
}

/**
 * Affiche ce qu'il s'est passé lors d'un tour du jeu : qui a attaqué ? Combien de points de dommage ont été causés ?
 * @param {string} attacker - Qui attaque : DRAGON ou PLAYER
 * @param {number} damagePoints - Le nombre de points de dommage causés
 */
function showGameLog(attacker, damagePoints)
{
    let alt;
    let imageFilename;
    let message;

    // Si c'est le dragon qui attaque...
    if (attacker == DRAGON) {
        //on attribut les valeurs du dragon aux variables
        imageFilename = 'dragon-winner.png';
        alt = 'Dragon vainqueur';
        message = 'Le dragon prend l\'initiative, vous attaque et vous inflige ' + damagePoints + ' points de dommage !';
    //sinon (c'est le player)
    }else{
        //on attribut les valeur du player aux variables
        imageFilename = 'knight-winner.png';
        alt = 'Chevalier vainqueur';
        message = 'Vous êtes le plus rapide, vous attaquez le dragon et lui infligez ' + damagePoints + ' points de dommage !';
    }   
    // Affichage des informations du tour dans le document HTML
    document.write('<h3>Tour n°' + game.round + '</h3>');
    document.write('<figure class="game-round">');
    document.write('<img src="images/' + imageFilename + '" alt="'+ alt +'">');
    document.write('<figcaption>' + message + '</figcaption>');
    document.write('</figure>');
}


/**
 * Affichage du vainqueur
 */
function showGameWinner()
{
    let imageFilename;
    let alt;
    let message;

    // Si les points de vie du dragon sont positifs, c'est qu'il est toujours vivant, c'est donc lui qui a gagné le combat
    if(game.hpDragon > 0) {
        //on attribut les valeurs du dragon aux variables
        imageFilename = 'dragon-winner.png';
        alt = 'Dragon vainqueur';
        message = 'Vous avez perdu le combat, le dragon vous a carbonisé !';
    //sinon (c'est le player)
    }else{
        //on attribut les valeur du player aux variables
        imageFilename = 'knight-winner.png';
        alt = 'Chevalier vainqueur';
        message = 'Vous avez vaincu le dragon, vous êtes un vrai héros !';
    }   
    //Affichage des infos du vaincqueur dans le HTML
    document.write('<footer>');
    document.write('<h3>Fin de la partie</h3>');
    document.write('<figure>');
    document.write('<figcaption>' + message + '</figcaption>');
    document.write('<img src="images/' + imageFilename + '" alt="'+ alt +'">');
    document.write('</figure>');
    document.write('</footer>');
}

/**
 * Fonction principale du jeu qui démarre la partie
 */
function startGame()
{
    // Etape 1 : initialisation du jeu
    initializeGame()
    // Etape 2 : exécution du jeu, déroulement de la partie
    showGameState()
    gameLoop()
    // Fin du jeu, affichage du vainqueur
    showGameWinner()
}

/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/
//démarage du jeu
startGame()