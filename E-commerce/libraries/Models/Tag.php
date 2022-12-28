<?php

namespace Models;

class Tag extends Model
{
    //pour utiliser Model, on doit définir une propriété protected $table
    //qui contient le nom de la table principale
    protected $table = T_TAGS;
    
    /**
     * renvoie la liste des tags reliés à un produit
     *
     * 
     */
    public function findAllByProduct(int $prod): array
    {
        $query = $this->db->prepare("
            SELECT $this->table.Name 
            FROM $this->table
            INNER JOIN ".T_T_PROD." 
            ON $this->table.Id = ".T_T_PROD.".Tag_Id 
            WHERE Product_Id = :id");
        
        $query->execute([
            ":id" => $prod]);
        

        return $query->fetchAll(\PDO::FETCH_ASSOC);
    }
    
}

?>