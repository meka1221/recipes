import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// Update the import path to the correct location of your ProductContext
// import { ProductContext } from "../ProductContext"; // adjust the path as needed
import { ProductContext } from "../context/"; // update the path as needed

// Define the context type according to your context's value shape
interface ProductContextType {
  setModal: (value: boolean) => void;
  setFavorites: (favorites: any) => void;
}
interface RegisterProps {
  setModals?: (value: boolean) => void;
}
const Login: React.FC<RegisterProps> = ({ setModals }) => {
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
      const response = await axios.post("http://51.20.52.136/ru/login/", {
        username,
        password,
      });
      const token = response.data;
      console.log("Токен:", token);

      localStorage.setItem("authToken", JSON.stringify(token));

      if (setModal) setModal(false);

      toast.success("Вы успешно вошли в аккаунт!");
      setModals?.(false); // Закрываем модальное окно
      // можно здесь также сбросить поля или получить избранное
    } catch (err) {
      setError("Неправильный логин или пароль");
      toast.error("Неправильный логин или пароль");
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
