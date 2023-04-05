import React from "react";
import DishCard from "./DishCard";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";

const DisplayDishes = ({ dishes }) => {
  // Getting the dishes from the home page as props
  if (!dishes)
    return (
      <div>
        <img
          src="https://gettingunstuck.gse.harvard.edu/static/img/strategy/strategyArtboard_7.png"
          alt="No Receipe Matching"
        />
      </div>
    );
  return (
    <Box className="dishes" sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {dishes.map((dish) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={dish.idMeal}>
              <DishCard key={dish.idMeal} dish={dish} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default DisplayDishes;
