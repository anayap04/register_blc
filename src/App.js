import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Form from "./components/Form";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <Form />
    </div>
  );
};

export default App;
