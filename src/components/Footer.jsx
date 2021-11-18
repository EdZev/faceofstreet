import React from 'react';
import { Container, Button } from 'react-bootstrap';
import ls from 'store';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const handleReset = () => {
    ls.clearAll();
    window.location.reload();
  };
  return (
    <footer className="footer border-top py-3 mt-5">
      <Container className="container pl-1">
        <div className="d-flex p-0 bd-highlight justify-content-start footer-data">{t('authors.photos')}</div>
        <div className="d-flex p-0 bd-highlight justify-content-start footer-data">{t('authors.rsi')}</div>
        <div className="d-flex p-0 bd-highlight justify-content-start footer-data">
          e-mail:&emsp;
          <a href="mailto:repoldperm@gmail.com">
            repoldperm@gmail.com
          </a>
        </div>
        <div className="d-flex p-0 bd-highlight justify-content-start footer-data">
          created by&emsp;
          <a href="https://github.com/EdZev/faceofstreet">
            EdZev
          </a>
        </div>
        <Button variant="outline-light" className="mt-3" onClick={handleReset}>{t('reset')}</Button>
      </Container>
    </footer>
  );
};

export default Footer;
