let story = document.querySelector("#info p")
class Perso {
	constructor(name, hp, attack, defense, magie) {
	    //initialisation des propriétés du perso
	    this.name = name;
		this.hp = hp;
		this.attack = attack;
		this.defense = defense;
		this.magie = magie;
		
	}
	
	attaquer(perso) {
	    //on enlève les points de dégat en fonction des points de défense de l'adversaire (on stock dans une variable)
	    let degats = this.attack - perso.defense
	    //si les dégats sont inférieur à 10
	    if (degats < 10) {
	        //on inscrit que l'adversaire ne sent plus rien
	        console.log(`${perso.name} ne sent plus rien....`)
	        //on met les dégats à 10 part défaut
	        degats = 10
	    }   
	   //on enlève les points de vie de l'adversaire
	   perso.hp -= degats
	   //on ajoute l'histoire (ce qui s'est passé) dans le html
	   let histoire = `${this.name} attaque, il enlève ${degats} hp à ${perso.name}<br>`;
	   //si l'adversaire n'as plus de point de vie
	   if  (perso.hp <= 0) {
	        //on attribue 0 au hp de l'adversaire
	        perso.hp = 0
	   }     
	    //on inscrit dans le html les points de vie restant à l'adversaire
	   histoire += `${perso.name} a ${perso.hp} points de vie `;
	   story.innerHTML = histoire
	}
	
	sort(perso) {
	    //si il reste des points de magie
	    if (this.magie > 0) {
	        //on choisis des points de magie au hasard entre 1 et la totalité de ses points de magie
	        let degats = getRandomInteger(1, this.magie);
	        //on ajoute l'histoire (ce qui s'est passé) dans le html
	        let histoire = `${this.name} jète un sort, il enlève ${degats} hp à ${perso.name}`;
	        //on enlève les points de vie de l'adversaire
	        perso.hp -= degats;
	        //on enlève les points de magie de l'attaquant
	        this.magie -=  degats;
	        //si l'adversaire n'as plus de point de vie
			if  (perso.hp <= 0) {
	             //on attribue 0 au hp de l'adversaire
	             perso.hp = 0
			}
	        //on inscrit dans le html les points de vie restant à l'adversaire
	        histoire += `${perso.name} a ${perso.hp} points de vie `;
			story.innerHTML = histoire
	    //sinon
	    }else{
	        //on inscrit une phrase qu'on a plus de magie dans le html
	        story.innerHTML = `${this.name} n'a plus de points de magie`
	    }
	}
	
	defendre() {
	    //calcul du ratio de défense on multiplie les points de défense par un chiffre au hasard entre 0 et 1 le tout arrondis (on stock dans une variable)
		let ratio =  Math.round(this.defense * Math.random());
	    //on ajoute l'histoire (ce qui s'est passé) dans le html
	    let histoire = `${this.name} augmente sa défense de ${ratio} points`
	    //on ajoute les points de défense à notre perso ratio / 2
	    this.defense += ratio/2;
	    //on affiche les points de défense de notre perso dans le html
	     histoire += `${this.name} a ${this.defense} points de défense `;
	     story.innerHTML = histoire
	}
}