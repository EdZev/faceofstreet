import React from 'react';
import { Nav } from 'react-bootstrap';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import store from '../../redux/store';
import { setCurrentDistrict } from '../../redux/index';

const ItemNav = ({
  currentDistrict,
  distrintName,
  setShowOffcanvas,
  mobileNav,
}) => {
  const { t } = useTranslation();
  const isActive = currentDistrict === distrintName;
  const decorLink = cn({
    'text-start': mobileNav,
    'mobile-link': mobileNav,
    'text-center': !mobileNav,
    'border-bottom': isActive && mobileNav,
  });

  const handlerClick = (name) => {
    store.dispatch(setCurrentDistrict(name));
    setShowOffcanvas(false);
  };
  return (
    <Nav.Link
      className={decorLink}
      href="#"
      active={isActive}
      onClick={() => handlerClick(distrintName)}
    >
      {t(`districtNames.${distrintName}`)}
    </Nav.Link>
  );
};

export default ItemNav;
