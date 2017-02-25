<?php

$host = "localhost";
$dbUser = 'root';
$dbPassword = 'coderslab';
$dbName = 'Bookstore';
$conn = new mysqli($host, $dbUser, $dbPassword, $dbName);

if($conn->errno) {
    die("Cannot connect to DB");
}

