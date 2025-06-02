import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./AdminPanel.scss";

const AdminPanel = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const [newRecipe, setNewRecipe] = useState<{
    title: string;
    description: string;
    prep_time: number;
    difficulty: string;
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
    ingredients: string[];
  }>({
    title: "",
    description: "",
    prep_time: 0,
    difficulty: "easy",
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
    ingredients: [],
  });

  const [ingredientInput, setIngredientInput] = useState("");

  useEffect(() => {
    if (!currentUser) {
      toast.error("Пожалуйста, войдите в систему");
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const addIngredient = () => {
    const trimmed = ingredientInput.trim();
    if (trimmed && !newRecipe.ingredients.includes(trimmed)) {
      setNewRecipe({
        ...newRecipe,
        ingredients: [...newRecipe.ingredients],
      });
      setIngredientInput("");
    } else {
      toast.warn("Пустой или уже добавленный ингредиент");
    }
  };

  const removeIngredient = (item: string) => {
    setNewRecipe({
      ...newRecipe,
      ingredients: newRecipe.ingredients.filter((ing) => ing !== item),
    });
  };

  const difficulties = ["easy", "medium", "hard"];

  const submitRecipe = async () => {
    // if (
    //   !newRecipe.title.trim() ||
    //   !newRecipe.description.trim() ||
    //   !newRecipe.prep_time ||
    //   !newRecipe.difficulty ||
    //   !newRecipe.servings ||
    //   !newRecipe.steps.trim() ||
    //   !newRecipe.author ||
    //   !newRecipe.category ||
    //   newRecipe.ingredients.length === 0
    // ) {
    //   toast.error("Пожалуйста, заполните все обязательные поля!");
    //   return;
    // }

    try {
      await axios.post(
        "http://51.20.52.136/ru/",
        {
          ...newRecipe,
          prep_time: Number(newRecipe.prep_time),
          servings: Number(newRecipe.servings),
          calories: newRecipe.calories ? Number(newRecipe.calories) : null,
          protein: newRecipe.protein ? Number(newRecipe.protein) : null,
          fat: newRecipe.fat ? Number(newRecipe.fat) : null,
          carbohydrates: newRecipe.carbohydrates
            ? Number(newRecipe.carbohydrates)
            : null,
        },
        {
          headers: {
            Authorization: `Token ${currentUser?.auth_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Рецепт успешно добавлен!");
      setNewRecipe({
        title: "",
        description: "",
        prep_time: 0,
        difficulty: "easy",
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
        ingredients: [],
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
        onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
      />
      <textarea
        placeholder="Описание *"
        value={newRecipe.description}
        onChange={(e) =>
          setNewRecipe({ ...newRecipe, description: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Время приготовления (мин) *"
        value={newRecipe.prep_time}
        onChange={(e) =>
          setNewRecipe({ ...newRecipe, prep_time: Number(e.target.value) })
        }
      />

      <select
        value={newRecipe.difficulty}
        onChange={(e) =>
          setNewRecipe({ ...newRecipe, difficulty: e.target.value })
        }
      >
        {difficulties.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Количество порций *"
        value={newRecipe.servings}
        onChange={(e) =>
          setNewRecipe({ ...newRecipe, servings: Number(e.target.value) })
        }
      />

      <textarea
        placeholder="Шаги приготовления *"
        value={newRecipe.steps}
        onChange={(e) => setNewRecipe({ ...newRecipe, steps: e.target.value })}
      />

      <label>
        <input
          type="checkbox"
          checked={newRecipe.is_featured}
          onChange={() =>
            setNewRecipe({ ...newRecipe, is_featured: !newRecipe.is_featured })
          }
        />
        Рекомендуемый рецепт
      </label>

      <input
        type="number"
        placeholder="Калории"
        value={newRecipe.calories}
        onChange={(e) =>
          setNewRecipe({ ...newRecipe, calories: Number(e.target.value) })
        }
      />
      <input
        type="number"
        step="0.1"
        placeholder="Белки"
        value={newRecipe.protein}
        onChange={(e) =>
          setNewRecipe({ ...newRecipe, protein: Number(e.target.value) })
        }
      />
      <input
        type="number"
        step="0.1"
        placeholder="Жиры"
        value={newRecipe.fat}
        onChange={(e) =>
          setNewRecipe({ ...newRecipe, fat: Number(e.target.value) })
        }
      />
      <input
        type="number"
        step="0.1"
        placeholder="Углеводы"
        value={newRecipe.carbohydrates}
        onChange={(e) =>
          setNewRecipe({ ...newRecipe, carbohydrates: Number(e.target.value) })
        }
      />
      <input
        type="text"
        placeholder="Витамины"
        value={newRecipe.vitamins}
        onChange={(e) =>
          setNewRecipe({ ...newRecipe, vitamins: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Минералы"
        value={newRecipe.minerals}
        onChange={(e) =>
          setNewRecipe({ ...newRecipe, minerals: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="ID категории *"
        value={newRecipe.category}
        onChange={(e) =>
          setNewRecipe({ ...newRecipe, category: Number(e.target.value) })
        }
      />

      <div>
        <input
          type="text"
          placeholder="Ингредиент"
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
        />
        <button type="button" onClick={addIngredient}>
          Добавить ингредиент
        </button>
        <ul>
          {newRecipe.ingredients.map((item) => (
            <li key={item}>
              {item}{" "}
              <button onClick={() => removeIngredient(item)}>удалить</button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={submitRecipe}>Добавить рецепт</button>
      <ToastContainer />
    </div>
  );
};

export default AdminPanel;
