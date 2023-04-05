import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="notFound">
      <div className="error">
        <h1>OOPS!</h1>
        <h2>404 - This Page Can't be Found</h2>
      </div>
      <Button
        onClick={() => navigate("/")}
        type="submit"
        color="secondary"
        variant="contained"
      >
        Go to HomePage
      </Button>
    </div>
  );
};

export default NotFound;
