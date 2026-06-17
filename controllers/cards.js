const Card = require("../models/card");

function getCards(req, res) {
  Card.find()
    .then((card) => {
      res.json(card);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Fallo en cargar las tarjetas" });
    });
}

function postCards(req, res) {
  const newCard = {
    name: req.body.name,
    link: req.body.link,
  };
  cards
    .create(newCard)
    .then((createdCard) => {
      res.status(201).json(createdCard);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Fallo en crear la tarjeta" });
    });
}

module.exports = { getCards, postCards };
