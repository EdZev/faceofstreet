import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Nav,
  Container,
  CloseButton,
  Offcanvas,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { uniqueId } from 'lodash';
import ItemNav from './ItemNav.jsx';
import NavbarBrand from './NavbarBrand.jsx';

const SandwichNav = ({
  districtNames,
  currentDistrict,
}) => {
  const { t } = useTranslation();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  useEffect(() => {
    const componentHtml = document.querySelector('html');
    componentHtml.scrollIntoView();
  }, [showOffcanvas]);
  return (
    <Container fluid>
      <NavbarBrand />
      <Navbar.Text>{t(`districtNames.${currentDistrict}`)}</Navbar.Text>
      <Navbar.Toggle
        aria-controls="offcanvasNavbar"
        onClick={() => setShowOffcanvas(true)}
      />
      <Navbar.Offcanvas
        show={showOffcanvas}
        className="hamburger"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        placement="end"
      >
        <Offcanvas.Header>
          <Offcanvas.Title id="offcanvasNavbarLabel">
            <img
              alt="logo"
              src="../images/favicon1.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          </Offcanvas.Title>
          <CloseButton variant="white" onClick={() => setShowOffcanvas(false)} />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            {districtNames.map((name) => (
              <ItemNav
                key={uniqueId()}
                currentDistrict={currentDistrict}
                distrintName={name}
                setShowOffcanvas={setShowOffcanvas}
                mobileNav
              />
            ))}
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Container>
  );
};

export default SandwichNav;
