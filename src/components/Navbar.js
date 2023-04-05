import React, { useContext } from "react";
import ResponsiveAppBar from "./materialUI/ResponsiveAppBar";
import { MyContext } from "../context";

const Navbar = () => {
  const { currentUser } = useContext(MyContext);

  const pages = !currentUser // Navbar config based on the user state
    ? ["Home", "Categories", "Login"]
    : ["Home", "Categories", "Favorites", "Log Out"];
  const mode = ["Light mode", "Dark mode"];

  return <ResponsiveAppBar color={"secondary"} pages={pages} mode={mode} />;
};

export default Navbar;
