<?php

namespace Controllers\Admin;

class Brand extends \Controllers\Admin
{
   protected $modelName = \Models\Brand::class;
   
   protected $nameCrud = "Brand";
   
   protected $pageTitle = "Gestion des marques";
    
    
    
    public function create(array $data=[])
    {
        //tester les champs
        if (empty($_POST['name']) || empty($_FILES['logo']['name']))
       {
           //au moins un des 2 champs est vide
           \Session::addFlash('error', 'champ(s) obligatoire(s) non rempli(s) !');
            //rediriger l'utilisateur vers le formulaire 
            \Http::redirectBack();
       }
       
       
       
       //upload du logo
       //test sur le format du fichier
       $allowed_file_types = ['image/png'];
       
       //tester si le type MIME du fichier ($_FILES['logo']['type'] est dans le tableau $allowed_file_types 
        if (!in_array($_FILES['logo']['type'], $allowed_file_types)) 
        {
          //mauvais format de fichier  
          \Session::addFlash('error', 'mauvais format de fichier !');
            //rediriger l'utilisateur vers le formulaire 
            \Http::redirectBack();  
            
        }
        
        //traiter le formulaire
        //preparation un tableau
        $data['Name'] = $_POST['name'];
        //si on arrive ici on va pouvoir insérer et récupérer l'id
        $newId = $this->model->insert($data);
        
        
        
        if (!$newId >0) 
        {
            //l'insertion a échouée
            \Session::addFlash('error','l\'insertion a échouée !');
            //rediriger l'utilisateur vers le formulaire
            \Http::redirectBack();
        }
        
        //finalisation de l'upload
        $uploaddir = 'uploads/'.strtolower($this->nameCrud).'/';
        $uploadfile = $uploaddir.$newId.".png";
        
        
        
        if (!move_uploaded_file($_FILES['logo']['tmp_name'], $uploadfile))
        {
            //erreur d'upload
            \Session::addFlash('error', 'upload non valide !');
            //rediriger l'utilisateur vers le formulaire 
            \Http::redirectBack();  
        }
        
        //mise à jour de la base de données
        $data['Logo'] = $newId.".png";
        $data['Id'] = $newId;
        
        
        
        parent::update($data);
        
    }
    
    public function newForm() 
    {
        //titre de la page
        $this->pageTitle = "Création d'une marque";
        
        parent::newForm();
    }
    
    public function editForm() 
    {
        //titre de la page
        $this->pageTitle = "Edition d'une marque";
        
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
        //si upload modifier le fichier
        if (!empty($_FILES['logo']['name'])) 
        {
           //upload du logo
               //test sur le format du fichier
               $allowed_file_types = ['image/png'];
               
               //tester si le type MIME du fichier ($_FILES['logo']['type'] est dans le tableau $allowed_file_types 
                if (!in_array($_FILES['logo']['type'], $allowed_file_types)) 
                {
                  //mauvais format de fichier  
                  \Session::addFlash('error', 'mauvais format de fichier !');
                    //rediriger l'utilisateur vers le formulaire 
                    \Http::redirectBack();  
                    
                } 
                
                //finalisation de l'upload
        $uploaddir = 'uploads/'.strtolower($this->nameCrud).'/';
        $uploadfile = $uploaddir.intval($_GET['id']).".png";
        
        
        
        if (!move_uploaded_file($_FILES['logo']['tmp_name'], $uploadfile))
        {
            //erreur d'upload
            \Session::addFlash('error', 'upload non valide !');
            //rediriger l'utilisateur vers le formulaire 
            \Http::redirectBack();  
        }
        
        //mise à jour de la base de données
        $data['Logo'] = intval($_GET['id']).".png";
        }
        $data['Id'] = intval($_POST['id']);
        //si on arrive ici on va pouvoir insérer notre nouveau rayon
        parent::update($data);
        
    }
    
    
}