const db = require('./db');

const Relacao = db.sequelize.define('relacoes', {
    idaluno: {
        type: db.Sequelize.INTEGER(11)
    },
    idcurso: {
        type: db.Sequelize.INTEGER(11)
    }
});

module.exports = Relacao;