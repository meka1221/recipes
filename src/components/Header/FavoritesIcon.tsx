import React, { useContext, useState } from "react";
import "./FavoritesIcon.scss";
import favoriteIcon from "../../assets/images/favorite.png";
import { ProductContext } from "../context/index";
import { NavLink, NavLinkRenderProps } from "react-router-dom";

const FavoritesIcon = () => {
  const { favorites, recipes } = useContext(ProductContext);
  const [open, setOpen] = useState(false);

  // Получаем избранные рецепты по id
  const favoriteRecipes = recipes.filter((r: { id: any }) =>
    favorites.includes(r.id)
  );

  return (
    <>
  <button
   className="favorites-icon"
  title="Избранное"
  onClick={() => setOpen(true)}
>
  <img src={favoriteIcon} alt="favorites" className="favorites-icon__img" />
  {favorites.length > 0 && (
    <span className="favorites-icon__count">{favorites.length}</span>
  )}
</button>
      {open && (
        <div className="favorites-modal" onClick={() => setOpen(false)}>
          <div
            className="favorites-modal__content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="favorites-modal__close"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <h2>Избранные рецепты</h2>
            {favoriteRecipes.length === 0 ? (
              <p>Нет избранных рецептов.</p>
            ) : (
              <ul>
                {favoriteRecipes.map(
                  (recipe: {
                    id: React.Key | null | undefined;
                    title:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | ((props: NavLinkRenderProps) => React.ReactNode)
                      | null
                      | undefined;
                  }) => (
                    <li key={recipe.id}>
                      <NavLink
                        to={`/recipe/${recipe.id}`}
                        onClick={() => setOpen(false)}
                      >
                        {recipe.title}
                      </NavLink>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FavoritesIcon;
