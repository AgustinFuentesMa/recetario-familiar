const pool = require("../config/db");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const transporter = require("../config/mail");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({
        message: "Credenciales incorrectas",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Credenciales incorrectas",
      });
    }

    const token = jwt.sign(
      {
        id: user.rows[0].id,
        email: user.rows[0].email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login exitoso",
      token,
      usuario: {
        id: user.rows[0].id,
        nombre: user.rows[0].nombre,
        apellido: user.rows[0].apellido,
        email: user.rows[0].email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const register = async (req, res) => {
  try {
    const { nombre, apellido, email, password } = req.body;

    const userExists = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        message: "El email ya está registrado",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      `
      INSERT INTO usuarios
      (nombre, apellido, email, password)
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [nombre, apellido, email, hashedPassword]
    );

    res.status(201).json({
      message: "Usuario creado correctamente",
      user: newUser.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const forgotPassword = async (req, res) => {
  try {
    console.log("========== INICIO ==========");

    const { email } = req.body;
    console.log("EMAIL:", email);

    const user = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    console.log("USUARIO ENCONTRADO:", user.rows.length);

    if (user.rows.length === 0) {
      console.log("NO EXISTE EL USUARIO");
      return res.json({
        message: "Si el email existe se enviará un enlace",
      });
    }

    console.log("GENERANDO TOKEN");

    const token = crypto.randomBytes(32).toString("hex");

    const expireDate = new Date(
      Date.now() + 1000 * 60 * 60
    );

    console.log("ACTUALIZANDO BD");

    await pool.query(
      `
      UPDATE usuarios
      SET reset_token = $1,
          reset_token_expire = $2
      WHERE email = $3
      `,
      [token, expireDate, email]
    );

    console.log("BD ACTUALIZADA");

    const resetLink = `https://recetario-familiar-five.vercel.app/reset-password/${token}`;

    console.log("LINK:", resetLink);

    console.log("ANTES DE SENDMAIL");

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Recuperación de contraseña",
      html: `
        <h2>Recetario Familiar</h2>
        <a href="${resetLink}">
          Restablecer contraseña
        </a>
      `,
    });

    console.log("DESPUÉS DE SENDMAIL");
    console.log(info);

    res.json({
      message: "Correo enviado correctamente",
    });

  } catch (error) {
    console.log("ERROR COMPLETO:");
    console.log(error);

    res.status(500).json({
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
  }
};

const resetPassword = async (req, res) => {

  try {

    const { token } = req.params;

    const { password } = req.body;

    const user = await pool.query(
      `
      SELECT *
      FROM usuarios
      WHERE reset_token = $1
      `,
      [token]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({
        message: "Token inválido",
      });
    }

    const expireDate =
      user.rows[0].reset_token_expire;

    if (
      new Date(expireDate) <
      new Date()
    ) {
      return res.status(400).json({
        message: "Token expirado",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await pool.query(
      `
      UPDATE usuarios
      SET password = $1,
          reset_token = NULL,
          reset_token_expire = NULL
      WHERE id = $2
      `,
      [
        hashedPassword,
        user.rows[0].id,
      ]
    );

    res.json({
      message:
        "Contraseña actualizada",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json(error);
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};

