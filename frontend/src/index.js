import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./style/main.css";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      <AuthProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </AuthProvider>
    </CartProvider>
  </React.StrictMode>
);
