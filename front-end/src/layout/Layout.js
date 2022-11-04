import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import FoodBanner from "../assets/FoodBanner.png"
import "./Layout.css";
import Footer from "./Footer";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <React.Fragment>
      <img 
      src={FoodBanner}
      alt={"Best Service in Town Banner with a bowl of food"}
      className="img-fluid mx-auto d-block"
      ></img>
      <div>
          <div className="col side-bar">
            <Menu />
          </div>
          <div className="col">
            <Routes />
          </div>
        </div>
      <div>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default Layout;
