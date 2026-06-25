import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
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
      await api.post(
        "/auth/register",
        formData
      );

      alert("Usuario registrado correctamente");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="auth-page">

      <div className="register-image"></div>

      <div className="auth-right">

        <div className="auth-card">

          <h1>📖 Crear Cuenta</h1>

          <p className="auth-subtitle">
            Crea tu cuenta para guardar recetas
          </p>

          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
            />

            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleChange}
            />

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
              className="register-button"
            >
              Registrarse
            </button>
          </form>

          <div className="auth-link">
            ¿Ya tienes cuenta?
            <br />

            <Link to="/">
              Iniciar Sesión
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;