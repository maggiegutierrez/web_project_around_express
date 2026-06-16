const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "El campo de avatar es obligatorio"],
    validate: {
      validator: (v) => {
        return /^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/.test(
          v,
        );
      },
      message: (props) => `${props.value} no es una URL de avatar válida`,
    },
  },
});

module.exports = mongoose.model("user", userSchema);
