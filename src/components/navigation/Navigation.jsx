import React from 'react';
import { Nav } from 'react-bootstrap';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import store from '../../redux/store';
import { setCurrentDistrict } from '../../redux/index';

const Navigation = ({ currentDistrict, districtNames }) => {
  const { t } = useTranslation();

  const getItem = (name, key) => {
    const isActive = name === currentDistrict;
    const textColor = cn({
      'text-white': !isActive,
      'text-dark': isActive,
    });
    const handlerClick = (newCurrentName) => {
      store.dispatch(setCurrentDistrict(newCurrentName));
    };
    return (
      <Nav.Item key={key}>
        <Nav.Link
          id={name}
          type="button"
          onClick={() => handlerClick(name)}
          className={textColor}
          active={isActive}
        >
          {t(`districtNames.${name}`)}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <Nav fill variant="tabs" className="mt-3">
      {districtNames.map((name, idx) => getItem(name, idx))}
    </Nav>
  );
};

export default Navigation;
