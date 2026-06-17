const router = require("express").Router();
const card = require("../models/card");
const {
  getCards,
  postCards,
  deleteCard,
  putCardLike,
  deleteCardLike,
} = require("../controllers/cards");

router.get("/", getCards);
router.post("/", postCards);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/likes", putCardLike);
router.delete("/:cardId/likes", deleteCardLike);
module.exports = router;
