import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const res = await axios.post("http://51.20.52.136/ru/auth/token/login/", {
        username,
        password,
      });

      const token = res.data.auth_token;

      // Получить текущего пользователя
      const userRes = await axios.get("http://51.20.52.136/ru/auth/users/me/", {
        headers: { Authorization: `Token ${token}` },
      });

      const user = userRes.data;

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: user.id,
          username: user.username,
          auth_token: token,
        })
      );

      toast.success("Успешный вход!");
      // ...existing code...
    } catch (err) {
      // <-- уберите : any
      console.error(err);
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        err.response !== null &&
        "data" in err.response
      ) {
        toast.error(
          `Ошибка входа: ${JSON.stringify(
            (err.response as { data?: unknown }).data
          )}`
        );
      } else {
        toast.error("Ошибка входа");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Введите имя пользователя и пароль");
      return;
    }
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
          disabled={loading}
          autoFocus
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
};

export default Login;
