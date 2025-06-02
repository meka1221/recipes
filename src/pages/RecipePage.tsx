import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../components/context/index";
import "./RecipePage.scss";

const RecipePage = () => {
  const { id } = useParams();
  const { recipes } = useContext(ProductContext);
  const [recipe, setRecipe] = useState<any | null>(null);

  useEffect(() => {
    const found = recipes.find((r: any) => String(r.id) === id);
    setRecipe(found || null);
  }, [id, recipes]);

  if (!recipe) {
    return <p>Рецепт не найден.</p>;
  }

  return (
    <div className="recipe-page">
      <h1>{recipe.title_ru}</h1>
      <img
        src={recipe.image || "/default-image.jpg"}
        alt={recipe.title_ru}
        className="recipe-page__image"
      />
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
        <p>{recipe.steps}</p>
      </div>

      <div>
        <h3>Ингредиенты:</h3>
        <ul>
          {recipe.ingredients.map((ing: string, index: number) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipePage;
