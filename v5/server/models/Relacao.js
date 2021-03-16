const Aluno = require('./Aluno');
const Curso = require('./Curso');
const db = require('../config/db');

const Relacao = db.sequelize.define('relacoes', {
    alunoId: {
        type: db.Sequelize.INTEGER(11)
    },
    cursoId: {
        type: db.Sequelize.INTEGER(11)
    }
});

Relacao.belongsTo(Aluno);
Relacao.belongsTo(Curso);

module.exports = Relacao;