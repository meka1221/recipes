import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductContext } from "../components/context/index";

type RecipeType = {
  id: number | string;
  title: string;
  image?: string;
  category?: {
    id: number;
    name: string;
  };
};

type CategoryType = {
  id: number;
  name: string;
  type: number;
};

const Category = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { recipes, categories } = useContext(ProductContext) as {
    recipes: RecipeType[];
    categories: CategoryType[];
  };

  const [filtered, setFiltered] = useState<RecipeType[]>([]);

  useEffect(() => {
    if (recipes.length > 0 && categories.length > 0 && categoryName) {
      // Найдём ID категории по имени
      const matchedCategory = categories.find(
        (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
      );

      if (!matchedCategory) {
        setFiltered([]);
        return;
      }

      const byCategory = recipes.filter(
        (recipe) => recipe.category && recipe.category.id === matchedCategory.id
      );
      setFiltered(byCategory);
    }
  }, [categoryName, recipes, categories]);

  if (!categoryName) return <p>Категория не выбрана</p>;

  if (filtered.length === 0)
    return <p>Рецепты в категории «{categoryName}» не найдены.</p>;

  return (
    <div className="category-list">
      <h2>Рецепты в категории: {categoryName}</h2>
      <div className="card-list">
        {filtered.map((recipe) => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="card">
            <h3>{recipe.title}</h3>
            {recipe.image && <img src={recipe.image} alt={recipe.title} />}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
