const router = require("express").Router();
const {
  getUsers,
  getUserId,
  postUser,
  patchAvatar,
  patchUser,
} = require("../controllers/users");

router.get("/", getUsers);

router.get("/:userId", getUserId);

router.post("/", postUser);

router.patch("/me", patchUser);

router.patch("/me/avatar", patchAvatar);

module.exports = router;
