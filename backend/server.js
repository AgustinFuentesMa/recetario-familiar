require("dotenv").config();

const express = require("express");
const cors = require("cors");

const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows[0]);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

const recipeRoutes =
require("./routes/recipeRoutes");

app.use(
  "/api/recipes",
  recipeRoutes
);