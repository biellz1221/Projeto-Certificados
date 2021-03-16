const db = require('../config/db');

const Curso = db.sequelize.define('cursos', {
    nome: {
        type: db.Sequelize.STRING
    },
    imagem: {
        type: db.Sequelize.STRING
    }
});

module.exports = Curso;