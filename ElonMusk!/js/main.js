'use strict';

/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/
const IMG_PATH = 'images/';
const START = 9;

let timer;//gère le setInterval
let count;//gère le chiffre sur le paneau (le compte à rebours)
/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/
// Gestionnaire d'événement au clic sur le bouton de mise à feu
function onClickFiringButton()
{
    // Une fois que la mise à feu lancée, on désactive le bouton de mise à feu
    firingButton.removeEventListener('click', onClickFiringButton);
    firingButton.classList.add('disabled');
    // Programmation du décollage de la fusée à la fin du compte à rebours
    scheduleTakeOff()
    // Affichage initial du compte à rebours
    countDown()
    // Lancement du compte à rebours
    timer = setInterval(countDown, 1000)
    // On change la source de l'image de la fusée
    updateRocket("rocket2.gif")
}

/**
 * Programme le décollage de la fusée à la fin du compte à rebours
 */
function scheduleTakeOff()
{
    // Programmation du décollage pour dans x secondes
    setTimeout(function(){
        // On change la source de l'image de la fusée
        updateRocket("rocket3.gif")
        // On fait décoller la fusée en lui donnant la classe 'tookOff', la transition CSS fera le reste
        rocket.classList.add('tookOff');
    }, count * 1000)
}

// Gestion du compte à rebours
function countDown()
{
    // Affichage sur le panneau du compte à rebours
    billboard.textContent = count;
    // On décrémente le compteur
    count--
    // Si le compteur arrive à -1, on stoppe le chronomètre
    if( count == -1 ){
        
        window.clearInterval(timer);
    }
    
}
/**
 * Met à jour l'image de la fusée
 */
function updateRocket(filename)
{
    rocket.src = IMG_PATH + filename
}
/************************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/************************************************************************************/
//initialisation du compte à rebours à 10
count = 10
// Sélection des différents éléments du DOM sur lesquels nous allons agir
const rocket = document.getElementById('rocket');
const billboard = document.querySelector('#billboard span');
const firingButton = document.getElementById('firing-button');
// Installation du gestionnaire d'événement au clic sur le bouton de mise à feu
firingButton.addEventListener('click', onClickFiringButton);



/* BONUS étoiles*/

/**
 * Bonus: Choisir la taille de l'étoile
 */

/*function choisirTaille() {
    let taille = getRandomInteger(1,3);
    switch (taille) {
        case 1 : 
            return "tiny";
            break;
        case 2 :
            return "normal";
            break;
        case 3 :
            return "big";
            break;
    }
}*/

/**
 * Bonus: Choisir la position x pour les étoiles
 */
 
/*function choisirX() {
    let x = getRandomInteger(1, window.innerWidth - 3);
    return x;
}*/
/**
 * Bonus: Choisir la position y pour les étoiles
 */

/*function choisirY() {
    let y = getRandomInteger(1, window.innerHeight - 3);
    return y;
}*/


// Ajouter des étoiles

/*const numberOfStars = 300;
let stars=[];

for (let i = 0; i <= numberOfStars; i++) {
        stars[i]=document.createElement("div");
        document.body.appendChild(stars[i]);
        stars[i].classList.add("star");
        stars[i].classList.add(choisirTaille());
        stars[i].style.left = choisirX() + "px";
        stars[i].style.top = choisirY() + "px";
    }*/
    
    
/* DEUXIEME METHODE */

function starsInBack(){
    
    for (let i=0; i<300; i++){
        let tailleEtoile = getRandomInteger(1, 3);
        let randomX = getRandomInteger(1, 100);
        let randomY = getRandomInteger(1, 100);
        
        let etoiles = document.createElement('div');
        etoiles.classList.add('star');
        
        if(tailleEtoile == 1){
            etoiles.classList.add('tiny');
        } else if (tailleEtoile == 2){
            etoiles.classList.add('normal');
        } else {
            etoiles.classList.add('big');
        }
        
        etoiles.style = `top: ${randomX}%; left: ${randomY}%`;
        document.body.appendChild(etoiles);
        
        
    }
}
starsInBack()