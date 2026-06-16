const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { PORT = 3000 } = process.env;
const userRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/mydb");
    console.log(`Express ahora sí se ha conectado`);
  } catch (error) {
    console.log(`Error al conectar a MongoDB: ${error.message}`);
  }
};

app.use("/users", userRouter);
app.use("/cards", cardsRouter);

app.use("*splat", (req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`Still working`);
});
