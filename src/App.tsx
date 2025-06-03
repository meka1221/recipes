import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RootContext from "./components/context/RootContext";
import Home from "./pages/HomeWelcome";
import Header from "./components/Header/Header";
import Category from "./pages/Category";
import Blog from "./pages/Blog";
import Footer from "./components/Layout/Footer";
import Login from "./components/LoginModal/Login";
import About from "./pages/About";
import ScrollToTop from "./components/Ui/ScrollTop/ScrollTop";
import RecipePage from "./pages/RecipePage"; // добавим детальную страницу рецепта
import AdminPanel from "./pages/Admin/AdminPanel"; // добавим страницу админ-панели
import RegisterModal from "./components/RegisterModal/RegisterModal";
import RecipeList from "./components/RecipeCard/RecipeList";
import BlogPage from "./pages/BlogPage";

// добавим список рецептов
function App() {
  let routes = [
    {
      id: 1,
      link: "/",
      element: <Home />,
    },
    {
      id: 2,
      link: "/login",
      element: <Login />,
    },
    {
      id: 3,
      link: "/blog",
      element: <Blog />,
    },
    {
      id: 4,
      link: "/category/:categoryName",
      element: <Category />,
    },
    {
      id: 5,
      link: "/about",
      element: <About />,
    },
    {
      id: 6,
      link: "/recipe/:id", // маршрут для детального рецепта
      element: <RecipePage />,
    },
    {
      id: 7,
      link: "/admin",
      element: <AdminPanel />,
    },
    {
      id: 8,
      link: "/register",
      element: <RegisterModal />,
    },
    {
      id: 9,
      link: "/recipelist",
      element: <RecipeList />,
    },
    {
      id: 10,
      link: "/blog/:id", // маршрут для детального рецепта
      element: <BlogPage />,
    },
  ];

  return (
    <RootContext>
      <div className="App">
        <Header />
        <ScrollToTop />
        <Routes>
          {routes.map((el) => (
            <Route key={el.id} path={el.link} element={el.element} />
          ))}
        </Routes>
        <Footer />
      </div>
    </RootContext>
  );
}

export default App;
