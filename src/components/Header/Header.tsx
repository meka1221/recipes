import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "./Header.scss";
import FilterDropdown from "./FilterDropdown";
import FavoritesIcon from "./FavoritesIcon";
import BurgerMenu from "./BurgerMenu";
import logo from "../../assets/images/logo.png";
import SearchBar from "./SearchBar";
import Login from "../LoginModal/Login"; // путь проверь
import Register from "../RegisterModal/RegisterModal"; // путь проверь

const Header = () => {
  const [difficulty, setDifficulty] = useState("");
  const [modal, setModal] = useState(false);
  const [registerMode, setRegisterMode] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    toast.success("Вы вышли из аккаунта", {
      position: "bottom-right",
      autoClose: 5000,
      theme: "colored",
    });
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) setToken(storedToken);
  }, []);

  return (
    <>
      <ToastContainer />
      <header id="header">
        <div className="container">
          <div className="header">
            <div className="header__logo">
              <img src={logo} alt="logo" />
              <h1>FoodVibe</h1>
            </div>
            <nav className="header__nav">
              <NavLink to="/" end>
                Главная
              </NavLink>
              <NavLink to="/blog">Блог</NavLink>
              <NavLink to="/about">О нас</NavLink>
              <NavLink to="/recipelist">Список Рецептов</NavLink>
            </nav>
            <div className="header__form">
              <SearchBar />
              <FilterDropdown value={difficulty} onChange={setDifficulty} />
              <FavoritesIcon />
              <div
                onClick={() => (token ? logout() : setModal(true))}
                className="header__form--user"
              >
                <FaRegUser size={22} />
                <span>{token ? "Выйти" : "Войти"}</span>
              </div>
              <BurgerMenu />
            </div>
          </div>
        </div>
      </header>

      {modal && (
        <div className="header__modal">
          <div className="header__modal--block">
            <button
              className="header__modal--block__close"
              onClick={() => setModal(false)}
            >
              ×
            </button>
            {registerMode ? (
              <>
                <Register
                  setModal={setModal}
                  setRegisterMode={setRegisterMode}
                />
                <h2
                  className="header__modal--block__switch"
                  onClick={() => setRegisterMode(false)}
                >
                  Уже есть аккаунт? Войти
                </h2>
              </>
            ) : (
              <>
                <Login setModals={setModal} />
                <h2
                  className="header__modal--block__switch"
                  onClick={() => setRegisterMode(true)}
                >
                  Нет аккаунта? Зарегистрироваться
                </h2>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
