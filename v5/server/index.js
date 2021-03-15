const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const Aluno = require('./models/Aluno');
const Curso = require('./models/Curso');
const Relacao = require('./models/Relacao');

// Configs
    // Template Engine
    app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');

    // Body Parser
    const bodyParser = require("body-parser");
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
// End Configs

// Rotas
    // Página Principal
    app.get('/', function(req, res) {
        Promise.all([Aluno.findAll(), Curso.findAll(), Relacao.findAll()])
        .then((data) => {
            res.render('index', {
                alunos: data[0],
                cursos: data[1],
                relacoes: data[2]
            });
        });
    });

    // Adicionar Aluno
    app.post('/cadastra_aluno', function(req, res) {
        Aluno.create({
            nome: req.body.alunos_aluno_nome
        }).then(function() {
            res.redirect('/');
        }).catch(function() {
            res.send("Erro ao Cadastrar Aluno: " + erro);
        });
    });

    // Excluir Aluno
    app.get('/excluir_aluno/:id', function(req, res) {
        Aluno.destroy({ where: {
            'id': req.params.id
        }}).then(function() {
            res.redirect('/');
        }).catch(function() {
            res.send("Erro ao Excluir Aluno: " + erro);
        });
    });

    // Adicionar Curso
    app.post('/cadastra_curso', function(req, res) {
        Curso.create({
            nome: req.body.cursos_curso_nome,
            imagem: req.body.cursos_curso_imagem
        }).then(function() {
            res.redirect('/');
        }).catch(function() {
            res.send("Erro ao Cadastrar Curso: " + erro);
        });
    });

    // Excluir Curso
    app.get('/excluir_curso/:id', function(req, res) {
        Curso.destroy({ where: {
            'id': req.params.id
        }}).then(function() {
            res.redirect('/');
        }).catch(function() {
            res.send("Erro ao Excluir Curso: " + erro);
        });
    });

    // Adicionar Relação
    app.post('/cadastra_relacao', function(req, res) {
        Relacao.create({
            idaluno: req.body.relacoes_aluno_id,
            idcurso: req.body.relacoes_curso_id
        }).then(function() {
            res.redirect('/');
        }).catch(function() {
            res.send("Erro ao Cadastrar Relação: " + erro);
        });
    });

    // Excluir Relação
    app.get('/excluir_relacao/:id', function(req, res) {
        Relacao.destroy({ where: {
            'id': req.params.id
        }}).then(function() {
            res.redirect('/');
        }).catch(function() {
            res.send("Erro ao Excluir Relação: " + erro);
        });
    });
// End Rotas

app.listen(8081, function(){
    console.log("Servidor rodando em: http://localhost:8081");
});