
module.exports = (sequelize, Sequelize) => {
  const tbAluno = sequelize.define("tbaluno", {
    id: {
      type: Sequelize.INT
    },
    nome: {
      type: Sequelize.STRING
    }
  });

  return tbAluno;
};
