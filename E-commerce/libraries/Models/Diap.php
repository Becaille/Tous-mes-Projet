<?php

namespace Models;

class Diap extends Model
{
    //pour utiliser Model, on doit définir une propriété protected $table
    //qui contient le nom de la table principale
    protected $table = T_DIAP;
    
    /**
     * renvoi les diapos d'un produit
     *
     * 
     */
    public function findAllByProduct(int $prod): array
    {
        $query = $this->db->prepare("
            SELECT * 
            FROM $this->table 
            WHERE Product_Id = :id");
        
        $query->execute([
            ":id" => $prod]);
        

        return $query->fetchAll(\PDO::FETCH_ASSOC);
    }
    
    
}

?>