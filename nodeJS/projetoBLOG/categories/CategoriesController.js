const express = require("express");
const router = express.Router();
const CategoryModel = require("./CategoryModel");
const slugify = require("slugify");
router.get("/categories", (req, res) => {
  res.send("Categories Route");
});
router.post("/categories/save", (req, res) => {
  let title = req.body.title;
  if (title == undefined) res.redirect("/admin/categories/new");
  else {
    CategoryModel.create({
      title: title,
      slug: slugify(title),
    }).then(() => {
      res.redirect("/admin/categories");
    });
  }
});

router.get("/admin/categories", (req, res) => {
  CategoryModel.findAll().then((categories) => {
    res.render("admin/categories/index", { categories: categories });
  });
});
router.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/new");
});
router.post("/categories/delete", (req, res) => {
  let id = req.body.id;
  if (id == undefined) res.redirect("/admin/categories");
  else {
    if (isNaN(id)) res.redirect("/admin/categories");
    else {
      CategoryModel.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        res.redirect("/admin/categories");
      });
    }
  }
});
router.get("/admin/categories/edit/:id", (req, res) => {
  let id = req.params.id;
  if (isNaN(id)) res.redirect("/admin/categories");
  CategoryModel.findByPk(id)
    .then((category) => {
      if (category == undefined) res.redirect("/admin/categories");
      else {
        res.render("admin/categories/edit", { category: category });
      }
    })
    .catch((error) => {
      res.redirect("/admin/categories");
    });
});
router.post("/categories/update", (req, res) => {
  let id = req.body.id;
  let title = req.body.title;
  CategoryModel.update(
    { title: title, slug: slugify(title) },
    {
      where: {
        id: id,
      },
    }
  ).then(() => {
    res.redirect("/admin/categories");
  });
});

module.exports = router;
