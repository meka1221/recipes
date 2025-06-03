import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../components/context/index";
import "./RecipePage.scss";

const RecipePage = () => {
  const { id } = useParams();
  const { recipes, favorites, setFavorites } = useContext(ProductContext);
  const [recipe, setRecipe] = useState<any | null>(null);

  useEffect(() => {
    const found = recipes.find((r: any) => String(r.id) === id);
    setRecipe(found || null);
  }, [id, recipes]);

  if (!recipe) {
    return <p>Рецепт не найден.</p>;
  }

  // Проверяем, в избранном ли этот рецепт
  const isFavorite = favorites.includes(recipe.id);

  // Функция для добавления/удаления из избранного
  const toggleFavorite = () => {
    let updated;
    if (isFavorite) {
      updated = favorites.filter((fid: any) => fid !== recipe.id);
    } else {
      updated = [...favorites, recipe.id];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // Приводим ингредиенты к массиву, если это строка
  let ingredients: string[] = [];
  if (Array.isArray(recipe.ingredients)) {
    ingredients = recipe.ingredients;
  } else if (typeof recipe.ingredients === "string") {
    ingredients = recipe.ingredients
      .split(/\r?\n|,/)
      .map((item: string) => item.trim())
      .filter(Boolean);
  }

  // Приводим шаги к массиву, если это строка
  let steps: string[] = [];
  if (Array.isArray(recipe.steps)) {
    steps = recipe.steps;
  } else if (typeof recipe.steps === "string") {
    steps = recipe.steps
      .split(/\r?\n|\. /)
      .map((item: string) => item.trim())
      .filter(Boolean);
  }

  return (
    <div className="recipe-page">
      <h1>{recipe.title_ru}</h1>
      <img
        src={recipe.image || "/default-image.jpg"}
        alt={recipe.title_ru}
        className="recipe-page__image"
      />
      <button
        className={`favorite-btn${isFavorite ? " active" : ""}`}
        onClick={toggleFavorite}
        style={{
          marginBottom: "1rem",
          background: isFavorite ? "#ffb347" : "#eee",
          border: "none",
          padding: "0.5rem 1.2rem",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {isFavorite ? "В избранном" : "Добавить в избранное"}
      </button>
      <p>
        <strong>Описание:</strong> {recipe.description_ru}
      </p>
      <p>
        <strong>Время приготовления:</strong> {recipe.prep_time}
      </p>
      <p>
        <strong>Сложность:</strong> {recipe.difficulty}
      </p>
      <p>
        <strong>Порции:</strong> {recipe.servings}
      </p>
      <p>
        <strong>Калории:</strong> {recipe.calories}
      </p>
      <p>
        <strong>Белки:</strong> {recipe.protein}
      </p>
      <p>
        <strong>Жиры:</strong> {recipe.fat}
      </p>
      <p>
        <strong>Углеводы:</strong> {recipe.carbohydrates}
      </p>
      <p>
        <strong>Витамины:</strong> {recipe.vitamins}
      </p>
      <p>
        <strong>Минералы:</strong> {recipe.minerals}
      </p>

      <div>
        <h3>Шаги приготовления:</h3>
        {steps.length > 0 ? (
          <ol>
            {steps.map((step: string, idx: number) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        ) : (
          <p>Шаги не указаны.</p>
        )}
      </div>

      <div>
        <h3>Ингредиенты:</h3>
        {ingredients.length > 0 ? (
          <ul>
            {ingredients.map((ing: string, index: number) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>
        ) : (
          <p>Ингредиенты не указаны.</p>
        )}
      </div>
    </div>
  );
};

export default RecipePage;
