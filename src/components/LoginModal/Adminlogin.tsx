import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post("http://51.20.52.136/ru/auth/token/login/", {
        username,
        password,
      });

      const token = res.data.auth_token;

      // Получить текущего пользователя по токену
      const userRes = await axios.get("http://51.20.52.136/ru/auth/users/me/", {
        headers: { Authorization: `Token ${token}` },
      });

      const user = userRes.data;

      // Сохранить в localStorage
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: user.id,
          username: user.username,
          auth_token: token,
        })
      );

      toast.success("Успешный вход!");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      toast.error("Ошибка входа");
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="login-page">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
