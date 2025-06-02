import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaEye, FaEyeSlash, FaRegUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "./Header.scss";
import FilterDropdown from "./FilterDropdown";
import FavoritesIcon from "./FavoritesIcon";
import BurgerMenu from "./BurgerMenu";
import logo from "../../assets/images/logo.png";
import SearchBar from "./SearchBar";

const Header = () => {
  const [register, setRegister] = useState(false);
  const [eye, setEye] = useState(false);
  const [eyeRepeat, setEyeRepeat] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [modal, setModal] = useState(() =>
    JSON.parse(localStorage.getItem("modalOpen") || "false")
  );
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
  });

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setModal(false);
    toast.success("Вы вышли из аккаунта", {
      position: "bottom-right",
      autoClose: 5000,
      theme: "colored",
    });
  };

  const toggleModal = () => {
    setModal((prev: any) => {
      const newState = !prev;
      localStorage.setItem("modalOpen", JSON.stringify(newState));
      return newState;
    });
  };

  const toAdmin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (register) {
      if (!login.trim() || !password.trim() || !repeatPassword.trim()) {
        return toast.error("Заполните поля!", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "colored",
        });
      } else if (
        login.length < 8 ||
        login.length > 16 ||
        password.length < 8 ||
        password.length > 16
      ) {
        return toast.error("Логин и пароль должны быть от 8 до 16 символов!", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "colored",
        });
      } else if (password !== repeatPassword) {
        return toast.error("Пароли не совпадают", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "colored",
        });
      } else if (users.find((u: any) => u.login === login)) {
        return toast.error("Такой пользователь уже существует", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "colored",
        });
      } else {
        const newUser = { login, password };
        toast.success("Успешная регистрация!", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "colored",
        });
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        setRegister(false);
        setLogin("");
        setPassword("");
        setRepeatPassword("");
      }
    } else {
      const user = users.find(
        (u: any) => u.login === login && u.password === password
      );
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        setCurrentUser(user);
        setModal(false);
        toast.success("Успешный вход!", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "colored",
        });
        setLogin("");
        setPassword("");
      } else if (!login.trim() || !password.trim()) {
        return toast.error("Заполните поля!", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "colored",
        });
      } else {
        toast.error("Неверный логин или пароль", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "colored",
        });
        setLogin("");
        setPassword("");
      }
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    setCurrentUser(user);
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
              <NavLink to="/category">Категории</NavLink>
            </nav>
            <div className="header__form">
              <SearchBar />
              <FilterDropdown />
              <FavoritesIcon />
              <div
                onClick={() => (currentUser ? logout() : toggleModal())}
                className="header__form--user"
              >
                <FaRegUser size={22} />
                <span>{currentUser ? "Выйти" : "Войти"}</span>
              </div>
              <BurgerMenu />
            </div>
          </div>
        </div>
      </header>
      {modal && (
        <div className="header__modal">
          <div className="header__modal--block">
            <h1>{register ? "Зарегистрироваться" : "Войти"}</h1>
            <input
              type="text"
              placeholder="Логин"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && toAdmin()}
            />
            <div className="header__modal--block__input">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toAdmin();
                }}
              >
                <input
                  type={eye ? "text" : "password"}
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && toAdmin()}
                />
              </form>
              <button
                className="eye"
                type="button"
                onClick={() => setEye(!eye)}
              >
                {eye ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {register && (
              <div className="header__modal--block__input">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    toAdmin();
                  }}
                >
                  <input
                    type={eyeRepeat ? "text" : "password"}
                    placeholder="Повторите пароль"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && toAdmin()}
                  />
                </form>
                <button
                  className="eye"
                  type="button"
                  onClick={() => setEyeRepeat(!eyeRepeat)}
                >
                  {eyeRepeat ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            )}
            <button className="header__modal--block__login" onClick={toAdmin}>
              {register ? "Зарегистрироваться" : "Войти"}
            </button>
            <h2
              className="header__modal--block__switch"
              onClick={() => {
                setRegister(!register);
                setLogin("");
                setPassword("");
                setRepeatPassword("");
              }}
            >
              {register
                ? "Уже есть аккаунт? Войти"
                : "Нет аккаунта? Зарегистрироваться"}
            </h2>
            <button
              className="header__modal--block__close"
              onClick={() => toggleModal()}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
