<?php

class Book implements JsonSerializable {

    
    public static function getAllBooks(mysqli $conn) {
        $returning = [];
        $sql = "SELECT * FROM Books";
        $result = $conn->query($sql);
        if ($result !== false) {
            foreach ($result as $row) {
                $book = new Book();
                $book->id = $row['id'];
                $book->name = $row['name'];
                $book->description = $row['description'];
                $book->author = $row['author'];
                $returning[] = $book;
            }
        }
        return $returning;
    }

    public function jsonSerialize() {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "author" => $this->author
        ];
    }

    private $id;
    private $name;
    private $description;
    private $author;

    public function __construct() {
        $this->id = -1;
        $this->name = "";
        $this->description = "";
        $this->author = "";
    }

    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function getAuthor() {
        return $this->author;
    }

    public function setAuthor($author) {
        $this->author = $author;
    }

    public function loadFromDB(mysqli $conn, $id) {
        $sql = "SELECT * FROM Books WHERE id = $id";
        $result = $conn->query($sql);
        if ($result !== false && $result->num_rows === 1) {
            $row = $result->fetch_assoc();
            $this->id = $row['id'];
            $this->name = $row['name'];
            $this->description = $row['description'];
            $this->author = $row['author'];
            return true;
        }
        return false;
    }

    public function saveToDB(mysqli $conn) {
        if ($this->id === -1) {
            $sql = "INSERT INTO Books(name, description, author) VALUES ('{$this->name}', '{$this->description}', '{$this->author}')";
            $result = $conn->query($sql);
            if ($result === true) {
                $this->id = $conn->insert_id;
                return true;
            }
        } else {
            $sql = "UPDATE Books SET name='{$this->name}', description = '{$this->description}', author='{$this->author}' WHERE id='{$this->id}'";
            $result = $conn->query($sql);
            if ($result === true) {
                return true;
            }
        }
        return false;
    }

}
