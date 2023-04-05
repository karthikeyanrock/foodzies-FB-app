import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../../context";
import { useNavigate } from "react-router-dom";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Button from "@mui/material/Button";
import { DB_API } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Favorites = () => {
  const { currentUser, setCurrentUser, mode } = useContext(MyContext);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      // If user state is not available
      const token = localStorage.getItem("token"); //Checking for JWT Token
      if (!token) return;
      const auth = `Bearer ${token}`; // If available changing it to Bearer format
      axios
        .post(`${DB_API}/auto-login`, {}, { headers: { Authorization: auth } }) // Getting the user logged in automatically based on JWT token expiration
        .then(({ data }) => {
          setCurrentUser(data);
          setFavorites(data.favorites);
        })
        .catch((err) => console.log(err));
    }
    if (currentUser) setFavorites(currentUser.favorites); // if user state is available
    // eslint-disable-next-line
  }, []);

  if (!currentUser) return <div>Loading...</div>;
  else {
    if (!favorites.length)
      // If no favorites are available
      return (
        <Container minWidth="md">
          <Typography component="h1" variant="h5">
            You Don't have any favorites'
          </Typography>
          <Typography component="h3" variant="h5">
            Please add favorites to your favorites
          </Typography>
        </Container>
      );

    return (
      <Container>
        <Box sx={{ width: "100%", height: "100vh" }}>
          <Box sx={{ width: "100%", borderBottom: 2, borderColor: "purple" }}>
            <Tab
              className={mode === "dark" ? "dark" : ""}
              label="Here's your favorite recipes"
            />
          </Box>
          {favorites.map((each, i) => {
            return (
              <ListItemButton
                onClick={() => navigate(`/receipe/view/${each.recipeId}`)}
                key={i}
              >
                <ListItemIcon>
                  <FlagCircleIcon />
                </ListItemIcon>
                <ListItemText
                  className={mode === "dark" ? "dark" : ""}
                  primary={`${each.recipeName}`}
                />
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    const token = localStorage.getItem("token");

                    if (!token) return;
                    const auth = `Bearer ${token}`;
                    axios
                      .post(
                        `${DB_API}/delete-favorites`,
                        {
                          recipeId: each.recipeId,
                        },
                        { headers: { Authorization: auth } }
                      )
                      .then(({ data }) => {
                        setCurrentUser(data);
                        setFavorites(data.favorites);
                        toast.warn("Recipe Removed from Favorites");
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  <DeleteIcon />
                  DELETE
                </Button>
                <ToastContainer />
              </ListItemButton>
            );
          })}
        </Box>
      </Container>
    );
  }
};

export default Favorites;
