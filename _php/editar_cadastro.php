<?php
require_once('../_php/dados_sessao.php'); // Inclui a função de conexão

// Inicia a sessão se ela ainda não existe
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Conectar ao banco de dados
$con = getConexaoBancoMySQL();

// Atualizar dados se o formulário for enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha']; // Poderia fazer hash da senha antes de salvar
}

// Atualiza usuário se o botão Atualizar for clicado
if (isset($_POST['atualizar'])) {
    $stmt = $con->prepare("UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?");

    // Armazena o hash da senha em uma variável para não dar problema de notice:
    $senhaHash = password_hash($senha, PASSWORD_BCRYPT);

    $stmt->bind_param("sssi", $nome, $email, $senhaHash, $_SESSION['usuario_id']);

    if ($stmt->execute()) {
        echo "<script>alert('Dados atualizados com sucesso!');
        window.location.href = '../_public/sessao.php';
        </script>";
    } else {
        echo "<script>alert('Erro ao atualizar dados.');
        window.location.href = '../_public/sessao.php';
        </script>";
    }
    $stmt->close();
}


// Excluir usuário se o botão Excluir for clicado
if (isset($_POST['excluir'])) {
    $stmt = $con->prepare("DELETE FROM usuarios WHERE id = ?");
    $stmt->bind_param("i", $_SESSION['usuario_id']);
    if ($stmt->execute()) {
        session_destroy(); // Sai da sessão
        echo "<script>
                alert('Usuário excluído com sucesso. Entre com outro usuário ou cadastre-se novamente.');
                window.location.href = '../_public/entrar.html';
                </script>";
        exit();
    } else {
        echo "<script>alert('Erro ao excluir usuário.');
        window.location.href = '../_public/sessao.php';
        </script>";
    }
    $stmt->close();
}

// Código para sair da sessão ao clicar em "Sair da Conta"
if (isset($_POST['sairDaConta'])) {
    session_destroy(); // Sai da sessão
    echo "<script>
            alert('Você saiu da conta.');
            window.location.href = '../_public/entrar.html'; // Redireciona para a página de login
          </script>";
    exit();
}

$con->close();
