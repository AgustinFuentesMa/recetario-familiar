function RecipeCard({
  recipe,
  onDelete,
  onEdit,
  onView
}) {

  return (

    <div
      className="recipe-card"
      style={{
        backgroundColor: recipe.color
      }}
      onClick={() => onView(recipe)}
    >

      <div>

        <h3>{recipe.nombre.toUpperCase()}</h3>

        <p>{recipe.ingredientes}</p>

      </div>

      <div
        onClick={(e) => e.stopPropagation()}
      >

        <button
          onClick={() => onEdit(recipe)}
        >
          ✏️ Editar
        </button>

        <button
          onClick={() => onDelete(recipe.id)}
        >
          🗑️ Eliminar
        </button>

      </div>

    </div>

  );
}

export default RecipeCard;