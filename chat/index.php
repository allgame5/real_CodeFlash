<?php
session_start();
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($_POST['password'], $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        header("Location: home.php");
        exit();
    } else {
        echo "Login fehlgeschlagen!";
    }
}
?>

<form method="post">
    Benutzername: <input type="text" name="username"><br>
    Passwort: <input type="password" name="password"><br>
    <button type="submit">Login</button>
</form>
<a href="register.php">Neuen Account erstellen</a>
