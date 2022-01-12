const Sequelize = require("sequelize");
const connection = require("../db");

const Question = connection.define("questions", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Question.sync({ force: false }).then(() => {
  // O force false não recrie a tabela
  console.log("Tabela questions criada");
});
module.exports = Question;
