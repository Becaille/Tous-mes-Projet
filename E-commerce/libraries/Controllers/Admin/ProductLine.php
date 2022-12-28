<?php

namespace Controllers\Admin;

class ProductLine extends \Controllers\Admin
{
   protected $modelName = \Models\ProductLine::class;
   
   protected $nameCrud = "ProductLine";
   
   protected $pageTitle = "Gestion des rayons";
    
    
    
    public function create(array $data=[])
    {
        //tester les champs
        if (empty($_POST['name'])  || empty($_POST['icon']))
       {
           //au moins un des 2 champs est vide
           \Session::addFlash('error', 'champs obligatoires non remplis !');
            //rediriger l'utilisateur vers le formulaire 
            \Http::redirectBack();
       }
        
        //traiter le formulaire
        //preparation un tableau
        $data['Name'] = $_POST['name'];
        $data['Icon'] = $_POST['icon'];
        //si on arrive ici on va pouvoir insérer 
        parent::create($data);
    }
    
    public function newForm() 
    {
        //titre de la page
        $this->pageTitle = "Création d'un rayon";
        
        parent::newForm();
    }
    
    public function editForm() 
    {
        //titre de la page
        $this->pageTitle = "Edition d'un rayon";
        
        parent::editForm();
    }
    
    public function update(array $data=[])
    {
        //tester les champs
        if (empty($_POST['name']) || empty($_POST['icon']) || empty($_POST['id']))
       {
           //au moins un des 3 champs est vide
           \Session::addFlash('error', 'champs obligatoires non remplis !');
            //rediriger l'utilisateur vers le formulaire 
            \Http::redirectBack();
       }
        
        //traiter le formulaire
        //preparation un tableau
        
        $data['Name'] = $_POST['name'];
        $data['Icon'] = $_POST['icon'];
        $data['Id'] = intval($_POST['id']);
        //si on arrive ici on va pouvoir insérer notre nouveau rayon
        parent::update($data);
        
    }
    
    
}