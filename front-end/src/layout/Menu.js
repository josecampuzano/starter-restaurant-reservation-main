import React from "react";
import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <React.Fragment>
    <nav className="navbar navbar-dark align-items-start p-0">
      <div className="container-fluid d-flex flex-column p-0">
        <Link
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          to="/"
        >
          <div className="sidebar-brand-text mx-3">
            <h3 className="p-2 menu-text">Periodic Tables</h3>
          </div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <ul className="nav navbar-nav text-light" id="accordionSidebar">
          <li className="row">
            <div className="nav-item">
              <Link className="nav-link mr-2" to="/dashboard">
                <span className="oi oi-dashboard menu-text" />
                &nbsp;Dashboard
              </Link>
            </div>
          
            <div className="nav-item">
              <Link className="nav-link ml-5" to="/search">
                <span className="oi oi-magnifying-glass menu-text" />
                &nbsp;Search
              </Link>
            </div>
          </li>
          
          <li className="row">
            <div className="nav-item">
              <Link className="nav-link" to="/reservations/new">
                <span className="oi oi-plus menu-text" />
                &nbsp;New Reservation
              </Link>
            </div>
            <div className="nav-item">
              <Link className="nav-link ml-3" to="/tables/new">
                <span className="oi oi-layers menu-text" />
                &nbsp;New Table
              </Link>
            </div>
          </li>
        </ul>
        <div className="text-center d-none d-md-inline">
          <button
            className="btn rounded-circle border-0"
            id="sidebarToggle"
            type="button"
          />
        </div>
      </div>
    </nav>
    </React.Fragment>
  );
}

export default Menu;