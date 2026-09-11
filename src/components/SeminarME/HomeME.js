import "./HomeME.css";
import HeaderME from "./HeaderME";
import FormME from "./FormME";

const HomeME = () => {
  return (
    <div style={{ minHeight: window.innerHeight }} className="app-container-me">
      <div className="content-panel-me">
        <HeaderME />
        <FormME />
      </div>
    </div>
  );
};

export default HomeME;
