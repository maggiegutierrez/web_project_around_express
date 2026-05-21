const express = require("express");
const app = express();
const { PORT = 3000 } = process.env;
const userRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

app.use("/users", userRouter);
app.use("/cards", cardsRouter);

app.use("*splat", (req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`Still working`);
});
