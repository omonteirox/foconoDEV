const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8080;
const connection = require("./database/db");
const Question = require("./database/models/Questions");
const Answer = require("./database/models/Answer");
// conectando com o banco
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs"); // falando que a view engine é o EJS
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// rotas
app.get("/", (req, res) => {
  Question.findAll({
    raw: true,
    order: [
      ["id", "DESC"], // ASC -> ascendente; DESC -> Decrescente
    ],
  }).then((questions) => {
    // RAW true traz somente o bruto
    res.render("index", {
      questions: questions,
    });
  });
});
app.get("/question", (req, res) => {
  res.render("question");
});
app.get("/question/:id", (req, res) => {
  let id = req.params.id;
  Question.findOne({ where: { id: id } }).then((question) => {
    if (question == undefined) res.redirect("/");
    else {
      Answer.findAll({
        order: [["id", "DESC"]],
        where: { questionID: question.id },
      }).then((answers) => {
        res.render("fullQuestion", {
          question: question,
          answers: answers,
        });
      });
    }
  });
  // res.render("expanded");
});
app.post("/saveQuestions", (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  Question.create({
    title: title,
    description: description,
  }).then(() => {
    console.log("Salvo com sucesso");
    res.redirect("/");
  });
});
app.post("/answer", (req, res) => {
  let body = req.body.body;
  let questionID = req.body.question;
  Answer.create({
    body: body,
    questionID: questionID,
  }).then(() => {
    res.redirect(`/question/${questionID}`);
  });
});
app.listen(PORT, () => {
  console.log(`Running at localhost:${PORT}`);
});
