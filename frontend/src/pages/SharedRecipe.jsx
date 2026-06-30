import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

import "../styles/sharedRecipe.css";

function SharedRecipe() {

  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    loadRecipe();
  }, []);

  const loadRecipe = async () => {
    try {

      const response = await api.get(
        `/recipes/shared/${id}`
      );

      setRecipe(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  if (!recipe) {
    return <h2>Cargando receta...</h2>;
  }

  return (

    <div className="shared-page">

      <button
  className="back-button"
  onClick={() => window.history.back()}
>
  ← Volver
</button>     

      <div className="shared-card">

        <div
          className="shared-header"
          style={{
            background: recipe.color
          }}
        >

          <h1>
            🍲 {recipe.receta_nombre}
          </h1>

          <p>
            Creada por
            <strong>
              {" "}
              {recipe.autor_nombre}{" "}
              {recipe.autor_apellido}
            </strong>
          </p>

        </div>

        <div className="shared-body">

          <div className="section-card ingredientes">

            <h2>🥣 Ingredientes</h2>

            <p>
              {recipe.ingredientes}
            </p>

          </div>

          <div className="section-card preparacion">

            <h2>👨🏻‍🍳 Preparación</h2>

            <p>
              {recipe.descripcion}
            </p>

          </div>

          <div className="section-card tips">

            <h2>💡 Tips</h2>

            <p>
              {recipe.tips}
            </p>

          </div>

          <div className="autor-box">

            👤 Receta creada por

            <strong>

              {` ${recipe.autor_nombre} ${recipe.autor_apellido}`}

            </strong>

          </div>

          <button className="save-button">

            ➕ Guardar en mi recetario

          </button>

        </div>

      </div>

    </div>

  );

}

export default SharedRecipe;