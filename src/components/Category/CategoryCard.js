import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DishCard from "../DishCard";
import Typography from "@mui/material/Typography";
import { API } from "../../api";

const CategoryView = () => {
  const [countryDishes, setCountryDishes] = useState([]);
  const { name } = useParams(); // Getting the country name from URL
  useEffect(() => {
    axios
      .get(`${API}/filter.php?a=${name}`) // Making a request for the dishes of that country
      .then(({ data }) => setCountryDishes(data.meals));
  });
  if (!countryDishes) return <div>Loading...</div>; // If the dishes not yet loaded it will be returning this
  return (
    // Once dishes are loaded
    <Container minWidth="md">
      <Typography
        style={{ padding: "10px" }}
        gutterBottom
        variant="h3"
        component="h1"
      >
        <u>{name} Dishes</u>
      </Typography>
      <Grid container spacing={2}>
        {countryDishes.map((dish) => {
          // Mapping the dishes each with a DishCard component passing the details through props
          return (
            <Grid item xs={12} sm={6} md={4} key={dish.idMeal}>
              <DishCard key={dish.idMeal} dish={dish} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default CategoryView;
