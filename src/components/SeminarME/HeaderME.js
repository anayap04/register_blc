import React from "react";
import logo from '../../assets/img/logoME.png';
import './headerME.css'
import { useScreenClass } from "react-grid-system";
import { formatMsg } from "../../utils/formatMsg";

const Header = () => {
  const screenClass = useScreenClass();
  const isLageSize = ["lg", "xl", "xxl"].includes(screenClass)
  const widthTitle = isLageSize ? '60%' : '95%';


  return (
    <div className="header-container">
      <img src={logo} alt="logo" class="center-title" style={{width: widthTitle}} />
      <p>{formatMsg('titleME')}</p>
    </div>
  )
};

export default Header;
