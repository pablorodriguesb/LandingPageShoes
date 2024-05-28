const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'pablocsstep',
    password: 'NE@1998xusprodfscs',
    database: 'pf10store'
});

// Conectar ao banco de dados MySQL
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL');
});

// Middleware para processar dados JSON
app.use(bodyParser.json());

// Rota para lidar com requisições POST de pedidos
app.post('/orders', (req, res) => {
    // Extrair os detalhes do pedido do corpo da requisição
    const { address, items } = req.body;

    // Montar a query SQL para inserir o pedido na tabela do banco de dados
    const sql = `INSERT INTO orders (address, items) VALUES ('${address}', '${JSON.stringify(items)}')`;

    // Executar a query SQL
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Erro ao inserir o pedido no banco de dados:', error);
            res.status(500).json({ error: 'Ocorreu um erro ao processar o pedido.' });
            return;
        }
        
        console.log('Pedido registrado com sucesso no banco de dados');
        res.status(201).json({ message: 'Pedido registrado com sucesso!' });
    });
});

// Rota para lidar com requisições GET de pedidos
app.get('/orders', (req, res) => {
    // Lógica para lidar com solicitações GET para /orders
    res.status(200).json({ message: 'Endpoint GET /orders funcionando corretamente' });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
