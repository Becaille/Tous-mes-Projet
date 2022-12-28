'use strict';

// On défini les propriétés de la ball
const ball = {
    color: "red",
    radius:10,
    x:40,
    y:40,
    direction: { //0: pas de déplacement, 1: déplacement vers la droite ou vers le bas, -1: vers la gauche ou vers le haut
       x: 0, //0, pas de déplacement à l'horizontal
       y: -1 //-1, déplacement du bas vers le haut
    },
    speed: 6 //vitesse de déplacement
};

//propriétés du paddle
const paddle = {
    color: "white",
    x: 0, //coordonnée x de la position
    y: 0, //coordonnée y de la position
    w: 300, //largeur du plateau
    h: 20, //hauteur du plateau
    direction: {
        x: 0 //pas de déplacement à l'horizontal
    },
    speed: 10 //vitesse de déplacement
};

//propriétés de la brique
const brick = {
    color: ["blue", "yellow", "green"],
    y: 50, //position y de la brique
    w: 100, //largeur
    h: 20 //hauteur
};

//tableau qui contiendra le nb de briques
const bricks = []; //il contiendra sur chaque ligne un object brick avec ces coordonnées

//propriétés du game
const game = {
    w: 0, //largeur du canvas
    h: 0, //hauteur du canvas
    animationId: null, //stocker l'ID de requestAnimationFrame
    gameOver: false //si le jeu est fini, on passera gameOver sur true
};

// Notre context et notre Canvas sont définis dans le Scope global pour un accès par nos fonctions
let canvasDom;
let ctx;

//déclaration des functions

// On renvoie un entier aléatoire entre une valeur min (incluse)
// et une valeur max (incluse).
// Attention : si on utilisait Math.round(), on aurait une distribution
// non uniforme !
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}


function valueDirection(x, w) { //calcul quel tier est atteint, retourne la nouvelle direction de la ball
    //1er tier
        if (ball.x + ball.radius <= x + (w /3)) {
            return -1;
        }
        else if (ball.x + ball.radius <= x + (w * 2/3)) {//2nd tier
            return 0;
        }
        else {//3ieme tier
            return 1;
        }
}

function detectCollision() {

    //collision avec le paddle
    if (
        ball.y + ball.radius >= paddle.y //la position y de la ball + son radius >= la position y du paddle
        && ball.x >= paddle.x //la position x de la ball >= position x du paddle
        && ball.x <= paddle.x + paddle.w //la position x de la ball <= position x du paddle + largeur du paddle
        && ball.direction.y == 1 //la ball descend
        ) {
        //ici on est certain qu'il ya collision  
        //gérer les angles
        ball.direction.x = valueDirection(paddle.x, paddle.w);

        //inverser la direction y de ball
        ball.direction.y = -1;
    }
    
    
    //collision avec les bricks
    if (ball.direction.y == -1) { //la ball doit monter
        //parcourir bricks
        for (const itemBrick of bricks) {
            //pour chaque, on test la collision
            if (
                ball.y - ball.radius <= itemBrick.y + brick.h
                && ball.x >= itemBrick.x 
                && ball.x <= itemBrick.x + brick.w 
                && itemBrick.count > 0 
                ) {
                //ici on est certain qu'il ya collision, décrementation du compteur 
                itemBrick.count-- ;
                //gérer les angles
                ball.direction.x = valueDirection(itemBrick.x, brick.w);
        
                //inverser la direction y de ball
                ball.direction.y = 1;
            }
        }
    }
    

}

function showGameOver() {
    
    
    
    //effacer les dessins dessiner un rect qui va prendre toute la surface du canvas avec clearRect()
    ctx.clearRect(0, 0, game.w, game.h);
    //afficher "GAME OVER !!" dans le canvas
    // On définie la police de caractère pour tous les textes
    ctx.font = 'bold 46px Verdana';
    
    // Couleur pour écrire 
    ctx.fillStyle ='#FFFFFF';
    
    console.log(ctx.measureText('GAME OVER !!!'));
    // On ecrit 
    ctx.fillText('GAME OVER !!!', game.w/2 - ctx.measureText('GAME OVER !!!').width /2, game.h/2 - 15);
}

function playGame() {
    //récursivité sur playGame
    
    game.animationId = window.requestAnimationFrame(playGame);
 
    
    
    //test collision
    detectCollision();
    
    //détecter si la ball touche le bas -> GAME OVER
    if(ball.y + ball.radius >= game.h) {
        window.cancelAnimationFrame(game.animationId);
        game.animationId = null;
        
        game.gameOver = true;
        //affichage de "Game Over"
        showGameOver();
    }
    
    //détecter si la ball touche le haut -> changer la direction
    
    if (ball.y - ball.radius <= 0) {
        ball.direction.y *= -1;
    }
    
    //si la ball touche le coté droit ou gauche de l'écran
    if (ball.x + ball.radius >= game.w || ball.x - ball.radius <= 0) {
        ball.direction.x *= -1;
    }
    
    //déplacement de la ball sur les Y
    //changer le y de ball en fct de la vitesse et de la direction
    ball.y += ball.speed * ball.direction.y;
    
    //déplacement de la ball sur les X
    //changer le x de ball en fct de la vitesse et de la direction
    ball.x += ball.speed * ball.direction.x;
    
    if (!game.gameOver) {
        showGame();
    }
}

function showBricks() {
    //parcourir le tableau bricks
    for (const itemBrick of bricks) {
        
        if (itemBrick.count > 0) { //on l'affiche si count est > 0
            ctx.fillStyle = brick.color[itemBrick.count -1]; 
       
       ctx.fillRect(itemBrick.x, itemBrick.y, brick.w, brick.h);
        }
       
    }
}

function showGame() {
    
    
    
    
    
    //effacer les dessins dessiner un rect qui va prendre toute la surface du canvas avec clearRect()
    ctx.clearRect(0, 0, game.w, game.h);
    
    
    
    //début du tracé
    ctx.beginPath();
    
    //définition de la couleur
    ctx.fillStyle = ball.color;
    
    //dessin de la ball
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    
    //appliquer la couleur
    ctx.fill();
    
    //deplacement du paddle en fct de la direction et de la vitesse (speed)

    paddle.x += paddle.direction.x * paddle.speed;
    
    //test si on atteind le coté droit
    if (paddle.x + paddle.w + paddle.speed > game.w) {
          //mettre le paddle sur le coté gauche
          paddle.x = game.w - paddle.w;
    }
    
    //test si on atteind le coté gauche
    if (paddle.x - paddle.speed < 0) {
        paddle.x = 0;
    }
    
    //afficher le paddle
    //la couleur
    ctx.fillStyle = paddle.color;
    
    //dessiner le paddle
    ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
    
    
    //dessiner les briques
    showBricks();
    
}

function keyboardEvent(e) {
    switch (e.key) {
            case 'ArrowRight':
                
                if (e.type == 'keydown') { //la touche est bien enfoncée
                   paddle.direction.x = 1; //la direction va vers la droite
                   
                   
                   
                }
                else {
                   paddle.direction.x = 0;   //la touche est relevé, on stop la direction du paddle
                }
                
                
                break;
            
            case 'ArrowLeft':
                
                if (e.type == 'keydown') {
                   paddle.direction.x = -1; //la direction va vers la gauche
            
                }
                else {
                   paddle.direction.x = 0; //la touche est relevé, on stop la direction du paddle 
                }
                
                
                
                break;
                
            case ' ':
                
                //lancer le jeu
                if (e.type == 'keydown') {
                    
                    if (game.animationId == null && !game.gameOver) { //on lance le jeu
                        game.animationId = window.requestAnimationFrame(playGame);
                    }
                    else { //on temporise le jeu
                        window.cancelAnimationFrame(game.animationId);
                        game.animationId = null;
                    }
                    
                }
                
                break;
                

        }
}

function init_bricks() {
    //combien on peut placer de brique à l'horizontal
    const nbBricks = Math.floor(game.w / brick.w);
    
    //calculer la coordonnée x de la première brick
    let x = Math.floor((game.w - (nbBricks * brick.w)) /2);
    

    
    //remplir le tableau bricks
    for (let i = 0; i < nbBricks; i++) {
        /*
        position x de la brique :
        la valeur de x de départ + (l'index de la brique x sa longueur)
        */
        let rndCount = getRandomIntInclusive(1, 3);
        bricks.push({
            x: x + (i * brick.w), //position x
            y: brick.y, //position y
            count: rndCount //nb de collosions possible
            
        });
    }
    
   /*
   chaque brique sera représenté par une ligne dans le tableau brick
   */
   
}


// Dès que le DOM est chargé on commence
document.addEventListener('DOMContentLoaded', function () {

    //cibler le canvas
    canvasDom = document.getElementById('canvas');
    //recupération du contexte
    ctx = canvasDom.getContext('2d');
    
    //le canvas va prendre toute la taille de la fenêtre
    canvasDom.width = window.innerWidth;
    
    canvasDom.height = window.innerHeight;
    
    //récupérer les dimmensions du canvas
    game.w = canvasDom.width;
    
    game.h = canvasDom.height;
    
    //center la ball dans le canvas sur le paddle
    ball.x = game.w /2;
    
    ball.y = game.h - (80 + paddle.h + ball.radius + 1);
    
    //placer le paddle au centre (horizontal) et à 80px du bas de l'écran (game.h)
    //mettre à jour paddle.x et paddle.y
    
    paddle.x = (game.w /2) - (paddle.w /2);
    
    paddle.y = game.h - 80 - paddle.h;
    
    //initialisation du tableau bricks
    init_bricks();
    
    
    
    //affichage du jeu
    showGame();
    
    //ecouter le clavier
    /*
    en fct des fleches, déplacer le paddle
    */
    
    /*
    on va déplacer le paddle dans la touche est enfoncée
    */
    document.addEventListener('keydown', keyboardEvent); //KeyboardEvent c'est le callback de l'écouteur
    
    /*
    on arretera de deplacer le paddle quand la touche est relevée
    */
    document.addEventListener('keyup', keyboardEvent);
    

});