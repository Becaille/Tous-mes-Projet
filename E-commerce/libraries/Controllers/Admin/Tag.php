<?php

namespace Controllers\Admin;

class Tag extends \Controllers\Admin
{
   protected $modelName = \Models\Tag::class;
   
   protected $nameCrud = "Tag";
   
   protected $pageTitle = "Gestion des tags";
    
    
    
    public function create(array $data=[])
    {
        //tester les champs
        if (empty($_POST['name']))
       {
           //au moins un des 2 champs est vide
           \Session::addFlash('error', 'champ(s) obligatoire(s) non rempli(s) !');
            //rediriger l'utilisateur vers le formulaire 
            \Http::redirectBack();
       }
        
        //traiter le formulaire
        //preparation un tableau
        $data['Name'] = $_POST['name'];
        //si on arrive ici on va pouvoir insérer 
        parent::create($data);
    }
    
    public function newForm() 
    {
        //titre de la page
        $this->pageTitle = "Création d'un tag";
        
        parent::newForm();
    }
    
    public function editForm() 
    {
        //titre de la page
        $this->pageTitle = "Edition d'un tag";
        
        parent::editForm();
    }
    
    public function update(array $data=[])
    {
        //tester les champs
        if (empty($_POST['name']) || empty($_POST['id']))
       {
           //au moins un des 3 champs est vide
           \Session::addFlash('error', 'champ(s) obligatoire(s) non rempli(s) !');
            //rediriger l'utilisateur vers le formulaire 
            \Http::redirectBack();
       }
        
        //traiter le formulaire
        //preparation un tableau
        
        $data['Name'] = $_POST['name'];
        $data['Id'] = intval($_POST['id']);
        //si on arrive ici on va pouvoir insérer notre nouveau rayon
        parent::update($data);
        
    }
    
    
}