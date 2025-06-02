import React from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeCard.scss";

interface RecipeCardProps {
  id: number;
  title: string;
  image: string;
  description: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ id, title, image, description }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product-list/${id}`);
  };

  return (
    <div className="recipe-card">
      <img src={image} alt={title} className="recipe-card__image" />
      <h3 className="recipe-card__title">{title}</h3>
      <p className="recipe-card__desc">{description}</p>
      <button className="recipe-card__btn" onClick={handleClick}>
        Далее →
      </button>
    </div>
  );
};

export default RecipeCard;
