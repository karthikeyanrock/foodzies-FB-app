import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Modal from "./materialUI/Modal";
import { useNavigate } from "react-router-dom";

const DishCard = ({ dish }) => {
  //Receiving the dish details as prop
  const navigate = useNavigate();
  return (
    <Card className="dishCard" sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={`${dish.strMealThumb}`}
          alt={`${dish.strMeal}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {dish.strMeal}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="dishBtn">
        {dish.strInstructions ? (
          <Modal dish={dish} />
        ) : (
          <Button
            onClick={() => navigate(`/receipe/view/${dish.idMeal}`)}
            variant="contained"
          >
            Why not try it?
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default DishCard;
