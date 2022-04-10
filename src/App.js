import React from "react";
import Home from './components/Seminar/Home'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import HomeME from "./components/SeminarME/HomeME";



const App = () => {
  return (
    
     <BrowserRouter basename="/">
     <Routes>
       <Route path="/" element={<Home />} />
       <Route  path="/ME/" element={<HomeME />} />
     </Routes>
   </BrowserRouter>
  );
};

export default App;
