<?php

namespace Controllers;

class Product extends Controller 
{
   //contruction du nom du modele à utiliser
   protected $modelName = \Models\Product::class;
   
   /**
     * construction page produit
     *
     * 
     */
   public function index() {
        
        //controler que $_GET['id'] existe bien 
        if (isset($_GET['id']) && ctype_digit($_GET['id'])) {
            
            /*//recupération des informations du produit
            $prod = $this->model->find(intval($_GET['id']));
            
            //rajout des informations du produit dans $this->tplVars
                
                $this->tplVars = $this->tplVars + [
                    'prod' => $prod
                ];*/
                
            //même chose en plus rapide 
            
            $this->tplVars = $this->tplVars + [
                    'prod' => $this->model->findProduct(intval($_GET['id']))
                ];
                
            //tester si le produit est bien actif
            
            if (
                intval($this->tplVars['prod']['Status']) == 1 || 
                intval($this->tplVars['prod']['Status']) == 3
                )
            {
                var_dump($this->tplVars['prod']['Status']);
                //retour à la page précédente
                \Http::redirectBack();
            }
            
            //recupérer la liste des tags
            $TagModel = new \Models\Tag();
            
            $this->tplVars = $this->tplVars + [
                    'tags' => $TagModel->findAllByProduct(intval($_GET['id']))
                ];
                
            //recupérer la liste des diapos
            $DiapModel = new \Models\Diap();
            
            $this->tplVars = $this->tplVars + [
                    'diaps' => $DiapModel->findAllByProduct(intval($_GET['id']))
                ];
        
            //variable qui indique que l'on est sur la page article   
            $this->tplVars['isArticle'] = true;
            //transmettre à $this->tplVars ces informations
        
        //affichage
        \Renderer::show("article",$this->tplVars);
        
        }
        else {
            throw new \Exception('Impossible d\'afficher la page produit !');
        }
        
    }
}