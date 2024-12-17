import React, { useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <div className="app-container">
      {isAuthenticated ? <Home /> : <Login onLogin={handleLogin} />}
    </div>
  );
};

export default App;
