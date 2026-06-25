function RecipeCard({
  recipe,
  onDelete,
  onEdit
}) {
  return (
    <div
      className="recipe-card"
      style={{
        backgroundColor: recipe.color
      }}
    >
      <div>
        <h3>{recipe.nombre.toUpperCase()}</h3>

        <p>
          {recipe.ingredientes}
        </p>
      </div>

      <div>
        <button
           onClick={() => 
            onEdit(recipe)
            }
        >
          ✏️ Editar
        </button>

        <button
          onClick={() =>
            onDelete(recipe.id)
          }
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;