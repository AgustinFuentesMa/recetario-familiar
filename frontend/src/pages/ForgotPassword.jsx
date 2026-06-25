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