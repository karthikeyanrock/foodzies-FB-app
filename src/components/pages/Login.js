import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { MyContext } from "../../context";
import { useAuth0 } from "@auth0/auth0-react";
import GoogleButton from "react-google-button";

export default function SignInSide() {
  const { loginWithRedirect } = useAuth0(); // Getting the user details and login method from Auth0

  const { mode } = useContext(MyContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    loginWithRedirect();
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170)",
          backgroundRepeat: "no-repeat",
          backgroundColor: "lightGrey",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "auto",
            borderBottom: 2,
            borderColor: "purple",
            padding: "10px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register/SignUp
          </Typography>
          <GoogleButton
            className="GoogleButton"
            type={mode === "light" ? "dark" : "light"}
            onClick={handleSubmit}
          />
        </Box>
        <div className="quotes">
          <div>
            <Typography className="quote" component="p" variant="i">
              “See that's what people don't get about food. It's never the food,
              it's the love that goes into making it. That's what's important.”
            </Typography>
          </div>
          <div className="quoteCreater" item>
            <Typography component="h4" variant="p">
              ― Sarah Strohmeyer, Sweet Love
            </Typography>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
