function RecipeCard({
  recipe,
  onDelete,
  onEdit,
  onView,
  onShare
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

        <div className="recipe-top">

          <h3>{recipe.nombre.toUpperCase()}</h3>

          <button
            className="share-button"
            onClick={(e) => {
              e.stopPropagation();
              onShare(recipe);
            }}
          >
            📤
          </button>

        </div>

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