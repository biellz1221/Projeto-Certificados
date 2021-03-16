// Configs
    // Express
    const express = require('express');
    const app = express();

    // Multer
    const multer  = require('multer');
    const multerConfig = require('./config/multer');

    // Handlebars
    const handlebars = require('express-handlebars');

    // HTML to PDF
    const html_to_pdf = require('html-pdf-node');
    let html_options = { format: 'A4' };
    app.use('/uploads', express.static('uploads'));

    // Template Engine
    app.engine('handlebars', handlebars({
        defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        }
    }));
    app.set('view engine', 'handlebars');

    // Body Parser
    const bodyParser = require("body-parser");
    const { sequelize, Sequelize } = require('./config/db');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Models
    const Aluno = require('./models/Aluno');
    const Curso = require('./models/Curso');
    const Relacao = require('./models/Relacao');
    const PDF = require('./models/PDF');
// End Configs

// Rotas
    // Página Principal
    app.get('/', function(req, res) {
        Promise.all([Aluno.findAll(), Curso.findAll(), Relacao.findAll({
            include: [
                { model: Aluno, otherKey: 'alunoid' },
                { model: Curso, otherKey: 'cursoid' }
            ]
        })]).then(function(data) {
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
            res.redirect('/#Alunos');
        }).catch(function() {
            res.send("Erro ao Cadastrar Aluno: " + erro);
        });
    });

    // Excluir Aluno
    app.get('/excluir_aluno/:id', function(req, res) {
        Aluno.destroy({ where: {
            'id': req.params.id
        }}).then(function() {
            res.redirect('/#Alunos');
        }).catch(function() {
            res.send("Erro ao Excluir Aluno: " + erro);
        });
    });

    // Adicionar Curso
    app.post('/cadastra_curso', multer(multerConfig).single('cursos_curso_imagem'), function(req, res) {
        Curso.create({
            nome: req.body.cursos_curso_nome,
            imagem: req.file.filename
        }).then(function() {
            res.redirect('/#Cursos');
        }).catch(function() {
            res.send("Erro ao Cadastrar Curso: " + erro);
        });
    });

    // Excluir Curso
    app.get('/excluir_curso/:id', function(req, res) {
        Curso.destroy({ where: {
            'id': req.params.id
        }}).then(function() {
            res.redirect('/#Cursos');
        }).catch(function() {
            res.send("Erro ao Excluir Curso: " + erro);
        });
    });

    // Adicionar Relação
    app.post('/cadastra_relacao', function(req, res) {
        Relacao.create({
            alunoId: req.body.relacoes_aluno_id,
            cursoId: req.body.relacoes_curso_id
        }).then(function() {
            res.redirect('/#Relacoes');
        }).catch(function() {
            res.send("Erro ao Cadastrar Relação: " + erro);
        });
    });

    // Excluir Relação
    app.get('/excluir_relacao/:id', function(req, res) {
        Relacao.destroy({ where: {
            'id': req.params.id
        }}).then(function() {
            res.redirect('/#Relacoes');
        }).catch(function() {
            res.send("Erro ao Excluir Relação: " + erro);
        });
    });

    // Gerar PDF do Certificado
    app.get('/gerar_pdf/:aluno/:curso', function(req, res) {
        
        PDF.findOne({
            where: { aluno: req.params.aluno, curso: req.params.curso }
        }).then(function(item) {
            // Envia o Link do PDF
            res.redirect(item.link);
        }).catch(function() {
            sequelize.query("SELECT r.id, a.nome AS alunoNome, c.nome AS cursoNome, c.imagem AS cursoImagem FROM alunos a JOIN relacoes r ON a.id = r.alunoId JOIN cursos c ON r.cursoId = c.id WHERE a.nome = '" + req.params.aluno + "' AND c.nome = '" + req.params.curso + "';")
            .then(function([item = []]) {
                // Cria o PDF
                var nome_do_aluno = item[0].alunoNome;
                var nome_do_curso = item[0].cursoNome;
                var imagem_do_curso = item[0].cursoImagem;
                var link_do_pdf = "/pdfs/" + nome_do_curso.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '-').toLowerCase() + "-" + nome_do_aluno.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '-').toLowerCase() + ".pdf";
                
                handlebars.render("pdf", {
                    nome_do_aluno: nome_do_aluno,
                    nome_do_curso: nome_do_curso,
                    imagem_do_curso: imagem_do_curso
                }, function(err, html) {
                    if (err) {
                        console.log(err);
                    } else {
                        html_to_pdf.create(html, { landscape: true }).toFile(link_do_pdf, function(err, res){ });
                    }
                });
                
                // Registra no Banco de Dados de PDFs
                PDF.create({
                    aluno: nome_do_aluno,
                    curso: nome_do_curso,
                    link: link_do_pdf
                }).then(function() {
                    // Envia o Link do PDF
                    res.redirect('/#Relacoes');
                }).catch(function() {
                    res.send("Erro ao Cadastrar Relação: " + erro);
                });
            }).catch(function(){
                console.log("Registro não encontrado!");
            });
        });
    });
// End Rotas

app.listen(8081, function(){
    console.log("Servidor rodando em: http://localhost:8081");
});