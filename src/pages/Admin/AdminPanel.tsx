import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./AdminPanel.scss";

const AdminPanel = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  // Защита роута админки
  useEffect(() => {
    if (!currentUser?.auth_token) {
      navigate("/login");
      toast.error("Необходимо авторизоваться");
      return;
    }
  }, [currentUser, navigate]);

  const [newRecipe, setNewRecipe] = useState<{
    title: string;
    description: string;
    prep_time: number;
    difficulty: string;
    image: string | null;
    servings: number;
    steps: string;
    is_featured: boolean;
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
    vitamins: string;
    minerals: string;
    author: number | null;
    category: number;
    ingredients: string;
  }>({
    title: "",
    description: "",
    prep_time: 0,
    difficulty: "easy",
    image: null,
    servings: 0,
    steps: "",
    is_featured: false,
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrates: 0,
    vitamins: "",
    minerals: "",
    author: currentUser?.id || null,
    category: 0,
    ingredients: "",
  });

  // Обновление автора при изменении currentUser
  useEffect(() => {
    setNewRecipe((prev) => ({
      ...prev,
      author: currentUser?.id || null,
    }));
  }, [currentUser]);

  const difficulties = ["easy", "medium", "hard"];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewRecipe((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const requiredFields = {
      title: "Название",
      description: "Описание",
      prep_time: "Время приготовления",
      servings: "Количество порций",
      steps: "Шаги приготовления",
      category: "Категория",
      ingredients: "Ингредиенты",
    };

    const emptyFields = Object.entries(requiredFields).filter(
      ([key, _]) => !newRecipe[key as keyof typeof newRecipe]
    );

    if (emptyFields.length > 0) {
      toast.error(
        `Заполните обязательные поля: ${emptyFields
          .map(([_, label]) => label)
          .join(", ")}`
      );
      return false;
    }

    if (!currentUser?.id) {
      toast.error("Необходимо авторизоваться");
      return false;
    }

    return true;
  };

  const submitRecipe = async () => {
    if (!validateForm()) return;

    try {
      const recipeData = {
        ...newRecipe,
        prep_time: Number(newRecipe.prep_time),
        servings: Number(newRecipe.servings),
        calories: newRecipe.calories || 0,
        protein: newRecipe.protein || 0,
        fat: newRecipe.fat || 0,
        carbohydrates: newRecipe.carbohydrates || 0,
        author: currentUser.id,
      };

      await axios.post(
        "http://51.20.52.136/ru/recipe",
        recipeData,
        {
          headers: {
            Authorization: `Token ${currentUser.auth_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Рецепт успешно добавлен!");

      // Сброс формы
      setNewRecipe({
        title: "",
        description: "",
        prep_time: 0,
        difficulty: "easy",
        image: null,
        servings: 0,
        steps: "",
        is_featured: false,
        calories: 0,
        protein: 0,
        fat: 0,
        carbohydrates: 0,
        vitamins: "",
        minerals: "",
        author: currentUser.id,
        category: 0,
        ingredients: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при добавлении рецепта");
    }
  };

  return (
    <div className="admin-panel">
      <h1>Добавить рецепт</h1>

      <input
        type="text"
        placeholder="Название *"
        value={newRecipe.title}
        onChange={(e) =>
          setNewRecipe((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <textarea
        placeholder="Описание *"
        value={newRecipe.description}
        onChange={(e) =>
          setNewRecipe((prev) => ({ ...prev, description: e.target.value }))
        }
      />
      <input
        type="number"
        min="1"
        placeholder="Время приготовления (мин) *"
        value={newRecipe.prep_time || ""}
        onChange={(e) =>
          setNewRecipe((prev) => ({ ...prev, prep_time: Number(e.target.value) }))
        }
      />

      <select
        value={newRecipe.difficulty}
        onChange={(e) =>
          setNewRecipe((prev) => ({ ...prev, difficulty: e.target.value }))
        }
      >
        {difficulties.map((level) => (
          <option key={level} value={level}>
            {level === "easy"
              ? "Легко"
              : level === "medium"
              ? "Средне"
              : "Сложно"}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {newRecipe.image && (
        <img
          src={newRecipe.image}
          alt="Preview"
          style={{
            width: "200px",
            marginTop: "10px",
            borderRadius: "8px",
          }}
        />
      )}

      <input
        type="number"
        min="1"
        placeholder="Количество порций *"
        value={newRecipe.servings || ""}
        onChange={(e) =>
          setNewRecipe((prev) => ({ ...prev, servings: Number(e.target.value) }))
        }
      />

      <textarea
        placeholder="Шаги приготовления *"
        value={newRecipe.steps}
        onChange={(e) => setNewRecipe((prev) => ({ ...prev, steps: e.target.value }))}
      />

      <label>
        <input
          type="checkbox"
          checked={newRecipe.is_featured}
          onChange={() =>
            setNewRecipe((prev) => ({
              ...prev,
              is_featured: !prev.is_featured,
            }))
          }
        />
        Рекомендуемый рецепт
      </label>

      <input
        type="number"
        placeholder="Калории"
        value={newRecipe.calories || ""}
        onChange={(e) =>
          setNewRecipe((prev) => ({ ...prev, calories: Number(e.target.value) }))
        }
      />
      <input
        type="number"
        step="0.1"
        placeholder="Белки"
        value={newRecipe.protein || ""}
        onChange={(e) =>
          setNewRecipe((prev) => ({ ...prev, protein: Number(e.target.value) }))
        }
      />
      <input
        type="number"
        step="0.1"
        placeholder="Жиры"
        value={newRecipe.fat || ""}
        onChange={(e) =>
          setNewRecipe((prev) => ({ ...prev, fat: Number(e.target.value) }))
        }
      />
      <input
        type="number"
        step="0.1"
        placeholder="Углеводы"
        value={newRecipe.carbohydrates || ""}
        onChange={(e) =>
          setNewRecipe((prev) => ({ ...prev, carbohydrates: Number(e.target.value) }))
        }
      />
      <input
        type="text"
        placeholder="Витамины"
        value={newRecipe.vitamins}
        onChange={(e) =>
          setNewRecipe((prev) => ({ ...prev, vitamins: e.target.value }))
        }
      />
      <input
        type="text"
        placeholder="Минералы"
        value={newRecipe.minerals}
        onChange={(e) =>
          setNewRecipe((prev) => ({ ...prev, minerals: e.target.value }))
        }
      />
      <input
        type="number"
        placeholder="ID категории *"
        value={newRecipe.category || ""}
        onChange={(e) =>
          setNewRecipe((prev) => ({ ...prev, category: Number(e.target.value) }))
        }
      />

      <div>
        <textarea
          placeholder="Ингредиенты *"
          value={newRecipe.ingredients}
          onChange={(e) =>
            setNewRecipe((prev) => ({ ...prev, ingredients: e.target.value }))
          }
        />
      </div>
      <button onClick={submitRecipe}>Добавить рецепт</button>
      <ToastContainer />
    </div>
  );
};

export default AdminPanel;
