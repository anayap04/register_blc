import React, { useState } from "react";
import logo from '../assets/img/logo.png';
import titulo from '../assets/img/titulo.png';
import './header.css'
import { useScreenClass } from "react-grid-system";

const Header = () => {
  const screenClass = useScreenClass();
  const isLageSize = ["lg", "xl", "xxl"].includes(screenClass)
  const widthSubtitle = isLageSize ? '45%' : '40%';
  const widthTitle = isLageSize ? '60%' : '95%';


  return (
    <div className="header-container">
      <img src={logo} alt="logo" class="center" style={{width: widthSubtitle}} />
      <img src={titulo} alt="titulo" class="center-title" style={{width: widthTitle}} />
    </div>
  )
};

export default Header;
