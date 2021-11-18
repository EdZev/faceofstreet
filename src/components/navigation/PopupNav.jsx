import React, { useEffect, useState } from 'react';
import { Navbar } from 'react-bootstrap';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import SandwichNav from './SandwichNav.jsx';
import FullNav from './FullNav.jsx';

const PopupNav = () => {
  const { currentDistrict, districtNames } = useSelector((state) => state);

  const [navVisible, setNavVisible] = useState(false);
  const classNameNav = cn('container', 'popup-nav', 'border-bottom', {
    'popup-nav-visible': navVisible,
  });

  const isMobileNav = window.screen.width <= 770;

  useEffect(() => {
    const containerPreview = document.getElementById('container-preview');
    const handlerScroll = () => {
      const position = containerPreview.getBoundingClientRect();
      const isVisible = position.y < 0;
      setNavVisible(isVisible);
    };
    document.addEventListener('scroll', handlerScroll, false);
    return () => document.removeEventListener('scroll', handlerScroll, false);
  }, []);

  return (
    <Navbar variant="dark" className={classNameNav} expand={!isMobileNav}>
      {!isMobileNav && (
        <FullNav
          currentDistrict={currentDistrict}
          districtNames={districtNames}
        />
      )}
      {isMobileNav && (
        <SandwichNav
          currentDistrict={currentDistrict}
          districtNames={districtNames}
        />
      )}
    </Navbar>
  );
};

export default PopupNav;
