import React from 'react';
import { Nav } from 'react-bootstrap';
import { uniqueId } from 'lodash';
import ItemNav from './ItemNav.jsx';
import NavbarBrand from './NavbarBrand.jsx';

const FullNav = ({ districtNames, currentDistrict }) => (
  <>
    <NavbarBrand />
    <Nav className="mr-auto justify-content-around w-100">
      {districtNames.map((name) => (
        <ItemNav
          key={uniqueId()}
          currentDistrict={currentDistrict}
          distrintName={name}
          setShowOffcanvas={() => {}}
          mobileNav={false}
        />
      ))}
    </Nav>
  </>
);

export default FullNav;
