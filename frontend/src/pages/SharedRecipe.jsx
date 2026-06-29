import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function SharedRecipe() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    loadRecipe();
  }, []);

  const loadRecipe = async () => {
    try {
      const response = await api.get(`/recipes/shared/${id}`);
      setRecipe(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!recipe) {
    return <h2>Cargando receta...</h2>;
  }

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "30px",
        background: recipe.color,
        borderRadius: "15px",
      }}
    >
      <h1>{recipe.nombre}</h1>

      <h3>🥣 Ingredientes</h3>
      <p>{recipe.ingredientes}</p>

      <h3>👨‍🍳 Preparación</h3>
      <p>{recipe.descripcion}</p>

      <h3>💡 Tips</h3>
      <p>{recipe.tips}</p>

      <hr />

      <p>
        <strong>Receta creada por:</strong>{" "}
        {recipe.nombre_usuario} {recipe.apellido_usuario}
      </p>

      <button
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          cursor: "pointer",
        }}
      >
        Guardar en mi recetario
      </button>
    </div>
  );
}

export default SharedRecipe;