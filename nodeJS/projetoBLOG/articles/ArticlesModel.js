const Sequelize = require("sequelize");
const connection = require("../database/db");
const CategoryModel = require("../categories/CategoryModel");
const Article = connection.define("articles", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});
CategoryModel.hasMany(Article); // hasMany = Entidade.TemMuitos(Entidade) - representa o relacionamento 1-n
Article.belongsTo(CategoryModel); // belongsTo = Pertence a (entidade) representa o relacionamento 1-1
// Article.sync({force:true}) // recria a tabela sempre
module.exports = Article;
