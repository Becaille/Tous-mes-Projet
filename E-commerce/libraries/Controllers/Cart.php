<?php

namespace Controllers;

class Cart extends Controller 
{
   //contruction du nom du modele à utiliser
   protected $modelName = \Models\Order::class;
   
   /**
     * construction formulaire validation du panier pour paiement
     *
     * 
     */
   public function step1() {
        
        //verifier si on est logué
        
        \Session::redirectIfNotConnected();
         
        if(!isset($_POST['cart']))
        {
            //si pas de panier redirection vers la page d'accueil
            \Session::addFlash('error','panier vide !');
            
            \Http::redirect(WWW_URL);
        
        }
        
        
        
        //insérer la commande dans la table Orders
        $idOrder = $this->model->insert([
            'User_Id' => \Session::getId(),
            'Status' => 1
            ]);
            
        //insérer les produit dans la table Order_details
        
        foreach(json_decode($_POST['cart']) as $item)
        {
          $this->model->insertDetail([
              'Order_Id' => $idOrder,
              'Product_Id' => intval(str_replace("product-","", $item->ref)),
              'Quantity' => intval($item->count)
              ]);
        }
        
        //id de la commande
        $this->tplVars = $this->tplVars + ['Order' => $idOrder];
        
        //token de la commande
        $myToken = new \Token();
        
        $this->tplVars = $this->tplVars + ['Token' => $myToken->encode($idOrder)];
        
        
        //récupérer les informations de l'utilisateur
        $UserModel = new \Models\User();
        $UserInfos = $UserModel->getAddress(\Session::getId());
        
        $this->tplVars = $this->tplVars + ['User' => $UserInfos];
        
        //recupérer le détail de la commande
        $OrderDetails = $this->model->getDetails($idOrder);  
        
        $this->tplVars = $this->tplVars + ['OrderDetails' => $OrderDetails];
            
        //affichage
        \Renderer::show("order",$this->tplVars);
        
    }
    
    /**
     * validation du paiement de la commande
     *
     * 
     */
    public function step2() {
     //payer la commande
     
     //verifier si on est logué
        
        \Session::redirectIfNotConnected();
        
        if(!isset($_POST['order']))
        {
            //si pas de panier redirection vers la page d'accueil
            \Session::addFlash('error','une erreur est survenue !');
            
            \Http::redirect(WWW_URL);
        
        }
        
        //decoder l'id de la commande
        $myToken = new \Token();
        
        $orderId = intval($myToken->decode($_POST['order']));
        
        //dans la mise à jour s'assure que la commande correspond bien au user connecté
        
        //mettre à jour la commande
        $this->model->updateOrder($orderId);
        
        //détruire le token
        \Session::deleteToken();
        
        //affichage
        \Renderer::show("orderEnd",$this->tplVars);
     
    }
}