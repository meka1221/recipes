import React, { useContext, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { ProductContext } from "../components/context/index";
import axios from "axios";

type RecipeType = {
  id: number | string;
  title: string;
  image?: string;
  category?: string;
  description: string;
};

const Category = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { recipes } = useContext(ProductContext) as { recipes: RecipeType[] };
  const [filtered, setFiltered] = useState<RecipeType[]>([]);
  const getData = async () => {
    let data = await axios.get("http://51.20.52.136/ru/category/");
    console.log("data", data);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (recipes.length > 0 && categoryName) {
      const byCategory = recipes.filter(
        (recipe) =>
          typeof recipe.category === "string" &&
          recipe.category.toLowerCase() === categoryName.toLowerCase()
      );
      setFiltered(byCategory);
    }
  }, [categoryName, recipes]);

  // if (!categoryName) return <p>Категория не выбрана</p>;
  // console.log(recipes, 'recipes');

  // if (filtered.length === 0)
  // return <p>Рецепты в категории «{categoryName}» не найдены.</p>;*/}
  console.log(recipes);

  return (
    <div className="category-list">
      <h1>Категория: {categoryName}</h1>
      <div className="card-list">
        {recipes.map((item, index) => (
          <div key={index} className="card-list--block">
            <img src={item.image} alt="" className="card-list--block__img" />
            <div className="card-list--block__body">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <NavLink to={""} className="blog-card__link">
                Читать далее →
              </NavLink>
            </div>
          </div>
        ))}

        {/* {filtered.map((recipe) => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="card">
            <h3>{recipe.title}</h3>
            {recipe.image && <img src={recipe.image} alt={recipe.title} />}
          </Link>
        ))} */}
      </div>
    </div>
  );
};

export default Category;
