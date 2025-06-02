import React, { useState, useContext } from "react";
import axios from "axios";
// Update the import path to the correct location of your ProductContext
// import { ProductContext } from "../ProductContext"; // adjust the path as needed
import { ProductContext } from "../context/"; // update the path as needed

// Define the context type according to your context's value shape
interface ProductContextType {
  setModal: (value: boolean) => void;
  setFavorites: (favorites: any) => void;
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setModal, setFavorites } = useContext(
    ProductContext as React.Context<ProductContextType>
  );
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        "http://51.20.52.136/ru/auth/token/login/",
        {
          username,
          password,
        }
      );
      const token = response.data.auth_token;
      // Сохраняем токен в localStorage
      localStorage.setItem("authToken", token);

      // Закрываем модальное окно логина (если есть)
      setModal(false);

      // Получаем данные пользователя с новым токеном
      const userResponse = await axios.get(
        "http://51.20.52.136/ru/auth/users/me/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      console.log("Пользователь:", userResponse.data);

      // Можешь сюда записать данные пользователя в состояние, если нужно

      // Пример: загрузить избранное пользователя (если реализовано на бэке)
      // const favResponse = await axios.get("http://51.20.52.136/ru/favorite/", {
      //   headers: { Authorization: `Token ${token}` },
      // });
      // setFavorites(favResponse.data);
    } catch (err) {
      setError("Неправильный логин или пароль");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Логин"
        required
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        type="password"
        required
      />
      <button type="submit">Войти</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Login;
