const router = require("express").Router();
const card = require("../models/card");
const { getCards, postCards } = require("../controllers/cards");

router.get("/", getCards);
router.post("/", postCards);
module.exports = router;
