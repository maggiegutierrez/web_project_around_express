const User = require("../models/user");
const mongoose = require("mongoose");

const getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Fallo en cargar los datos de usuario" });
    });
};

const getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "ID de usuario no encontrado" });
      }
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Fallo en cargar los datos de usuario" });
    });
};

const postUser = (req, res) => {
  User.create({
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  })
    .then((createdUser) => {
      res.status(201).json(createdUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Fallo en crear el usuario" });
    });
};

module.exports = { getUsers, getUserId, postUser };
