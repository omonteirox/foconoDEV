const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8080;
const connection = require("./database/db");
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
  res.render("index");
});
app.get("/question", (req, res) => {
  res.render("question");
});
app.post("/saveQuestions", (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  res.send(`Title: ${title}<br> Descrição: ${description}`);
});
app.listen(PORT, () => {
  console.log(`Running at localhost:${PORT}`);
});
