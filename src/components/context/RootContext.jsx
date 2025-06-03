import React, { useEffect, useState } from "react";
import { ProductContext } from ".";
import axios from "axios";

const RootContext = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [categories, setCategories] = useState([]); // категории из /ru/type/
  const [modal, setModal] = useState(() => {
    const saved = localStorage.getItem("modalOpen");
    return saved === "true";
  });

  async function getRecipes() {
    try {
      const res = await axios.get("http://51.20.52.136/ru/");
      setRecipes(res.data);
    } catch (error) {
      console.error("Ошибка при загрузке рецептов:", error);
    }
  }

  function getFavorites() {
    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(fav);
  }

  // Получаем категории из /ru/type/
  async function getCategories() {
    try {
      const res = await axios.get("http://51.20.52.136/ru/type/");
      setCategories(res.data);
    } catch (error) {
      console.error("Ошибка при загрузке категорий:", error);
    }
  }

  useEffect(() => {
    getRecipes();
    getFavorites();
    getCategories();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        modal,
        setModal,
        favorites,
        setFavorites,
        recipes,
        setRecipes,
        categories,
        setCategories,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default RootContext;
