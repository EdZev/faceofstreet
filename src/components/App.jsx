import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PopupNav from './navigation/PopupNav.jsx';
import Header from './Header.jsx';
import Navigation from './navigation/Navigation.jsx';
import SandwichNav from './navigation/SandwichNav.jsx';
import Page from './Page.jsx';
import Footer from './Footer.jsx';

const App = () => {
  const { currentDistrict, districtNames } = useSelector((state) => state);
  const isMobileNav = window.screen.width <= 770;

  return (
    <Container className="px-0">
      <PopupNav />
      <Container>
        <Header />
        {!isMobileNav && (
          <Navigation districtNames={districtNames} currentDistrict={currentDistrict} />
        )}
        {isMobileNav && (
          <Navbar variant="dark" className="container border-bottom" expand={!isMobileNav}>
            <SandwichNav districtNames={districtNames} currentDistrict={currentDistrict} />
          </Navbar>
        )}
        <Page />
        <Footer />
      </Container>
    </Container>
  );
};

export default App;
