const db = require('../config/db');

const PDF = db.sequelize.define('pdfs', {
    aluno: {
        type: db.Sequelize.STRING
    },
    curso: {
        type: db.Sequelize.STRING
    },
    link: {
        type: db.Sequelize.STRING
    }
});

module.exports = PDF;