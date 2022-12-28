<?php

namespace Controllers\Admin;

class Order extends \Controllers\Admin
{
   protected $modelName = \Models\Order::class;
   
   protected $nameCrud = "Order";
   
   protected $pageTitle = "Gestion des commandes";
    
    public function index() {
           
           //titre de la page
            $this->tplVars = $this->tplVars + [
                'page_title' => $this->pageTitle
            ];
            
            //liste des données
            $this->tplVars = $this->tplVars + [
                'list' => $this->model->findAllOrder()
            ];
                
            //afficher la liste 
            \Renderer::showAdmin(strtolower($this->nameCrud)."/list",$this->tplVars);

        
    }
    
    public function detail() 
    {
        //titre de la page
        $this->pageTitle = "Détail de la commande";
        
            //controler que $_GET['id'] existe bien 
        if (isset($_GET['id']) && ctype_digit($_GET['id'])) {
            
            //transmettre à $this->tplVars ces informations
            
            //recupérer les infos de la commande
            $this->tplVars = $this->tplVars + ['Order' => $this->model->find(intval($_GET['id']))];
            
            //récupérer les informations de l'utilisateur
            $UserModel = new \Models\User();
            $UserInfos = $UserModel->getAddress($this->tplVars['Order']['User_Id']);
            
            $this->tplVars = $this->tplVars + ['User' => $UserInfos];
            
            //recupérer le détail de la commande
            $OrderDetails = $this->model->getDetails(intval($_GET['id']));  
            
            $this->tplVars = $this->tplVars + ['OrderDetails' => $OrderDetails];
            
            
        
        //titre de la page
            $this->tplVars = $this->tplVars + [
                    'page_title' => $this->pageTitle
                ];
                
            //afficher la liste des rayons
            \Renderer::showAdmin(strtolower($this->nameCrud)."/edit",$this->tplVars);
        
        }
        else {
            throw new \Exception('Impossible d\'afficher la page !');
        }
    }
    
    public function update(array $data=[])
    {
        //tester les champs
        if (empty($_POST['status']) || empty($_POST['id']))
       {
           
           \Session::addFlash('error', 'champ(s) obligatoire(s) non rempli(s) !');
            //rediriger l'utilisateur vers le formulaire 
            \Http::redirectBack();
       }
        
        //traiter le formulaire
        //preparation un tableau
        switch(intval($_POST['status'])) 
        {
            case 1:
                $data['Paiement_at'] = NULL;
                $data['Shipping_at'] = NULL;
                break;
                
            case 2:
                $data['Paiement_at'] = date("Y-m-d H:i:s");
                $data['Shipping_at'] = NULL;
                break;
                
            case 3:
                $data['Shipping_at'] = date("Y-m-d H:i:s");
                break;
                
        }
        
        $data['Status'] = intval($_POST['status']);
        $data['Id'] = intval($_POST['id']);
        //si on arrive ici on va pouvoir insérer notre nouveau rayon
        parent::update($data);
        
    }
    
    
}