import { AppContext } from "contexts/context";
import React, { Fragment, FC, useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./navigation.styles.css";

const NavigationBar: FC = () => {
  const { state } = useContext(AppContext);
  return (
    <Fragment>
      <div className="navigation">
        <div className="nav-links-container">
        {state.selectedPhoto && (
          <div className="nav-link currentItem">
            Current PhotoID: {state.selectedPhoto.id}
          </div>
        )}
          <NavLink
            to={"/home"}
            className={({ isActive }) =>
              isActive ? "nav-link--active" : "nav-link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/about-us"}
            className={({ isActive }) =>
              isActive ? "nav-link--active" : "nav-link"
            }
          >
            About
          </NavLink>
          <NavLink
            to={"/submit"}
            className={({ isActive }) =>
              isActive ? "nav-link--active" : "nav-link"
            }
          >
            Submit
          </NavLink>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default NavigationBar;
