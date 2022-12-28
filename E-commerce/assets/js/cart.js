class Cart {

	// Elements
	elements = {};
	triggers = [];

	// Templates
	templates = {
		item: '<li><span>{name}</span><span>{count}</span><strong>{price}</strong><button type="button" class="button remove" id="{ref}">&times;</button></li>',
		items: '<ul class="unstyled">{items}'
			+ '<li class="total"><span>TOTAL</span><span>{count}</span><strong>{total}</strong></li>'
			+ '</ul>'
			+ "<form method='POST' action='index.php?controller=cart&task=step1'><input type='hidden' id='cartJson' name='cart' value='{cartJson}' /><button type='submit' class='button'>valider la commande</button></form>",
	};

	// Data
	product = {};
	cartList = [];

	// Base de donnée locale
	storageName = 'hitechCart';

	// Devise
	currency = '€';

	// Classes CSS
	hiddenClass = 'hidden';

	// Constructeur
	constructor(badgeSelector, tableSelector, emptySelector) {
		// Enregistrement des éléments
		this.addElement('badge', badgeSelector);
		this.addElement('table', tableSelector);
		this.addElement('empty', emptySelector);
	}

	// Récupère les données depuis la base de données locale
	restore() {
		let data = localStorage.getItem(this.storageName);
		if (data) this.cartList = JSON.parse(data);
	};

	// Enregistre les données dans la base de données locale
	save() {
		localStorage.setItem(this.storageName, JSON.stringify(this.cartList));
	}

	// Ajoute un produit
	addProduct(ref, name, price) {
		this.product = {
			ref: ref,
			name: name,
			price: price,
		};
	}
	
	// Ajouter un produit au panier
	addToCart(ref) {
		for (const i in this.cartList) {
			//test si produit dejà ajouté
			if (this.cartList[i].ref == this.product.ref) {
				this.cartList[i].count++;	
				this.update();
				this.save();
				return;
			}
		}
		
		//nouveau produit
		this.cartList.push({
			ref: this.product.ref,
			name: this.product.name,
			price: this.product.price,
			count: 1
		});
		
		this.update();
		this.save();
		return;
		
	}
	
	// Enlever un produit du panier
	removeFromCart(ref) {
		this.cartList.splice(this.cartList.indexOf(ref), 1);
		this.update();
		this.save();
	}
	
	
	
	// Mise a jour des informations produits
	update() {
		// Variables
		let count = 0;
		let total = 0.0;
		let items = '';
		
		

		// On compte les articles et on additionne les prix
		for (const i in this.cartList) {
			count += this.cartList[i].count;
			total += this.cartList[i].price * this.cartList[i].count;
			//ajout des items
			items += this.template('item', this.cartList[i]);
		}

		// Mise à jour des attributs du badge
		if (this.elements.badge) {
			this.elements.badge.dataset.badge = count ? count : '';
			this.elements.badge.dataset.total = total ? total.toFixed(2) + this.currency : '';
		}

		// Retour si aucune table défini
		if (!this.elements.table) return;

		

		// Ajout du HTML
		this.elements.table.innerHTML = this.template('items', {
			items: items,
			count: count,
			total: total.toFixed(2) + this.currency,
			cartJson: JSON.stringify(this.cartList)
		});
		
		// Supprime les gestionnaires existants
		this.removeTriggers();
		
		// Ajout des triggers
		for (const i in this.cartList) {
			let trigger = this.addTrigger('#'+this.cartList[i].ref, 'removeFromCart', this.cartList[i].ref);
			this.triggers.push(trigger);	
		}
			
		
		

		

		// Affiche ou cache la table en fonction du nombre d'articles
		if (count > 0) {
			this.elements.empty.classList.add(this.hiddenClass);
			this.elements.table.classList.remove(this.hiddenClass);
		} else {
			this.elements.empty.classList.remove(this.hiddenClass);
			this.elements.table.classList.add(this.hiddenClass);
		}
	}

	// Retourne un template
	template(name, values) {
		let template = this.templates[name];
		for (let prop in values) {
			template = template.replace('{'+prop+'}', values[prop]);
		}
		return template;
	}

	// Ajoute un élément
	addElement(name, selector) {
		if (selector) this.elements[name] = document.querySelector(selector);
	}
	
	// Ajouter un déclancheur
	addTrigger(element, action, params=null, eventType='click') {
		// Element
		element = (typeof element === 'string') ? document.querySelector(element) : element;
		
		// Ajout de variables à l'élément pour les retrouver facilement dans le gestionnaire (handler)
		element._this = this;
		element._action = action;
		element._params = params;
		element._eventType = eventType;

		// Ajout de l'écouteur d'évenement à l'élément
		element.addEventListener(eventType, this.handler, false);

		// Return
		return element;
	}
	
	// Supprime les écouteurs d'évenement
	removeTriggers() {
		while (this.triggers.length > 0) {
			let trigger = this.triggers.shift();
			trigger.removeEventListener(trigger._eventType, this.handler, false);
		}
	}

	// Gestionnaire d'évenement
	handler(event) {
		this._this[this._action](this._params);
		event.preventDefault();
		return false;
	}
}
