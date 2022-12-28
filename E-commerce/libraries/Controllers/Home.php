<?php

namespace Controllers;

class Home extends Controller 
{
   /**
     * construction page d'accueil
     *
     * 
     */
    public function index() {
        
        
        //affichage
        \Renderer::show("home",$this->tplVars);
        
    }
}