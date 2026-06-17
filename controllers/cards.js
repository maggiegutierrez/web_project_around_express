const Card = require("../models/card");

const getCards = async (req, res) => {
  try {
    const cards = await Card.find(req.params.cardId).orFail(() => {
      if ((req.params.cardId = null)) {
        return res.status(404).json({ message: "ID de tarjeta no encontrado" });
      }
      throw new Error("Tarjeta con id seleccionada no encontrada");
    });
    res.json(cards);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Fallo en cargar las tarjetas" });
  }
};

const postCards = async (req, res) => {
  try {
    console.log(req.user._id);
    const { name, link } = req.body;
    const userId = req.user._id;
    const newCard = {
      name,
      link,
      owner: userId,
    };
    const createdCard = await Card.create(newCard);
    res.status(201).json(createdCard);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Fallo en crear la tarjeta" });
  }
};

const deleteCard = async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.cardId);
    if (!deletedCard) {
      return res.status(404).json({ message: "ID de tarjeta no encontrado" });
    }
    res.json({ message: "Tarjeta eliminada exitosamente" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Fallo en eliminar la tarjeta" });
  }
};

const putCardLike = async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!updatedCard) {
      return res.status(404).json({ message: "ID de tarjeta no encontrado" });
    }
    res.json(updatedCard);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Fallo en actualizar el like de la tarjeta" });
  }
};

const deleteCardLike = async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!updatedCard) {
      return res.status(404).json({ message: "ID de tarjeta no encontrado" });
    }
    res.json(updatedCard);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Fallo en eliminar el like de la tarjeta" });
  }
};

module.exports = {
  getCards,
  postCards,
  deleteCard,
  putCardLike,
  deleteCardLike,
};
