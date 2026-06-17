const User = require("../models/user");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Fallo en cargar los datos de usuario" });
  }
};

const getUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "ID de usuario no encontrado" });
    }
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Fallo en cargar los datos de usuario" });
  }
};

const postUser = async (req, res) => {
  try {
    const createdUser = await User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    });
    res.status(201).json(createdUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Fallo en crear el usuario" });
  }
};

const patchUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        about: req.body.about,
      },
      { new: true },
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "ID de usuario no encontrado" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Fallo en actualizar el usuario" });
  }
};

const patchAvatar = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: true },
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "ID de usuario no encontrado" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Fallo en actualizar el avatar del usuario" });
  }
};

module.exports = { getUsers, getUserId, postUser, patchUser, patchAvatar };
