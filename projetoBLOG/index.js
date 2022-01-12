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
    .findAll({
      order: [["id", "DESC"]],
      include: [{ model: categoriesModel }],
    })
    .then((articles) => {
      categoriesModel.findAll().then((categories) => {
        res.render("index", { articles: articles, categories: categories });
      });
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
        categoriesModel.findAll().then((categories) => {
          res.render("article", { article: article, categories: categories });
        });
      }
    })
    .catch((error) => {
      res.redirect("/");
    });
});
app.get("/category/:slug", (req, res) => {
  let slug = req.params.slug;
  categoriesModel
    .findOne({
      where: {
        slug: slug,
      },
      include: [{ model: articlesModel }]
    })
    .then((category) => {
      let teste = false
      if (category == undefined) res.redirect("/");
      else {
        categoriesModel.findAll().then(categories => {
          res.render("index", {
            articles: category.articles,
            categories: categories,
          });
        });
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});
app.listen(PORT, () => {
  console.log(`runing at ${PORT}`);
});
