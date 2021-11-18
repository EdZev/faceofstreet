import React from 'react';
import {
  Row,
  Col,
  Image,
  Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import routes from '../routes';

const Header = () => {
  const { t } = useTranslation();
  return (
    <Row className="mt-4">
      <Col lg>
        <Nav.Link href="/" className="">
          <Image src={routes.imgPath('logo2.png')} fluid />
        </Nav.Link>
      </Col>
      <Col lg className="px-4">
        <h1 className="align-text-bottom">{t('projectName')}</h1>
        <span className="align-text-bottom">{t('article')}</span>
      </Col>
    </Row>
  );
};

export default Header;
