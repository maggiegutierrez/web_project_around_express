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
            throw error;
          })
          .then((cardData) => {
            res.send(cardData);
          })
          .catch((error) => {});
        res.json(cards);
      }
    },
  );
});

module.exports = router;
