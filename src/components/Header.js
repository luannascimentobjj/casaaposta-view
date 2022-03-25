import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles.css';

const Header = () => {
  return (
    <header>
      <h1>Casa Aposta App </h1>
      <hr />
      <div className="links">
        <NavLink to="/" className="link" activeClassName="active" exact>
          Home
        </NavLink>
        <NavLink to="/add" className="link" activeClassName="active">
          See Odds
        </NavLink>
      </div>
    </header>
  );
};

export default Header;