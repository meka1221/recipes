import React, { useState, useContext } from "react";
import "./SearchBar.scss";
import { ProductContext } from "../context";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { recipes } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      // Можно сделать поиск по рецептам и перейти на первую найденную страницу рецепта
      const found = recipes.find(
        (r: any) =>
          r.title_ru?.toLowerCase().includes(query.toLowerCase()) ||
          r.description_ru?.toLowerCase().includes(query.toLowerCase())
      );
      if (found) {
        navigate(`/recipe/${found.id}`);
      } else {
        alert("Рецепт не найден");
      }
    }
  };

  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Поиск рецептов..."
      value={query}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchBar;
