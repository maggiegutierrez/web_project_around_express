const router = require("express").Router();
const fs = require("fs");
const path = require("path");

router.get("/", (req, res) => {
  fs.readFile(
    path.join(__dirname, "../data/users.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Fallo en cargar los datos de usuario" });
      } else {
        const users = JSON.parse(data);
        res.json(users);
      }
    },
  );
});

router.get("/:id", (req, res) => {
  fs.readFile(
    path.join(__dirname, "../data/users.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Fallo en cargar los datos de usuario" });
      } else {
        const users = JSON.parse(data);
        const user = users.find((user) => user._id === req.params.id);
        if (user) {
          return res.json(user);
        }
        res.status(404).json({ message: "ID de usuario no encontrado" });
      }
    },
  );
});

module.exports = router;
