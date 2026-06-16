const mongose = require("mongoose");

const cardSchema = new mongose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: [true, "El campo de link es obligatorio"],
    validate: {
      validator: (v) => {
        return /^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/.test(
          v,
        );
      },
      message: (props) => `${props.value} no es una URL de imagen válida`,
    },
    owner: {
      type: mongose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: [
      {
        type: mongose.Schema.Types.ObjectId,
        ref: "user",
        default: [],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
});

module.exports = mongose.model("card", cardSchema);
