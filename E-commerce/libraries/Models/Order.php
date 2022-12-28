<?php

namespace Models;

class Order extends Model
{
    //pour utiliser Model, on doit définir une propriété protected $table
    //qui contient le nom de la table principale
    protected $table = T_ORDERS;
    
    /**
     * insert un détail de commande
     *
     * 
     */
    public function insertDetail(array $data): int
    {
        $sql = "INSERT INTO ".T_O_DETAILS." SET ";

        $columns = array_keys($data);
        $sqlColumns = [];

        foreach ($columns as $column) {
            $sqlColumns[] = "$column = :$column";
        }

        $sql .= implode(",", $sqlColumns);

        $query = $this->db->prepare($sql);

        $query->execute($data);

        return $this->db->lastInsertId();
    }
    
    /**
     * renvoie la liste des détails d'une commande
     *
     * 
     */
    public function getDetails(int $id): array
    {
        $query = $this->db->prepare("
            SELECT ".T_PROD.".Name, MSRP, Eco_tax, Quantity, 
            (MSRP * Quantity) AS Total, (Eco_tax * Quantity) AS Total_eco
                FROM ".T_O_DETAILS." 
                INNER JOIN ".T_PROD." 
                ON ".T_PROD.".Id = ".T_O_DETAILS.".Product_Id 
                WHERE Order_Id =:id");
        
        $query->execute([
            ":id" => $id]);
        

        return $query->fetchAll(\PDO::FETCH_ASSOC);
    }
    
    /**
     * mise à jour d'une commande pour date de paiement
     *
     * 
     */
    public function updateOrder(int $id)
    {
        $sql = "UPDATE $this->table SET Status = 2, Paiement_at = NOW() WHERE Id= :Id AND User_Id= :User";
        
        $query = $this->db->prepare($sql);

        $query->execute([
            ':Id'=> $id,
            ':User' => \Session::getId()
            ]);
    }
    
    /**
     * Permet de récupérer la liste des commandes
     *
     * @return array
     */
    public function findAllOrder(): array
    {
        // Retourner tous les articles
        
        $query = $this->db->prepare("
        SELECT $this->table.Id, LastName, FirstName, $this->table.Created_at, Paiement_at, Shipping_at, Status 
        FROM $this->table 
        INNER JOIN ".T_USERS." 
        ON ".T_USERS.".Id = $this->table.User_Id");
        
        $query->execute();
        

        return $query->fetchAll(\PDO::FETCH_ASSOC);
    }
}

?>