let front = 1; //mouvement vers le haut
let back = 1; //mouvement vers le bas
let left = 1; //mouvement vers la gauche
let right = 1; //mouvement vers la droite
let positionX = 0; //position de départ X
let positionY = 0; //position de départ Y
const BACK = 40; //code des touches du clavier pour la flèche du bas
const FRONT = 38; //code des touches du clavier pour la flèche du haut
const LEFT = 37; //code des touches du clavier pour la flèche de gauche
const RIGHT = 39; //code des touches du clavier pour la flèche de droite
const speed = 5; //initialisation de la vitesse de déplacement du perso
let mapIndex = 1; //index de départ choix de map
let perso = document.getElementById('perso'); //on récup la div du personnage dans notre html
let map = document.getElementById('map'); //on récup la div de la map dans notre html
let resultMap = document.getElementById('resultMap');

//fonction qui va génerer notre map
function createMap(mapper, index, mode) {
    //si c'est en mode start
    if(mode === "start"){
        //initialisation de position de départ X et Y avec mapper et index
        positionX = mapper[index].start[0];
		positionY = mapper[index].start[1];
    //sinon
    }else{
        //initialisation de position de fin X et Y avec mapper et index
        positionX = mapper[index].end[0];
		positionY = mapper[index].end[1];
    }    
    //attribution de la position du perso en fonction des position X et Y
    perso.style.top = positionY+"px";
	perso.style.left = positionX+"px";
    //création d'une balise html table
    let html = "<table>";
    //boucle qui va parcourir mapper[index]
    for(let i = 0; i < mapper[index].map.length; i++ ){
        //création de tr
        html += "<tr>";
        //boucle qui va parcourir les index de mapper[index]
        for( let j = 0; j < mapper[index].map[i].length; j++){
            //condition qui va attribuer selon les chiffre sur mapper si c'est de l'herbe un rocher un block ou de l'eau ou sortie
	        //class grass, water,rock,block, out  0 pour l'herbe, 3 pour l'eau, 2 pour rock , 1 pour les block et c'est 4 et 5 pour entrée/sortie
	        switch(mapper[index].map[i][j])
			{
				case 0:
					html += "<td class='grass'>";
					break
				case 1:
					html += "<td class='water'>";
					break;
				case 2:
					html += "<td class='rock'>";
					break;
				case 3:
					html += "<td class='block'>";
					break;
				case 4:
				case 5:
					html += "<td class='out'>";
					break;

			}
        }    
	    //on oubli pas de fermer le tr
	    html += "</tr>"
    }   
    //on ferme la balise table
    html += "</table>";
    //on injecte dans le html
    resultMap.innerHTML =  html
}

//fonction de gestion de déplacement de notre personnage sur notre map
function movePerso(event) {
    //condition sur les touches appuyées du claviers si ça ne fonctionne pas event.key et "ArrowBack", "ArrowFront", "ArrowLeft", "ArrowRight"
    switch(event.keyCode) {
        //si c'est la touche du bas
        case BACK:
            //on initialise une chaine de charactère vide au className du perso
            perso.className = "";
            //on incrémente vers le bas de 1
            back++
            //on limite à 9 au dizieme on retourne à 1
            if(back > 9){
                back = 1
            }
            //on ajoute la classe positionFace et le numéro back qui va nous mettre la bonne image
            perso.classList.add("positionFace-"+back)
            //si la position est ok (appel de la fonction isValidatePosition)
            if(isValidatePosition(positionX, positionY, mapper, BACK)){
                //changement de la position Y
                positionY += speed
                //on modifie la position dans le css
                perso.style.top = positionY + "px";
            }    
        break;        
        //si c'est la touche du haut
        case FRONT:
            //on initialise une chaine de charactère vide au className du perso
            perso.className = "";
            //on incrémente vers le haut de 1
            front++
            //on limite à 9 au dizieme on retourne à 1
            if(front > 9){
                front = 1
            }
            //on ajoute la classe positionBack et le numéro front qui va nous mettre la bonne image
            perso.classList.add("positionBack-"+front)
            //si la position est ok (appel de la fonction isValidatePosition)
            if(isValidatePosition(positionX, positionY, mapper, FRONT)){
                //changement de la position Y
                positionY -= speed
                //on modifie la position dans le css
                perso.style.top = positionY + "px";
            }    
        break;        
        //si c'est la touche de gauche
        case LEFT:
            //on initialise une chaine de charactère vide au className du perso
            perso.className = "";
            //on incrémente vers la gauche de 1
            left++
            //on limite à 9 au dizieme on retourne à 1
            if(left > 9){
                left = 1
            }
            //on ajoute la classe positionLeft et le numéro left qui va nous mettre la bonne image
            perso.classList.add("positionLeft-"+left)
            //si la position est ok (appel de la fonction isValidatePosition)
            if(isValidatePosition(positionX, positionY, mapper, LEFT)){
                //changement de la position X
                positionX -= speed
                //on modifie la position dans le css
                perso.style.left = positionX + "px";
            }    
        break;        
        //si c'est la touche de droite
        case RIGHT:
            //on initialise une chaine de charactère vide au className du perso
            perso.className = "";
            //on incrémente vers la droite de 1
            right++
            //on limite à 9 au dizieme on retourne à 1
            if(right > 9){
                right = 1
            }
            //on ajoute la classe positionRight et le numéro right qui va nous mettre la bonne image
            perso.classList.add("positionRight-"+right)
            //si la position est ok (appel de la fonction isValidatePosition)
            if(isValidatePosition(positionX, positionY, mapper, RIGHT)){
                //changement de la position X
                positionX += speed
                //on modifie la position dans le css
                perso.style.left = positionX + "px";
            }
        break;        
    }            
}

//fonction de limitation de l'espace ou le personnage peut aller (éviter l'eau, le rocher)
function isValidatePosition(positionX, positionY, mapper, mode) {
  
    //on initialise un index X et Y à 0
    let indexI = 0
	let indexY = 0
    //condition qui vérifie quel touche fleche il a appuyé if elsif (ou switch au choix)
    switch(mode){
        //attribution de index X et Y calculé selon la position demandé par l'utilisateur pour chacune des touches parseInt(positionY + 40 / 60)
        //BACK = 40, 30 FRONT = 0, 30 LEFT = 30,20 RIGHT = 30, 40
        case BACK:
            indexI = parseInt((positionY + 40) / 60);
		    indexY =  parseInt((positionX + 30) / 60);
        break;
        case FRONT:
            indexI = parseInt((positionY + 0) / 60);
		    indexY =  parseInt((positionX + 30) / 60);
        break;
        case LEFT:
            indexI = parseInt((positionY + 30) / 60);
		    indexY =  parseInt((positionX + 20) / 60);
        break;
        case RIGHT:
            indexI = parseInt((positionY + 30) / 60); 
		    indexY =  parseInt((positionX + 40) / 60); 
        break;
    }
    //récupération de la position indexX et indexY sur la propriété map de mapper qu'on stock dans une let type
    let type = mapper[mapIndex].map[indexI][indexY];
	console.log('type : ', type);
    //si type est 5
    if(type === 5) {    
        //on incrémente mapIndex
        mapIndex++
        //si mapIndex est plus grand ou egal au nombre de map
        if(mapIndex >= mapper.length) {
            // on repart à l'index 0
            mapIndex = 0
        }    
        //appel de la fonction createMap en mode start
        createMap(mapper, mapIndex, "start")
    
    //si type est 4   
    } else if (type === 4) {
        //on décrémente mapIndex
        mapIndex--
        //si mapIndex ets inférieur à 0 donc arrivé en dessous du premier index
        if(mapIndex < 0) {
            //mapIndex repart au dernier index
            mapIndex=mapper.length - 1;
        }    
        //appel de la fonction createmap en mode end
        createMap(mapper, mapIndex, "end")
    //si type est 0
    }else  if(type === 0 ) {
        //on retourne le booléen true
        return true
    //sinon
    }else{
        //on retourne false
        return false
    }     
}

/* CODE PRINCIPAL */
//initialisation de la map
createMap(mapper, mapIndex, "start")
//gestionnaire d'évenements du boutton de direction appuyé sur le clavier
document.addEventListener('keydown', movePerso)