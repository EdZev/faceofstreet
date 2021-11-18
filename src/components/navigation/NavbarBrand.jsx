import React from 'react';
import { Navbar } from 'react-bootstrap';

const NavbarBrand = () => (
  <>
    <Navbar.Brand href="/" className="mx-1">
      <img
        alt="logo"
        src="../images/favicon1.png"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />
    </Navbar.Brand>
  </>
);

export default NavbarBrand;
