import React, { useEffect, useState } from "react";
import { ProductContext } from "."; // или просто './'
import axios from "axios";

const RootContext = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [modal, setModal] = useState(() => {
    const saved = localStorage.getItem("modalOpen");
    return saved === "true";
  });

  async function getRecipes() {
    const res = await axios.get("http://51.20.52.136/ru/");
    setRecipes(res.data);
  }
  function getFavorites() {
    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(fav);
  }
  useEffect(() => {
    getRecipes();
    getFavorites();
  }, []);
  return (
    <ProductContext.Provider
      value={{ modal, setModal, favorites, setFavorites, recipes, setRecipes }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default RootContext;
