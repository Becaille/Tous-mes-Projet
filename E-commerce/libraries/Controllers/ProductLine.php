<?php

namespace Controllers;

class ProductLine extends Controller 
{
   protected $modelName = \Models\ProductLine::class;
   
   //protected $modelName = new \Models\ProductLine();
   
   /**
     * construction page rayon
     *
     * 
     */
   public function index() {
                
        //controler que $_GET['id'] existe bien 
        if (isset($_GET['id']) && ctype_digit($_GET['id'])) {
                
        
                //recupération du titre du rayon
                $productLine = $this->model->find(intval($_GET['id']));
                
                //récupération de la liste des produits pour un rayon donné
                /*
                - mettre en place un nouveau model
                - d'une methode pour faire une requete
                
                - réfléchir sur la requete
                
                $prodModel = new \Models\Product();
                
                aprés récupérer le resultat de la requete
                
                
                */
                
                $prodModel = new \Models\Product();
                
                $prodList = $prodModel->findAllByPL_ID(intval($_GET['id']));
                
                
                //rajout du nom du rayon et de la liste des produits dans $this->tplVars
                
                $this->tplVars = $this->tplVars + [
                    'pLine_name' => $productLine['Name'],
                    'prods' => $prodList
                ];
                
                //affichage
                \Renderer::show("page-rayon",$this->tplVars);
        }
        else {
            throw new \Exception('Impossible d\'afficher la page rayon !');
        }

        
    }
}