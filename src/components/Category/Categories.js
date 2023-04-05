import React, { useContext, useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
import { MyContext } from "../../context";

const Categories = () => {
  const navigate = useNavigate();
  const { mode } = useContext(MyContext); // Getting the mode state from context
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/list.php?a=list`) // Getting all the categories from 3rd Party API
      .then(({ data }) => setCategory(data.meals))
      .catch((err) => console.log(err));
  });
  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ width: "100%", borderBottom: 2, borderColor: "purple" }}>
          <Tab
            className={mode === "dark" ? "dark" : ""}
            label="Browse By Country"
          />
        </Box>
        {category.map((each, i) => {
          return (
            <ListItemButton
              onClick={() => navigate(`/receipe/category/${each.strArea}`)} //Navigating the respective category page
              key={i}
            >
              <ListItemIcon>
                <FlagCircleIcon />
              </ListItemIcon>
              <ListItemText
                className={mode === "dark" ? "dark" : ""}
                primary={`${each.strArea}`}
              />
            </ListItemButton>
          );
        })}
      </Box>
    </Container>
  );
};

export default Categories;
