import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { MyContext } from "../../context";
import axios from "axios";
import { DB_API } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({ dish }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { currentUser, setCurrentUser } = useContext(MyContext);

  const handleClose = (e) => {
    if (e.target.textContent === "Add to Favorites") {
      const token = localStorage.getItem("token"); //Getting the JWT token from localStorage
      if (!token) return; // if not found do not proceed further Guard clause
      const auth = `Bearer ${token}`;
      axios
        .post(
          `${DB_API}/add-favorites`, //POST request
          {
            recipeId: dish.idMeal, // data to be posted
            recipeName: dish.strMeal,
          },
          {
            headers: {
              //Header method
              Authorization: auth,
            },
          }
        )
        .then(({ data }) => {
          // Once adding is success, resetting the user state
          toast.success("Recipe Added to Favorites");
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
      setOpen(false);
    } else if (e.target.textContent === "Watch Video") {
      navigate(`/receipe/view/${dish.idMeal}`); // Navigating to the watch page based on meal ID
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Why not try it?
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle color="black" id="alert-dialog-title">
          {`Instructions to be Followed for ${dish.strMeal}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText component="div" id="alert-dialog-description">
            {/* eslint-disable-next-line */}
            {dish.strInstructions.split(".").map((line, i) => {
              const instruction = line === "" ? null : line.trimStart();
              if (instruction !== null) {
                return (
                  <Typography key={i} gutterBottom variant="h6" component="p">
                    {`${i + 1}: ${instruction} \n`}
                  </Typography>
                );
              }
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {currentUser && (
            <Button onClick={handleClose}>Add to Favorites</Button>
          )}
          <ToastContainer />
          <Button onClick={handleClose} autoFocus>
            Watch Video
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
