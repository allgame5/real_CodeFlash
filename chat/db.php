<?php
$host = "localhost";
$user = "root"; // passe das an deinen MySQL-User an
$pass = "";     // passe das an dein Passwort an
$dbname = "micro_social";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("DB-Verbindung fehlgeschlagen: " . $e->getMessage());
}
?>
