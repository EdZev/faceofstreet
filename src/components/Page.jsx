import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Image,
} from 'react-bootstrap';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ModalImage from './ModalImage.jsx';

const renderModal = (modalInfo, hideModal) => {
  if (modalInfo.id === null) return null;
  return (<ModalImage modalInfo={modalInfo} hideModal={hideModal} />);
};

const Page = () => {
  const { t } = useTranslation();
  const [modalInfo, setModalInfo] = useState({ districtData: null, id: null });

  const { currentDistrict, districts } = useSelector((state) => state);
  const cards = districts[currentDistrict];

  useEffect(() => {
    const componentHtml = document.querySelector('html');
    componentHtml.scrollIntoView();
  }, [currentDistrict]);

  const hideModal = () => setModalInfo({ districtData: null, id: null });
  const showModal = (id) => setModalInfo({ districtData: cards, id });

  const getCard = ({ dataCard, viewed }, key) => {
    const { imgPathSmall, title } = dataCard;
    const titlePreviewLength = 21;
    const titlePreview = title.length > titlePreviewLength || title.length === 0 ? `${title.substr(0, titlePreviewLength)}${t('threeDots')}` : title;
    const classNamesContainerPreview = cn('preview', 'text-start', { viewed });
    return (
      <Col className="my-3 text-center" key={key}>
        <Container className={classNamesContainerPreview} onClick={() => showModal(key)}>
          <Image
            id={key}
            className=""
            src={imgPathSmall}
            alt={title}
            title={title}
            key={key}
            rounded
          />
        </Container>
        <div className="hint text-left pl-2"><span className="comment" data-descr={title}>{titlePreview}</span></div>
      </Col>
    );
  };

  return (
    <Container className="my-3 p-0" id="container-preview">
      <Row className="justify-content-md-center">
        {cards.map((card, i) => getCard(card, i))}
      </Row>
      {renderModal(modalInfo, hideModal)}
    </Container>
  );
};

export default Page;
