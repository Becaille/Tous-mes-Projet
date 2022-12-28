<?php

namespace Models;

class Product extends Model
{
    //pour utiliser Model, on doit définir une propriété protected $table
    //qui contient le nom de la table principale
    protected $table = T_PROD;
    
    
    /**
     * Permet de récupérer la liste des données
     *
     * @param integer $id
     * @return array
     */
    public function findAllByPL_ID(int $id)
    {
        
        // Retrouver l'article et le retourner
        $query = $this->db->prepare("SELECT * FROM $this->table WHERE Status = 2 AND ProductLine_Id = :id");
        $query->execute([
            ':id' => $id,
        ]);

        return $query->fetchAll(\PDO::FETCH_ASSOC);
    }
    
    /**
     * Permet de récupérer la liste des données avec une recherche par nom
     *
     * @param string $id
     * @return array
     */
    public function searchProduct(string $search, int $rayon)
    {
        
        if (!$rayon >0)
        {
           // Retrouver les produits
            $query = $this->db->prepare("SELECT * FROM $this->table WHERE Status = 2 AND Name LIKE :query");
    
            $query->execute([
                ':query' => '%'.$search.'%'
            ]); 
        }
        else {
            // Retrouver les produits avec rayon
            $query = $this->db->prepare("SELECT * FROM $this->table WHERE Status = 2 AND ProductLine_Id = :rayon AND Name LIKE :query");
    
            $query->execute([
                ':query' => '%'.$search.'%',
                ':rayon' => $rayon
            ]);
        }
        

        return $query->fetchAll(\PDO::FETCH_ASSOC);
    }
    
    /**
     * Permet de récupérer la liste des données avec le rayon pour chaque produit
     *
     * @param integer $id
     * @return array
     */
    public function findAllWithProductLine() 
    {
       $query = $this->db->prepare("
       SELECT $this->table.Id, $this->table.Name, ".T_P_LINES.".Name AS Productline  
       FROM $this->table
       INNER JOIN ".T_P_LINES
       ." ON ".T_P_LINES.".Id = $this->table.ProductLine_Id");
        
        $query->execute();
        

        return $query->fetchAll(\PDO::FETCH_ASSOC); 
    }
    
    /**
     * Permet de retrouver un enregistrement grâce à son nom
     *
     * @param integer $id
     * @return array|bool|null
     */
    public function findByName(string $name): int
    {
        // Retrouver l'article et le retourner
        $query = $this->db->prepare("SELECT COUNT(*) AS Nb FROM $this->table WHERE Name LIKE :name LIMIT 0,1");
        $query->execute([
            ':name' => $name,
        ]);

        $count = $query->fetch(\PDO::FETCH_ASSOC);
        
        return intval($count['Nb']);
    }
    
    /**
     * Permet d'insérer un nouvel enregistrement dans Tag_product
     *
     * @param int $tag (id du tag), int $id (id du produit)
     */
    public function insertTagProduct(int $tag, int $id)
    {
        $sql = "INSERT INTO ".T_T_PROD." SET 
        Product_Id = :id, Tag_Id = :tag";

 

        $query = $this->db->prepare($sql);

        $query->execute([
            ":id" => $id,
            ":tag" => $tag
            ]);
    }

    /**
     * renvoie la liste des tags lié à un produit
     *
     * 
     */
    
    public function findAllTagByProd(int $id):array
    {
        $query = $this->db->prepare("SELECT Tag_Id FROM ".T_T_PROD." WHERE Product_Id = :id");
        
        $query->execute([
            ":id" => $id
            ]);
            
        $tab = [];
        
        foreach($query->fetchAll(\PDO::FETCH_ASSOC) as $line)
        {
          array_push($tab, $line['Tag_Id']);  
        }
        

        return $tab;
    }
    
    /**
     * supprime les tags liés à un produit
     *
     * 
     */
    public function deleteTagProduct(int $id)
    {
        $query = $this->db->prepare("DELETE FROM ".T_T_PROD." WHERE Product_Id = :id");

        $query->execute(['id' => $id]);
    }
    
    /**
     * Permet de retrouver un enregistrement grâce à son identifiant
     *
     * @param integer $id
     * @return array|bool|null
     */
    public function findProduct(int $id)
    {
        // Retrouver l'article et le retourner
        $query = $this->db->prepare("
            SELECT $this->table.*, ".T_BRANDS.".Name AS Brand_Name,Logo 
                FROM $this->table 
                INNER JOIN ".T_BRANDS." 
                ON $this->table.Brand_Id = ".T_BRANDS.".Id
                WHERE $this->table.Id = :id");
        $query->execute([
            ':id' => $id,
        ]);

        return $query->fetch(\PDO::FETCH_ASSOC);
    }
}

?>