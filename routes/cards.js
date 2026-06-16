const router = require("express").Router();
const fs = require("fs");
const path = require("path");

router.get("/", (req, res) => {
  fs.readFile(
    path.join(__dirname, "../data/cards.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Fallo en cargar las tarjetas" });
      } else {
        const cards = JSON.parse(data);
        cards
          .find({ title: "nonexistant card" })
          .orFail(() => {
            const error = new Error(
              "No se ha encontrado ninguna tarjeta con esa id",
            );
            error.statusCode = 404;
            throw error; // Recuerda arrojar un error para que .catch lo maneje en lugar de .then
          }) // arroja un DocumentNotFoundError
          .then((cardData) => {
            res.send(cardData); // omitido porque se arrojó un error
          })
          .catch((error) => {
            // este sí se ejecuta ahora, así que podemos manejar el error y devolver un mensaje adecuado
          });
        res.json(cards);
      }
    },
  );
});

module.exports = router;
