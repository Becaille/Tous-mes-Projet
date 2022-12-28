class Program {

	constructor() {
	    //création de nos deux personnages qui vont s'affronter
	    this.gege = new Perso('Kratos', 300, 50, 7, 120);
		this.nanard = new Perso('Dragon', 280, 45, 18, 160);
	    //affichage des infos des perso (fonction)
	    this.affichage();
	    //gestionnaire d'évenement pour attaque/sort/defense
	    document.querySelector("#attaquer").addEventListener("click", this.onClickAttaque.bind(this))
	    document.querySelector("#defendre").addEventListener("click", this.onClickDefense.bind(this))
	    document.querySelector("#sort").addEventListener("click", this.onClickSort.bind(this))
	}
	
	affichage() {
	    //si nos deux perso ont toujours de la vie
	    if(this.gege.hp > 0 && this.nanard.hp > 0) {
	        //on affiche le journal de leurs noms, points de vie, attaque, defense, magie
	        document.querySelector("#perso1").innerHTML = `${this.gege.name}: ${this.gege.hp} HP, attaque : ${this.gege.attack}, défense : ${this.gege.defense}, magie : ${this.gege.magie}`;
	        
	        document.querySelector("#perso2").innerHTML = `${this.nanard.name}: ${this.nanard.hp} HP, attaque : ${this.nanard.attack}, défense : ${this.nanard.defense}, magie : ${this.nanard.magie}`;
	        
	   //sinon
	   }else{
	     //on supprime notre menu de jeu
	    document.querySelector("#commande").style.display = "none";
	    //si notre perso à de la vie
	    if(this.gege.hp > 0) {
	        //on affiche la victoire
	        document.querySelector("#affichage").innerHTML = `<p>Victoire de ${this.gege.name} t'es un bon!</p>`
	    //sinon
	    }else{
	        //on affiche la défaite
	        document.querySelector("#affichage").innerHTML = `<p>Défaite, ${this.nanard.name} a gagné espèce de looser!</p>`
	    }
	   } 
	}
	
	onClickAttaque(event) {
	    //suppression du comportement par défaut du navigateur
	    event.preventDefault()
	    //on vide notre paragraphe #info p
	    document.querySelector("#info p").innerHTML = ""
	    //notre perso attaque l'adversaire (fonction)
	    this.gege.attaquer(this.nanard);
	    //l'adversaire contre
	    this.contre()
	    //on affiche l'état des joueurs
	    this.affichage()
	}
	
	onClickSort(event) {
	    //suppression du comportement par défaut du navigateur
	    event.preventDefault()
	    //on vide notre paragraphe #info p
	    document.querySelector("#info p").innerHTML = ""
	    //si notre perso a toujours des points de magie
	    if (this.gege.magie > 0) {
	        //on envoi un sort envers l'adversaire (fonction)
	        this.gege.sort(this.nanard);
	        //l'adversaire contre
	    	this.contre()
	    	//on affiche l'état des joueurs
	    	this.affichage()
	    }else{
	    	console.log('plus de points de magie, veuillez jouer autre chose');
	    }
	}
	
	onClickDefense(event) {
	    //suppression du comportement par défaut du navigateur
	    event.preventDefault()
	    //on vide notre paragraphe #info p
	    document.querySelector("#info p").innerHTML = ""
	    //notre perso se défend (fonction)
	    this.gege.defendre();
	    //l'adversaire contre
	    this.contre()
	    //on affiche l'état des joueurs
	    this.affichage()
	}
	
	contre() {
	    //on récupère un chiffre au hasard entre 1 et 3
	    let random = getRandomInteger(1, 3);
	    //si notre chiffre est 1
	    if (random == 1) {
	        //l'adversaire attaque notre perso
	        this.nanard.attaquer(this.gege);
	   //sinon si notre chiffre est 2
	   } else if (random == 2) {

	        //si l'adversaire a toujours des points de magie
	        if(this.nanard.magie > 0) {
	            //il va jeter un sort sur notre perso
	            this.nanard.sort(this.gege);
	        //sinon
	        }else{
	            //on retire un contre
	            this.contre()
	        }     
	   //sinon
	   }else{ 
	        //l'adversaire se défend
	        this.nanard.defendre();
	   }
	    
	}
}