const db = require('./db');

const Curso = db.sequelize.define('cursos', {
    nome: {
        type: db.Sequelize.STRING
    },
    imagem: {
        type: db.Sequelize.BLOB
    }
});

module.exports = Curso;