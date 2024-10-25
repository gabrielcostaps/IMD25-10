const express = require("express");
const app = express();
const produtoRota = require("./rotas/produtos");
const db = require("./models");

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

app.use(express.json());
app.use('/static', express.static('public'));
app.use("/produto", produtoRota);

app.get("/", (req, res) => {
  res.json({ msg: "Hello from Express!" });
});

db.sequelize.sync()
  .then(() => {
    app.listen(8080, () => {
      console.log("Servidor pronto na porta 8080");
      console.log(`Conectado ao banco de dados: ${config.database}`);
    });
  })
  .catch(err => {
    console.error("Erro ao sincronizar o banco de dados:", err);
  });
