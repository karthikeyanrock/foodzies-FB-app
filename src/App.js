import React, { useContext, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import ViewDish from "./components/ViewDish";
import Categories from "./components/Category/Categories";
import CategoryView from "./components/Category/CategoryCard";
import Login from "./components/pages/Login";
import NotFound from "./components/pages/pageNotFound";
import Favorites from "./components/pages/Favorites";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MyContext } from "./context";
import axios from "axios";
import { DB_API } from "./api";

const App = () => {
  const { mode, setCurrentUser, currentUser } = useContext(MyContext);

  useEffect(() => {
    // Checking whether there is JWT token available
    const token = localStorage.getItem("token");
    if (!token) return;
    const auth = `Bearer ${token}`; //If available logging the user in automatically
    axios
      .post(`${DB_API}/auto-login`, {}, { headers: { Authorization: auth } })
      .then(({ data }) => setCurrentUser(data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={`${mode === "dark" ? "App dark" : "App"}`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/receipe/view/:id" element={<ViewDish />} />
          <Route path="/receipe/category/:name" element={<CategoryView />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/favorites"
            element={
              currentUser ? <Favorites /> : <Navigate replace to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
