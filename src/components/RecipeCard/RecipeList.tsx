import React, { useContext } from "react";
import { ProductContext } from "../context";
import { Link } from "react-router-dom";
import "./RecipeList.scss";

type Recipe = {
  id: number;
  title_ru: string;
  description_ru: string;
  image?: string;
};

const RecipeList = () => {
  const { recipes } = useContext(ProductContext) as { recipes: Recipe[] };
  console.log("Recipes:", recipes);
  return (
    <div className="recipe-list">
      {recipes.map((recipe: Recipe) => (
        <div className="recipe-card" key={recipe.id}>
          <img
            src={recipe.image || "/default-image.jpg"}
            alt={recipe.title_ru}
            className="recipe-card__image"
          />
          <div className="recipe-card__content">
            <h2 className="recipe-card__title">{recipe.title_ru}</h2>
            <p className="recipe-card__description">
              {recipe.description_ru.length > 100
                ? recipe.description_ru.slice(0, 100) + "..."
                : recipe.description_ru}
            </p>
            <Link to={`/recipe/${recipe.id}`} className="recipe-card__button">
              Подробнее
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
