<?php
session_start();
require 'db.php';

if (!isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit;
}

// Posting
if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST['content'])) {
    $stmt = $pdo->prepare("INSERT INTO posts (user_id, content) VALUES (?, ?)");
    $stmt->execute([$_SESSION['user_id'], htmlspecialchars($_POST['content'])]);
}

// Beiträge laden
$posts = $pdo->query("SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC")->fetchAll();
?>

<h2>Willkommen, <?php echo htmlspecialchars($_SESSION['username']); ?>!</h2>
<a href="logout.php">Logout</a>

<form method="post">
    <textarea name="content" placeholder="Was möchtest du teilen?" required></textarea><br>
    <button type="submit">Posten</button>
</form>

<h3>Beiträge</h3>
<?php foreach ($posts as $post): ?>
    <div style="border:1px solid #ccc; padding:10px; margin:5px;">
        <strong><?php echo htmlspecialchars($post['username']); ?></strong> schrieb:<br>
        <?php echo nl2br(htmlspecialchars($post['content'])); ?><br>
        <small><?php echo $post['created_at']; ?></small>
    </div>
<?php endforeach; ?>
