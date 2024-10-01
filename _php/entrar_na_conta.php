<?php
require('scripts.php'); // Inclui a função de conexão

session_start(); // Inicia a sessão

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // Conectar ao banco de dados
    $con = getConexaoBancoMySQL();

    // Verificar se o e-mail existe
    $stmt = $con->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $usuario = $resultado->fetch_assoc();

        // Verificar se a senha está correta
        if (password_verify($senha, $usuario['senha'])) {
            // Armazenar informações do usuário na sessão
            $_SESSION['usuario_id'] = $usuario['id']; // Salva campo 'id' do usuário como 'id' da sessão
            header("Location: ../_public/sessao.php");
            // Redireciona para a página da sessão (aqui, por não usar alert, deixei location do php)
            exit(); // Encerra o script após o redirecionamento
        } else {
            echo "<script>
                alert('E-mail ou senha inválido. Tente novamente ou cadastre-se.');
                window.location.href = '../_public/entrar.html';
                </script>";
        }
    } else {
        echo "<script>
                alert('E-mail ou senha inválido. Tente novamente ou cadastre-se.');
                window.location.href = '../_public/entrar.html';
                </script>";
    }

    $stmt->close();
    $con->close();
}
