import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import SidebarLetters from "../components/SidebarLetters";
import RecipeCard from "../components/RecipeCard";

import "../styles/home.css";

function Home() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [nombre, setNombre] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tips, setTips] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/");
  };

  const loadRecipes = async () => {
    try {
      const response = await api.get("/recipes");

      setRecipes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const userData =
      localStorage.getItem("usuario");

    if (userData) {
      setUsuario(
        JSON.parse(userData)
      );
    }

    loadRecipes();
  }, []);

  const handleLetterClick = async (letter) => {
    try {
      const response = await api.get(
        `/recipes/letter/${letter}`
      );

      setRecipes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateRecipe = async () => {

  if (
    !nombre.trim() ||
    !ingredientes.trim() ||
    !descripcion.trim() ||
    !tips.trim()
  ) {
    alert(
      "Todos los campos son obligatorios"
    );
    return;
  }

  try {

    await api.post("/recipes", {
      nombre,
      ingredientes,
      descripcion,
      tips
    });

    setNombre("");
    setIngredientes("");
    setDescripcion("");
    setTips("");

    setShowModal(false);

    loadRecipes();

  } catch (error) {
    console.error(error);
  }
};

  const handleUpdateRecipe = async () => {
    try {
      await api.put(
        `/recipes/${editingRecipe.id}`,
        {
          nombre,
          ingredientes,
          descripcion,
          tips,
        }
      );

      setEditingRecipe(null);

      setNombre("");
      setIngredientes("");
      setDescripcion("");
      setTips("");

      setShowModal(false);

      loadRecipes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRecipe = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar esta receta?"
    );

    if (!confirmar) return;

    try {
      await api.delete(
        `/recipes/${id}`
      );

      loadRecipes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);

    setNombre(recipe.nombre);
    setIngredientes(recipe.ingredientes);
    setDescripcion(recipe.descripcion);
    setTips(recipe.tips);

    setShowModal(true);
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.nombre
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  const handleViewRecipe = (recipe) => {
  setSelectedRecipe(recipe);
  };

  return (
    <div className="home">

      <SidebarLetters
        onSelect={handleLetterClick}
      />

      <div className="recipes-content">

        <div className="header">

          <div>

            <h1 className="title">
              Mis Recetas
            </h1>

            <p className="welcome-text">
              👋 Bienvenido{" "}
              {usuario?.nombre}
            </p>

          </div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>

        </div>

        <input
          type="text"
          placeholder="🔍 Buscar receta..."
          className="search-input"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <button
          className="add-button"
          onClick={() =>
            setShowModal(true)
          }
        >
          +
        </button>

        <div className="recipes-container">

          {filteredRecipes.map(
            (recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onDelete={
                  handleDeleteRecipe
                }
                onEdit={
                  handleEditRecipe
                }
                onView={
                  handleViewRecipe
                }
              />
            )
          )}

        </div>

      </div>

      {showModal && (
        <div className="modal-overlay">

          <div className="modal">

            <h2>
              {editingRecipe
                ? "Editar Receta"
                : "Nueva Receta"}
            </h2>

            <textarea
              placeholder="Nombre de la receta"
              value={nombre.toUpperCase()}
              onChange={(e) =>
                setNombre(
                  e.target.value
                )
              }
            />

            <textarea
              placeholder="Ingredientes"
              value={ingredientes}
              onChange={(e) =>
                setIngredientes(
                  e.target.value
                )
              }
            />

            <textarea
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) =>
                setDescripcion(
                  e.target.value
                )
              }
            />

            <textarea
              placeholder="Tips"
              value={tips}
              onChange={(e) =>
                setTips(
                  e.target.value
                )
              }
            />

            <div className="modal-buttons">

              <button
                onClick={() => {
                  setShowModal(false);

                  setEditingRecipe(
                    null
                  );

                  setNombre("");
                  setIngredientes("");
                  setDescripcion("");
                  setTips("");
                }}
              >
                Cancelar
              </button>

              <button
                onClick={
                  editingRecipe
                    ? handleUpdateRecipe
                    : handleCreateRecipe
                }
              >
                {editingRecipe
                  ? "Actualizar"
                  : "Crear"}
              </button>

            </div>

          </div>

        </div>
        
      )}
{selectedRecipe && (

<div className="modal-overlay">

<div className="recipe-modal">

<div
className="recipe-header"
style={{
backgroundColor:selectedRecipe.color
}}
>

<h2>
🍽 {selectedRecipe.nombre.toUpperCase()}
</h2>

<div className="recipe-icons">

<button
className="icon-button"
title="Compartir"
onClick={() => {

const link =
`${window.location.origin}/shared/${selectedRecipe.id}`;

navigator.clipboard.writeText(link);

alert("✅ Enlace copiado");

}}
>
📤
</button>

<button
className="icon-button"
title="Favorito"
>
🤍
</button>

</div>

</div>

<div className="recipe-body">

<h3>🥕 Ingredientes</h3>

<p>{selectedRecipe.ingredientes}</p>

<h3>👨‍🍳 Preparación</h3>

<p>{selectedRecipe.descripcion}</p>

<h3>💡 Tips</h3>

<p>{selectedRecipe.tips}</p>

</div>

<div className="recipe-footer">

<button
onClick={()=>
setSelectedRecipe(null)
}
>
Cerrar
</button>

</div>

</div>

</div>

)}


    </div>
  );
}

export default Home;