const express = require("express");
const app = express();
const handlebars = require("express-handlebars");

// Configs
    // Template Engine
    app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');

    // Conexão com o Banco de dados
    const Sequelize = require('sequelize');
    const sequelize = new Sequelize('dbcertificados', 'root', '12345', { host: "localhost", dialect: 'mysql' });
// End Configs

// Rotas
    // Página Principal
    app.get('/', function(req, res) {
        res.render('index');
    });
// End Rotas

app.listen(8081, function(){
    console.log("Servidor rodando em: http://localhost:8081");
});