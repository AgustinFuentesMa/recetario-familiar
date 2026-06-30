import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

     localStorage.setItem(
  "usuario",
  JSON.stringify(response.data.usuario)
);

const redirect =
  localStorage.getItem("redirectAfterLogin");

if (redirect) {

  localStorage.removeItem(
    "redirectAfterLogin"
  );

  navigate(redirect);

} else {

  navigate("/home");

}
    } catch (error) {
      alert("Email o contraseña incorrectos");
      console.log(error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-card">

          <h1>🍳 Recetario Familiar</h1>

          <p className="auth-subtitle">
            Guarda tus recetas favoritas
          </p>

          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="login-button"
            >
              Iniciar Sesión
            </button>
          </form>

          <button
             className="forgot-button"
             onClick={() => navigate("/forgot-password")}
          >
             ¿Olvidaste tu contraseña?
          </button>

          <div className="auth-link">
            ¿No tienes cuenta todavía?
            <br />

            <Link to="/register">
              Registrarse
            </Link>
          </div>

        </div>
      </div>

      <div className="login-image"></div>
    </div>
  );
}

export default Login;