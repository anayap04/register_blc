import logo from "../../assets/img/logo.png";
import titulo from "../../assets/img/titulo.png";
import logoBR from "../../assets/img/logo_br.png";
import tituloBR from "../../assets/img/titulo_br.png";
import "./header.css";
import { useIsLargeScreen } from "../../hooks/useIsLargeScreen";
import { useFormatMsgText } from "../../utils/formatMsg";

const locale = navigator.language;

const Header = () => {
  const isLargeSize = useIsLargeScreen();
  const logoAlt = useFormatMsgText("logoAlt");
  const tituloAlt = useFormatMsgText("tituloAlt");
  const widthSubtitle = isLargeSize ? "45%" : "40%";
  const widthTitle = isLargeSize ? "60%" : "95%";
  const logoImg = locale === "pt" ? logoBR : logo;
  const tituloImg = locale === "pt" ? tituloBR : titulo;

  return (
    <div className="header-container">
      <img src={logoImg} alt={logoAlt} className="center" style={{ width: widthSubtitle }} />
      <img src={tituloImg} alt={tituloAlt} className="center-title" style={{ width: widthTitle }} />
    </div>
  );
};

export default Header;
