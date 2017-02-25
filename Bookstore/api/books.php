<?php

require_once './src/Book.php';
require_once './src/connection.php';
if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $newBook = new Book();
    $newBook->setAuthor($_POST['author']);
    $newBook->setDescription($_POST['description']);
    $newBook->setName($_POST['name']);
    echo $newBook->saveToDB($conn);
}
if ($_SERVER['REQUEST_METHOD'] === "GET") {
    if (isset($_GET['id'])) {
        $book = new Book();
        $book->loadFromDB($conn, $_GET['id']);
        echo json_encode($book);
    } else {
        $allBooks = Book::GetAllBooks($conn);
        echo json_encode($allBooks);
    }
}
if ($_SERVER['REQUEST_METHOD'] === "PUT") {
    parse_str(file_get_contents("php://input"), $put_vars);
    var_dump($put_vars);
    $bookToUpdate = new Book();
    $bookToUpdate->loadFromDB($conn, $put_vars['id']);
    $bookToUpdate->setName($put_vars['name']);
    $bookToUpdate->setDescription($put_vars['description']);
    $bookToUpdate->setAuthor($put_vars['author']);
    $bookToUpdate->saveToDB($conn);
}
if ($_SERVER['REQUEST_METHOD'] === "DELETE") {
    parse_str(file_get_contents("php://input"), $id);
    $sql = "DELETE FROM Books WHERE id={$id['id']}";
    $result = $conn->query($sql);
}

