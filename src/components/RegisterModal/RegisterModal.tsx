import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface RegisterProps {
  setModal?: (value: boolean) => void;
  setRegisterMode?: (value: boolean) => void;
}
const Register: React.FC<RegisterProps> = ({ setModal, setRegisterMode }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    bio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://51.20.52.136/ru/register/", formData);
      toast.success("Регистрация прошла успешно!");
      setTimeout(() => {
        setModal?.(false);
        setRegisterMode?.(false); // переключаем на логин
      }, 1500); // ждём, пока покажется toast
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при регистрации");
    }
  };

  return (
    <div className="register-form">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Имя пользователя"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="first_name"
          placeholder="Имя"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Фамилия"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="bio"
          placeholder="Биография"
          value={formData.bio}
          onChange={handleChange}
          required
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
