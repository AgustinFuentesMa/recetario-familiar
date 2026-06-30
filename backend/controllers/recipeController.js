const pool = require("../config/db");

const colores = [
  "#FFD54F",
  "#81D4FA",
  "#A5D6A7",
  "#FFAB91",
  "#CE93D8",
  "#FFF59D"
];

const createRecipe = async (req, res) => {
  try {
    const {
      nombre,
      ingredientes,
      descripcion,
      tips
    } = req.body;

    const letra = nombre.charAt(0).toUpperCase();

    const color =
      colores[Math.floor(Math.random() * colores.length)];

    const receta = await pool.query(
      `
      INSERT INTO recetas
      (
        nombre,
        ingredientes,
        descripcion,
        tips,
        letra,
        color,
        usuario_id
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `,
      [
        nombre,
        ingredientes,
        descripcion,
        tips,
        letra,
        color,
        req.user.id
      ]
    );

    res.status(201).json(receta.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getRecipes = async (req, res) => {
  try {
    const recetas = await pool.query(
      `
      SELECT *
      FROM recetas
      WHERE usuario_id = $1
      ORDER BY nombre ASC
      `,
      [req.user.id]
    );

    res.json(recetas.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getRecipesByLetter = async (req, res) => {
  try {
    const { letter } = req.params;

    const recetas = await pool.query(
      `
      SELECT *
      FROM recetas
      WHERE usuario_id = $1
      AND letra = $2
      ORDER BY nombre ASC
      `,
      [
        req.user.id,
        letter.toUpperCase()
      ]
    );

    res.json(recetas.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nombre,
      ingredientes,
      descripcion,
      tips
    } = req.body;

    const recipeExists = await pool.query(
      `
      SELECT *
      FROM recetas
      WHERE id = $1
      AND usuario_id = $2
      `,
      [id, req.user.id]
    );

    if (recipeExists.rows.length === 0) {
      return res.status(404).json({
        message: "Receta no encontrada"
      });
    }

    const letra = nombre.charAt(0).toUpperCase();

    const recipe = await pool.query(
      `
      UPDATE recetas
      SET
        nombre = $1,
        ingredientes = $2,
        descripcion = $3,
        tips = $4,
        letra = $5
      WHERE id = $6
      RETURNING *
      `,
      [
        nombre,
        ingredientes,
        descripcion,
        tips,
        letra,
        id
      ]
    );

    res.json(recipe.rows[0]);

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteRecipe = async (req, res) => {
  try {

    const { id } = req.params;

    const recipeExists = await pool.query(
      `
      SELECT *
      FROM recetas
      WHERE id = $1
      AND usuario_id = $2
      `,
      [id, req.user.id]
    );

    if (recipeExists.rows.length === 0) {
      return res.status(404).json({
        message: "Receta no encontrada"
      });
    }

    await pool.query(
      `
      DELETE FROM recetas
      WHERE id = $1
      `,
      [id]
    );

    res.json({
      message: "Receta eliminada"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getSharedRecipe = async (req, res) => {
  try {

    const { id } = req.params;

    const receta = await pool.query(
      `
      SELECT
        recetas.id,
        recetas.nombre AS receta_nombre,
        recetas.ingredientes,
        recetas.descripcion,
        recetas.tips,
        recetas.color,
        recetas.letra,
        recetas.usuario_id,

        usuarios.nombre AS autor_nombre,
        usuarios.apellido AS autor_apellido

      FROM recetas

      INNER JOIN usuarios
      ON recetas.usuario_id = usuarios.id

      WHERE recetas.id = $1
      `,
      [id]
    );

    if (receta.rows.length === 0) {
      return res.status(404).json({
        message: "Receta no encontrada"
      });
    }

    res.json(receta.rows[0]);

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const saveSharedRecipe = async (req, res) => {

  try {

    const { id } = req.params;

    const recipe = await pool.query(
      `
      SELECT *
      FROM recetas
      WHERE id = $1
      `,
      [id]
    );

    if(recipe.rows.length===0){
      return res.status(404).json({
        message:"Receta no encontrada"
      });
    }

    const r = recipe.rows[0];

    await pool.query(
      `
      INSERT INTO recetas
      (
        nombre,
        ingredientes,
        descripcion,
        tips,
        letra,
        color,
        usuario_id
      )
      VALUES($1,$2,$3,$4,$5,$6,$7)
      `,
      [
        r.nombre,
        r.ingredientes,
        r.descripcion,
        r.tips,
        r.letra,
        r.color,
        req.user.id
      ]
    );

    res.json({
      message:"Receta agregada correctamente"
    });

  } catch(error){

    console.log(error);

    res.status(500).json(error);

  }

};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipesByLetter,
  updateRecipe,
  deleteRecipe,
  getSharedRecipe,
  saveSharedRecipe
};