import React from "react";
import logo from '../../assets/img/logo.png';
import titulo from '../../assets/img/titulo.png';
import logoBR from '../../assets/img/logo_br.png';
import tituloBR from '../../assets/img/titulo_br.png';
import './header.css'
import { useScreenClass } from "react-grid-system";
const locale = navigator.language;

const Header = () => {
  const screenClass = useScreenClass();
  const isLageSize = ["lg", "xl", "xxl"].includes(screenClass)
  const widthSubtitle = isLageSize ? '45%' : '40%';
  const widthTitle = isLageSize ? '60%' : '95%';
  const logoImg =  locale === "pt" ? logoBR : logo
  const tituloImg =  locale === "pt" ? tituloBR : titulo


  return (
    <div className="header-container">
      <img src={logoImg} alt="logo" className="center" style={{width: widthSubtitle}} />
      <img src={tituloImg} alt="titulo" className="center-title" style={{width: widthTitle}} />
    </div>
  )
};

export default Header;
