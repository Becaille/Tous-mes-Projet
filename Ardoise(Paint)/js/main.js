/*
 * Installation d'un gestionnaire d'évènement déclenché quand l'arbre DOM sera
 * totalement construit par le navigateur.
 *
 * Le gestionnaire d'évènement est une fonction anonyme que l'on donne directement à jQuery.
 */
/*document.addEventListener("DOMContentLoaded", function(){
    
})*/
$(function()
{
    // Création puis démarrage de l'application.
    const magicalSlate = new Program();
    magicalSlate.start();
    
})