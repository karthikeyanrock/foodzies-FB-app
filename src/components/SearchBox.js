import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import SearchLog from "./materialUI/search";
import { MyContext } from "../context";
import axios from "axios";
import { API } from "../api";

const SearchBox = () => {
  const [text, setText] = useState("");
  const { setDishes } = useContext(MyContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`${API}/search.php?s=${text}`)
      .then(({ data }) => setDishes(data.meals))
      .catch((err) => console.log(err));
  };
  return (
    <form onSubmit={handleSubmit} className="searchBox">
      <SearchLog text={text} setText={setText} />
      <Button type="submit" color="secondary" variant="contained">
        Search
      </Button>
    </form>
  );
};

export default SearchBox;
