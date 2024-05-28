<?php
// storeUserData.php

// Inclua o arquivo de conexão
include 'conexao.php';

// Verifica se a solicitação é do tipo POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Obtém os dados do usuário do corpo da solicitação
    $userData = json_decode(file_get_contents("php://input"), true);

    // Verifica se os dados do usuário foram recebidos corretamente
    if ($userData) {
        // Aqui você pode manipular os dados do usuário como desejar
        // Por exemplo, salvar no banco de dados, enviar por e-mail, etc.

        // Retorna uma resposta para o JavaScript informando que os dados foram recebidos
        echo "Dados do usuário recebidos com sucesso!";
    } else {
        // Retorna um erro se os dados do usuário não foram recebidos corretamente
        http_response_code(400);
        echo "Erro ao receber dados do usuário!";
    }
} else {
    // Retorna um erro se a solicitação não for do tipo POST
    http_response_code(405);
    echo "Método não permitido!";
}
?>
