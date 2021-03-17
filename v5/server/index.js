// Configs
    // Express
    const express = require('express');
    var cors = require('cors');
    const app = express();
    app.use(cors());

    // Multer
    const multer  = require('multer');
    const multerConfig = require('./config/multer');

    // Handlebars
    const handlebars = require('express-handlebars');

    // HTML to PDF
    const html_to_pdf = require('html-pdf-node');
    const path = require('path');
    app.use('/uploads', express.static('uploads'));
    app.use('/pdfs', express.static('pdfs'));

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
        Promise.all([Aluno.findAll(), Curso.findAll(), PDF.findAll(), Relacao.findAll({
            include: [
                { model: Aluno, otherKey: 'alunoid' },
                { model: Curso, otherKey: 'cursoid' }
            ]
        })]).then(function(data) {
            res.render('index', {
                alunos: data[0],
                cursos: data[1],
                relacoes: data[3],
                pdfs: data[2]
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
        // Tenta encontrar se o registro ja foi feito anteriormente
        PDF.findOne({
            where: { aluno: req.params.aluno, curso: req.params.curso }
        }).then(function(item) {
            // Envia o Link do PDF
            res.redirect(item.link);
        }).catch(function() { // Se não consta nos registros de PDFs, tenta encontrar nas Relações Existentes.
            sequelize.query("SELECT r.id, a.nome AS alunoNome, c.nome AS cursoNome, c.imagem AS cursoImagem FROM alunos a JOIN relacoes r ON a.id = r.alunoId JOIN cursos c ON r.cursoId = c.id WHERE a.nome = '" + req.params.aluno + "' AND c.nome = '" + req.params.curso + "';")
            .then(function([item = []]) {
                // Variáveis para criar o PDF
                var nome_do_aluno = item[0].alunoNome;
                var nome_do_curso = item[0].cursoNome;
                var imagem_do_curso = item[0].cursoImagem;
                var caminho_imagem = "http://localhost:8081/uploads/" + imagem_do_curso;
                var nome_do_pdf = nome_do_curso.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '-').toLowerCase() + "-" + nome_do_aluno.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '-').toLowerCase() + ".pdf";
                var caminho_pdf = "http://localhost:8081/pdfs/" + nome_do_pdf;
                var file = { content: `
                <img src="${caminho_imagem}" style="display: block; position: fixed; top: 0; right: 0; width: 100%; height: 100%; z-index: 0;" />
                <div style="width: 100%; height: 100%; position: fixed; top: 0; left: 0; display: inline-table;">
                    <div style="vertical-align: middle; display: table-cell; text-align: center; text-transform: uppercase; font-family: monospace; font-weight: bold; font-size: 3em; color: #272727; text-shadow: 1px 1px 2px rgb(255 255 255 / 50%); padding: 0 1em; line-height: 1em;">
                        ${nome_do_aluno}
                    </div>
                </div>
                ` };

                // Cria o PDF
                html_to_pdf.generatePdf(file, {
                    format: 'A4',
                    landscape: true,
                    path: path.resolve(__dirname, "pdfs", nome_do_pdf)
                }).then(function(pdfBuffer) {
                    // Se conseguir gerar o arquivo, registra na tabela de PDFs gerados
                    PDF.create({
                        aluno: nome_do_aluno,
                        curso: nome_do_curso,
                        link: caminho_pdf
                    }).then(function() {
                        // Envia o Link do PDF
                        res.redirect(caminho_pdf);
                    }).catch(function() {
                        res.send("Erro ao Cadastrar Relação: " + erro);
                    });
                });
            }).catch(function(){
                // Se não constar na tabela de Relações
                console.log("Registro não encontrado!");
                res.redirect('http://localhost:8080/');
            });
        });
    });

    // Carrega Alunos via Json
    app.get('/carrega_alunos', function(req, res) {
        Aluno.findAll().then(function(item) {
            return res.json(item);
        });
    });

    // Carrega Cursos via Json
    app.get('/carrega_cursos', function(req, res) {
        Curso.findAll().then(function(item) {
            return res.json(item);
        });
    });

    // Carrega Relações via Json
    app.get('/carrega_relacoes', function(req, res) {
        Relacao.findAll({
            include: [
                { model: Aluno, otherKey: 'alunoid' },
                { model: Curso, otherKey: 'cursoid' }
            ]
        }).then(function(item) {
            return res.json(item);
        });
    });

    // Carrega PDFs já emitidos via Json
    app.get('/carrega_pdfs_emitidos', function(req, res) {
        PDF.findAll().then(function(item) {
            return res.json(item);
        });
    });
// End Rotas

// Executa o Servidor
app.listen(8081, function(){
    console.log("Servidor rodando em: http://localhost:8081");
});