<?php

class Database {

    // DB Credentials
    private $host = "localhost";
    private $db_name = "DB_NAME";
    private $username = "root";
    private $password = "";
    public $conn;

    // DB Connection
    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        } catch (PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}

?>
