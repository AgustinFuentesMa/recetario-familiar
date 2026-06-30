import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";

function RecipeCard({
  recipe,
  onDelete,
  onEdit,
  onView,
  onShare,
  onFavorite
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

  <div className="recipe-actions">

    <button
      className="favorite-button"
      onClick={(e) => {
        e.stopPropagation();
        onFavorite(recipe);
      }}
    >

      {recipe.favorita ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}

    </button>

    <button
      className="share-button"
      onClick={(e) => {
        e.stopPropagation();
        onShare(recipe);
      }}
    >

      <IoShareSocial />

    </button>

  </div>

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