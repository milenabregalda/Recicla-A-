<?php
require('scripts.php'); // Inclui a função de conexão com o banco

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $novaSenha = $_POST['senha'];
    $confirmarSenha = $_POST['confirmarSenha'];

    // Verificar se as senhas coincidem
    if ($novaSenha !== $confirmarSenha) {
        echo "<script>alert('As senhas não coincidem! Tente novamente.');
            window.location.href = '../_public/trocar-senha.html';
            </script>";
    } else {
        // Conectar ao banco de dados
        $con = getConexaoBancoMySQL();

        // Verificar se o e-mail existe no banco de dados
        $stmt = $con->prepare("SELECT * FROM usuarios WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows == 0) {
            // E-mail não existe
            echo "<script>
                alert('E-mail não encontrado! Tente novamente.');
                window.location.href = '../_public/trocar-senha.html';
                </script>";
        } else {
            // Atualizar a senha
            $senhaHash = password_hash($novaSenha, PASSWORD_BCRYPT);
            $stmt = $con->prepare("UPDATE usuarios SET senha = ? WHERE email = ?");
            $stmt->bind_param("ss", $senhaHash, $email);

            if ($stmt->execute()) {
                echo "<script>
                        alert('Senha atualizada com sucesso! Entre na sua conta.');
                        window.location.href = '../_public/entrar.html';
                    </script>";
            } else {
                echo "<script>alert('Erro ao atualizar a senha! Tente novamente.');
                    window.location.href = '../_public/trocar-senha.html';
                    </script>";
            }
        }
        $stmt->close();
        $con->close();
    }
}
