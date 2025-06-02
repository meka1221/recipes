import React, { useState } from "react";
import "./BurgerMenu.scss";
import { NavLink } from "react-router-dom";

const categories = [
  {
    name: "Еда",
    sub: [
      { name: "Идеи для ужина", link: "/category/dinner-ideas" },
      { name: "Ужины", link: "/category/dinners" },
      { name: "Завтраки и бранчи", link: "/category/breakfasts-brunch" },
      { name: "Обеды", link: "/category/lunch" },
      { name: "Закуски", link: "/category/appetizers" },
      { name: "Десерты", link: "/category/desserts" },
      { name: "Напитки и коктейли", link: "/category/drinks-cocktails" },
      { name: "Гарниры", link: "/category/side-dishes" },
      { name: "Выпечка", link: "/category/baking" },
      { name: "Фастфуд", link: "/category/fast-food" },
    ],
  },
  {
    name: "Ингредиенты",
    sub: [
      { name: "Курица", link: "/ingredient/chicken" },
      { name: "Говядина", link: "/ingredient/beef" },
      { name: "Свинина", link: "/ingredient/pork" },
      { name: "Овощи", link: "/ingredient/vegetables" },
      { name: "Картофель", link: "/ingredient/potato" },
      { name: "Рис", link: "/ingredient/rice" },
      { name: "Яйца", link: "/ingredient/eggs" },
      { name: "Сыр", link: "/ingredient/cheese" },
      { name: "Морепродукты", link: "/ingredient/seafood" },
      { name: "Фрукты", link: "/ingredient/fruits" },
      { name: "Макароны", link: "/ingredient/pasta" },
    ],
  },
  {
    name: "Типы блюд",
    sub: [
      { name: "Основные блюда", link: "/category/main-dishes" },
      { name: "Салаты", link: "/category/salads" },
      { name: "Супы", link: "/category/soups" },
      { name: "Пицца", link: "/category/pizza" },
      { name: "Сэндвичи", link: "/category/sandwiches" },
      { name: "Запеканки", link: "/category/casseroles" },
      { name: "Гриль", link: "/category/grill" },
      { name: "Смузи", link: "/category/smoothies" },
    ],
  },
  {
    name: "Мировая кухня",
    sub: [
      { name: "Итальянская", link: "/category/italian" },
      { name: "Азиатская", link: "/category/asian" },
      { name: "Французская", link: "/category/french" },
      { name: "Японская", link: "/category/japanese" },
      { name: "Китайская", link: "/category/chinese" },
      { name: "Мексиканская", link: "/category/mexican" },
      { name: "Индийская", link: "/category/indian" },
      { name: "Грузинская", link: "/category/georgian" },
      { name: "Американская", link: "/category/american" },
      { name: "Греческая", link: "/category/greek" },
      { name: "Корейская", link: "/category/korean" },
    ],
  },
  {
    name: "События",
    sub: [
      { name: "Праздники", link: "/category/holidays" },
      { name: "Дни рождения", link: "/category/birthdays" },
      { name: "Ужины на буднях", link: "/category/weeknight-dinners" },
      { name: "Пикники", link: "/category/picnic" },
      { name: "Новый год", link: "/category/new-year" },
      { name: "Рождество", link: "/category/christmas" },
      { name: "Вечеринки", link: "/category/parties" },
      { name: "Свадьбы", link: "/category/weddings" },
      { name: "Рамазан", link: "/category/fasting" },
    ],
  },
  {
    name: "План похудения",
    sub: [
      { name: "Низкокалорийные", link: "/category/low-calorie" },
      { name: "Кето рецепты", link: "/category/keto" },
      { name: "Без сахара", link: "/category/sugar-free" },
      { name: "Веганские диеты", link: "/category/vegan-diet" },
    ],
  },
];

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="burger-menu__button"
        onClick={() => setOpen(true)}
        aria-label="Открыть меню"
      >
        <span className="burger-menu__icon">☰</span>
      </button>
      {open && (
        <div className="burger-menu__overlay" onClick={() => setOpen(false)}>
          <aside
            className="burger-menu__drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="burger-menu__close"
              onClick={() => setOpen(false)}
              aria-label="Закрыть меню"
            >
              ×
            </button>
            <nav className="burger-menu__nav">
              {categories.map((cat) => (
                <div key={cat.name} className="burger-menu__category">
                  <div className="burger-menu__category-title">{cat.name}</div>
                  <ul className="burger-menu__sublist">
                    {cat.sub.map((sub) => (
                      <li key={sub.name}>
                        <NavLink to={sub.link} onClick={() => setOpen(false)}>
                          {sub.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
};

export default BurgerMenu;
