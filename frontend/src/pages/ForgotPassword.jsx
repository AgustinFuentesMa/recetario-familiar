import { useState } from "react";
import api from "../services/api";

function ForgotPassword() {

  const [email, setEmail] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await api.post(
        "/auth/forgot-password",
        { email }
      );

      alert(
        "Si el email existe, se envió un enlace."
      );

    } catch (error) {
      console.log(error);
    }
  };

  const forgotPassword = async (req, res) => {
  try {

    console.log("1");

    const { email } = req.body;

    console.log("2", email);

    const user = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    console.log("3", user.rows.length);

    const token = crypto.randomBytes(32).toString("hex");

    console.log("4");

    console.log("ANTES DEL SENDMAIL");

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Recuperación",
      html: "<h1>Hola</h1>",
    });

    console.log("DESPUÉS DEL SENDMAIL");

    res.json({ ok: true });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

  return (
    <div className="auth-page">

      <div className="auth-left">

        <div className="auth-card">

          <h1>🔐 Recuperar Contraseña</h1>

          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >

            <input
              type="email"
              placeholder="Tu email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

            <button
              className="login-button"
            >
              Enviar enlace
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;