<?php

namespace Controllers;

class Search extends Controller 
{
   //contruction du nom du modele à utiliser
   protected $modelName = \Models\Product::class;
    
   /**
     * traitement formulaire de recherche
     *
     * 
     */
    public function index() {
        
        //test si on reçoit bien les variables en POST
        if (isset($_POST['query']) && isset($_POST['productline']))
        {
           if (empty($_POST['query']) && intval($_POST['productline']) == 0)
           {
               \Session::addFlash('error', 'renseigner au moins un champ !');
                //rediriger l'utilisateur vers le formulaire 
                \Http::redirectBack();
           }
           
            
            
           //recherche avec produit et rayon
           $this->tplVars = $this->tplVars + [
                'prods' => $this->model->searchProduct($_POST['query'], intval($_POST['productline']))
            ];
            
            //nb de résultat
            $this->tplVars = $this->tplVars + [
                'nb' => count($this->tplVars['prods'])
            ];
            
            //critères de recherche pour le titre
            if ($_POST['query'] == '')
            {
                $this->tplVars = $this->tplVars + [
                'searchTitle' => 'Recherche'
            ];  
            }
            else {
               $this->tplVars = $this->tplVars + [
                'searchTitle' => 'Recherche pour : '.htmlspecialchars($_POST['query'])
                ];   
            }
            
              
            
            if (intval($_POST['productline']) > 0) {
                
                $prodLineModel = new \Models\ProductLine();
                $prodLine = $prodLineModel->find(intval($_POST['productline']));
                
                $this->tplVars['searchTitle'] .= ' dans le rayon :'.htmlspecialchars($prodLine['Name']);
            }
            
            //critères de recherche pour le formulaire de recherche
            $this->tplVars = $this->tplVars + [
                'search' => [
                        'query' => htmlspecialchars($_POST['query']), 
                        'prodl' => intval($_POST['productline'])
                        ]
            ]; 
        
           

           //affichage
            \Renderer::show("search",$this->tplVars); 
        }
        else {
            
           \Session::addFlash('error', 'champ(s) non rempli(s) !');
            //rediriger l'utilisateur vers le formulaire 
            \Http::redirectBack();
        }
        
        
    }
}