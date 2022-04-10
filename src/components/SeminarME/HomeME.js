
import "./HomeME.css";
import Header from "./HeaderME";
import Form from "./FormME";

const HomeME = () => {
  console.log(window.innerHeight )
  return(
    <div style={{minHeight: window.innerHeight }} className="app-container-me">
      <Header />
      <Form />
    </div>
  )
}

export default HomeME;