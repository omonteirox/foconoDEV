const express = require("express");
const router = express.Router();
const CategoryModel = require("../categories/CategoryModel");
const ArticleModel = require("./ArticlesModel");
const slugify = require("slugify");
router.get("/admin/articles", (req, res) => {
  ArticleModel.findAll({
    include: [{ model: CategoryModel }],
  }).then((articles) => {
    res.render("admin/articles/index", { articles: articles });
  });
});
router.get("/admin/articles/new", (req, res) => {
  CategoryModel.findAll().then((categories) => {
    res.render("admin/articles/new", { categories: categories });
  });
});
router.post("/articles/save", (req, res) => {
  let title = req.body.title;
  let body = req.body.body;
  let categoryId = req.body.category;
  ArticleModel.create({
    title: title,
    slug: slugify(title),
    body: body,
    categoryId: categoryId,
  }).then(() => {
    res.redirect("/admin/articles");
  });
});
router.post("/articles/delete", (req, res) => {
  let id = req.body.id;
  if (id == undefined) res.redirect("/admin/articles");
  else {
    if (isNaN(id)) res.redirect("/admin/articles");
    else {
      ArticleModel.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        res.redirect("/admin/articles");
      });
    }
  }
});

router.get("/admin/articles/edit/:id", (req, res) => {
  let id = req.params.id;
  ArticleModel.findByPk(id)
    .then((article) => {
      if (article == undefined) res.redirect("admin/articles");
      else {
        CategoryModel.findAll().then((categories) => {
          res.render("admin/articles/edit", {
            article: article,
            categories: categories,
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/admin/articles");
    });
});
router.post("/articles/update", (req, res) => {
  let id = req.body.id;
  let title = req.body.title;
  let body = req.body.body;
  let categoryId = req.body.category;
  ArticleModel.update(
    { title: title, slug: slugify(title), body: body, categoryId: categoryId },
    { where: { id: id } }
  ).then(() => {
    res.redirect("/admin/articles");
  });
});
router.get("/articles/page/:num", (req, res) => {
  let page = req.params.num;
  let offset = 0;
  let limit = 2;
  if (isNaN(page) || page == 1) offset = 0;
  else {
    offset = parseInt(page) * limit;
  }
  ArticleModel.findAndCountAll({
    limit: limit,
    offset: offset,
  }).then((articles) => {
    let next;
    if (offset + limit >= articles.count) next = false;
    else {
      next = true;
    }
    let result = {
      next: next,
      articles: articles,
    };
    CategoryModel.findAll().then((categories) => {
      res.render("admin/articles/page", {
        result: result,
        categories: categories,
      });
    });
  });
});
module.exports = router;
