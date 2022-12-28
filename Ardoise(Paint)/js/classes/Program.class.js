class Program {

    constructor() {
        //on fait de la composition on instancie nos classes ColorPalette, Pen et Slate
        this.colorPalette = new ColorPalette();
        this.pen = new Pen();
        this.canvas = new Slate(this.pen);
    }
    
    // Gestionnaire d'évènement de clic sur l'outil de pipette.
    onClickColorPicker() {
        //la palette apparait
        $('#color-palette').fadeIn('slow');
        //document.querySelector("#color-palette").classList.remove("hide")
    }
    
    // Gestionnaire d'évènement de clic pour sélectionner une couleur de crayon prédéfinie.
    onClickPenColor(event) {

        // Récupération de la <div> qui a déclenché l'évènement.
        const div = event.currentTarget;
        // Récupération de l'attribut HTML5 data-color.
        const penColor = div.dataset.color;   // Avec jQuery cela donnerait $(div).data('color')
        // Modification de la couleur du crayon.
        this.pen.setColor(penColor);
    }
    
    // Gestionnaire d'évènement de clic pour changer la taille du crayon.
    onClickPenSize(event) {

        // Récupération du <button> qui a déclenché l'évènement.
        const button = event.currentTarget;
        // Récupération de l'attribut HTML5 data-size.
        const penSize = button.dataset.size;   // Avec jQuery cela donnerait $(button).data('size')
        // Modification de l'épaisseur du crayon.
        this.pen.setSize(penSize);
    }
    
    // Gestionnaire d'évènement de changement de la couleur du crayon.
    onPickColor() {
        // Récupération de la couleur sur laquelle l'utilisateur a cliqué.
        const color = this.colorPalette.getPickedColor();
        // Changement de la couleur du crayon.
        this.pen.setColorAsRgb(color.red, color.green, color.blue);
        //on fait disparaitre la palette
        $('#color-palette').fadeOut('slow');
        //document.querySelector("#color-palette").classList.add("hide")
    }
    
    // Méthode appelée au démarrage de l'application.
    start() {
        // Installation des gestionnaires d'évènements des outils.
        $('#tool-clear-canvas').on('click', this.canvas.clear.bind(this.canvas));
        $('#tool-color-picker').on('click', this.onClickColorPicker.bind(this));
        // Installation des gestionnaires d'évènements de configuration du crayon.
        $('.pen-color').on('click', this.onClickPenColor.bind(this));
        
        /*for(let i = 0; i < stylo.length; i++){
            stylo[i].addEventListener("click", (e)=>{
                console.log(e.currentTarget)
                let mycolor = e.currentTarget

                this.onClickPenColor(mycolor.dataset.color)
            })
            //on aurait du suppr les deux première lignes de la fonction et recup la couleur en argument
        }*/
        // Création d'un évènement spécifique à l'application.
        $(document).on('magical-slate:pick-color', this.onPickColor.bind(this));
    }
}