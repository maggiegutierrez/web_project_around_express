const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { PORT = 3000 } = process.env;
const userRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "6a3220cd72664f8b3513c9cc",
  };
  next();
});

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/aroundb");

    app.listen(PORT, () => {
      console.log(`Still working!`);
    });
  } catch (error) {
    console.log(`Error al conectar a MongoDB: ${error.message}`);
  }
};

app.use("/users", userRouter);
app.use("/cards", cardsRouter);

app.use("*splat", (req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

connectDB();
