const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8080;
// setando view engine
app.set("view engine", "ejs");
// setando bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//setando o uso estático
app.use(express.static("public"));
// sentando o banco de dados
const connection = require("./database/db");
// conectando no banco
connection
  .authenticate()
  .then(() => {
    console.log("Connection sucessful");
  })
  .catch((err) => {
    console.log(err);
  });
// importando controladores
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
// importando Models
const articlesModel = require("./articles/ArticlesModel");
const categoriesModel = require("./categories/CategoryModel");
// código
app.use("/", categoriesController);
app.use("/", articlesController);
app.get("/", (req, res) => {
  articlesModel
    .findAll({ include: [{ model: categoriesModel }] })
    .then((articles) => {
      res.render("index", { articles: articles });
    });
});
app.get("/:slug", (req, res) => {
  let slug = req.params.slug;
  articlesModel
    .findOne({
      where: {
        slug: slug,
      },
    })
    .then((article) => {
      if (article == undefined) res.redirect("/");
      else {
        res.render("article", { article: article });
      }
    })
    .catch((error) => {
      res.redirect("/");
    });
});
app.listen(PORT, () => {
  console.log(`runing at ${PORT}`);
});
