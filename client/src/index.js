// Importing Build-In Package
import React from "react";
import ReactDOM from "react-dom/client";

// Importing Custom Package
import App from "./App";

// Importing Style Package
import "./index.css";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);