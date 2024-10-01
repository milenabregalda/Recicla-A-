<?php
require('scripts.php'); // Inclui a função de conexão

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $confirmarSenha = $_POST['confirmarSenha'];

    // Verificar se a senha e a confirmação são diferentes
    if ($senha !== $confirmarSenha) {
        echo "<script>alert('As senhas não coincidem. Tente novamente.');
            window.location.href = '../_public/index.html';
            </script>";
    } else {
        // Conectar ao banco de dados
        $con = getConexaoBancoMySQL();

        // Verificar se o e-mail já existe
        $stmt = $con->prepare("SELECT * FROM usuarios WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            echo "<script>alert('E-mail já cadastrado! Tente novamente com outro.');
                window.location.href = '../_public/index.html';
                </script>";
        } else {
            // Inserir o novo usuário no banco
            $senhaHash = password_hash($senha, PASSWORD_BCRYPT);
            $stmt = $con->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $nome, $email, $senhaHash);
            if ($stmt->execute()) {
                echo "<script>
                        alert('Cadastro feito com sucesso! Entre na sua conta.');
                        window.location.href = '../_public/entrar.html';
                    </script>"; // Redirecionamento feito com JavaScript ao invés de header do php para o alert funcionar

            } else {
                echo "<script>alert('Erro ao cadastrar usuário!');
                    window.location.href = '../_public/index.html';
                    </script>";
            }
        }
        $stmt->close();
        $con->close();
    }
}
