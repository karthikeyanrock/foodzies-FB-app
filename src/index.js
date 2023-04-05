import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppContext from "./context";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-beuiynmo.eu.auth0.com"
    clientId="DwkthASJQvSg8rvho79MO5V7pGex1zE3"
    redirectUri={window.location.origin}
  >
    <AppContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContext>
  </Auth0Provider>
);
