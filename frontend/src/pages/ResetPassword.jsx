import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";

import "../styles/auth.css";

function ResetPassword() {
  const navigate = useNavigate();

  const { token } = useParams();

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert(
        "Las contraseñas no coinciden"
      );

      return;
    }

    try {

      await api.post(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      alert(
        "Contraseña actualizada correctamente"
      );

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        "Token inválido o expirado"
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-left">

        <div className="auth-card">

          <h1>🔐 Nueva contraseña</h1>

          <p className="auth-subtitle">
            Ingresa tu nueva contraseña
          </p>

          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >

            <input
              type="password"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

            <button
              type="submit"
              className="login-button"
            >
              Guardar contraseña
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default ResetPassword;