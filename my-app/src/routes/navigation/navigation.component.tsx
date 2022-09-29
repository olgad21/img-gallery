import { Fragment } from "react";
import { NavLink, Outlet } from "react-router-dom";
import './navigation.styles.css';

const NavigationBar = () => {
  return (
    <Fragment>
      <div className='navigation'>
        <div className='nav-links-container'>
          <NavLink 
            to={'/home'}
            className={({ isActive }) =>
              isActive ? 'nav-link--active' : 'nav-link'
            }>
            Home
          </NavLink>
          <NavLink 
            to={'/about-us'} 
            className={({ isActive }) =>
              isActive ? 'nav-link--active' : 'nav-link'
            }>
            About
          </NavLink>
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default NavigationBar;