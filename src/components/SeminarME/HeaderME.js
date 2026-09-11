import logo from "../../assets/img/logoME.png";
import "./headerME.css";
import { useIsLargeScreen } from "../../hooks/useIsLargeScreen";
import { formatMsg, useFormatMsgText } from "../../utils/formatMsg";

const HeaderME = () => {
  const isLargeSize = useIsLargeScreen();
  const logoAlt = useFormatMsgText("logoMEAlt");
  const widthTitle = isLargeSize ? "60%" : "95%";

  return (
    <div className="header-container">
      <img src={logo} alt={logoAlt} className="center-title" style={{ width: widthTitle }} />
      <p>{formatMsg("titleME")}</p>
    </div>
  );
};

export default HeaderME;
