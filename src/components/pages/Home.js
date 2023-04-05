import React, { useContext, useEffect } from "react";
import SearchBox from "../SearchBox";
import Typography from "@mui/material/Typography";
import axios from "axios";
import DisplayDishes from "../DisplayDishes";
import { MyContext } from "../../context";
import { API } from "../../api";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const { dishes, setDishes } = useContext(MyContext);
  const randomLetter = () => String.fromCharCode(0 | (Math.random() * 15 + 97)); //Generates a random letter

  useEffect(() => {
    axios
      .get(`${API}/search.php?f=${randomLetter()}`) // Gets a random recipe each time the page gets reloaded
      .then(({ data }) => setDishes(data.meals))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="jumbotron">
        <Typography color="white" variant="h2" component="div" gutterBottom>
          Welcome !
        </Typography>
        <Typography color="white" variant="h3" gutterBottom component="div">
          Search for your favorite recipes here...
        </Typography>
        <SearchBox />
      </div>
      {dishes !== undefined ? <DisplayDishes dishes={dishes} /> : "Loading..."}
      <ToastContainer />
    </div>
  );
};

export default Home;
