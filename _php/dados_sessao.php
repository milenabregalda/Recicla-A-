<?php
require_once('scripts.php'); // Inclui a função de conexão

// Inicia a sessão se ela ainda não existe
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Verificar se o usuário está logado
if (!isset($_SESSION['usuario_id'])) {
    header("Location: ../_public/entrar.html"); // Redireciona se não estiver logado
    exit();
}

// Conectar ao banco de dados para encontrar usuário
$con = getConexaoBancoMySQL();
$stmt = $con->prepare("SELECT * FROM usuarios WHERE id = ?");
$stmt->bind_param("i", $_SESSION['usuario_id']);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $usuario = $resultado->fetch_assoc();
    $nomeCompleto = $usuario['nome'];
    $emailUsuario = $usuario['email'];
} else {
    echo "<script>alert('Usuário não encontrado.');</script>";
}

$stmt->close();
$con->close();
