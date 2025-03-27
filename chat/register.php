<?php
session_start();
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    if (!empty($username) && !empty($_POST['password'])) {
        $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        if ($stmt->execute([$username, $password])) {
            header("Location: index.php");
            exit;
        } else {
            $error = "Benutzername bereits vergeben.";
        }
    } else {
        $error = "Bitte alle Felder ausfüllen.";
    }
}
?>

<form method="post">
    <h2>Registrieren</h2>
    <?php if (isset($error)) echo "<p style='color:red;'>$error</p>"; ?>
    <input type="text" name="username" placeholder="Benutzername" required><br>
    <input type="password" name="password" placeholder="Passwort" required><br>
    <button type="submit">Registrieren</button>
    <p><a href="index.php">Bereits registriert? Login</a></p>
</form>
