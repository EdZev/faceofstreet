import React, { useState, useEffect } from 'react';
import {
  Image,
  Modal,
  ButtonGroup,
  Spinner,
  CloseButton,
} from 'react-bootstrap';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import routes from '../routes';
import store from '../redux/store';
import { setViewStatus } from '../redux/index';

const RenderPhotos = ({
  imgPathModern,
  imgPathOld,
  imgOldClassName,
  description,
  hidden,
}) => (
  <>
    <Image className="img-modern" hidden={hidden} src={imgPathModern} alt={description} fluid />
    <Image
      hidden={hidden}
      className={imgOldClassName}
      src={imgPathOld}
      alt={description}
      fluid
    />
  </>
);

const ModalImage = ({ modalInfo, hideModal }) => {
  const { t } = useTranslation();
  const [visibleImageBox, setVisibleImageBox] = useState(false);

  const [renderImg, setRenderImg] = useState(true);
  const [animation, setAnimation] = useState(true);
  const imgOldClassName = cn('img-old', {
    'animation-running': animation,
    'animation-paused': !animation,
  });
  const buttonName = animation ? 'pause.png' : 'play.png';

  const { districtData, id } = modalInfo;
  const [currentId, setCurrentId] = useState(id);
  const { dataCard } = districtData[currentId];
  const { imgPathOld, imgPathModern, title } = dataCard;
  const description = title === '' ? t('threeDots') : title;

  useEffect(() => store.dispatch(setViewStatus(currentId)), [currentId]);

  useEffect(() => {
    setRenderImg(true);
    setAnimation(true);
  }, [renderImg]);

  const onClickNext = () => {
    setAnimation(false);
    setVisibleImageBox(false);
    setRenderImg(false);
    const firstInd = 0;
    const nextId = districtData[currentId + 1] ? currentId + 1 : firstInd;
    setCurrentId(nextId);
  };
  const onClickPrev = () => {
    setAnimation(false);
    setVisibleImageBox(false);
    setRenderImg(false);
    const lastInd = districtData.length - 1;
    const prevId = districtData[currentId - 1] ? currentId - 1 : lastInd;
    setCurrentId(prevId);
  };
  const onClicAnimation = () => {
    setAnimation(!animation);
  };

  useEffect(() => {
    const handlerKeyDown = (e) => {
      e.preventDefault();
      switch (e.code) {
        case 'Space':
          onClicAnimation();
          break;
        case 'ArrowRight':
          onClickNext();
          break;
        case 'ArrowLeft':
          onClickPrev();
          break;
        default:
          break;
      }
      return e;
    };
    document.addEventListener('keydown', handlerKeyDown, false);
    return () => document.removeEventListener('keydown', handlerKeyDown, false);
  }, [currentId, animation]);

  return (
    <Modal
      onLoad={() => setVisibleImageBox(true)}
      show
      centered
      dialogClassName="modal-90w"
      id="modal-dialog"
      onHide={hideModal}
    >
      <Modal.Header>
        <Modal.Title>
          {description}
        </Modal.Title>
        <CloseButton variant="white" onClick={() => hideModal()} />
      </Modal.Header>
      <Modal.Body className="mt-4 text-center align-middle container-img p-0">
        {renderImg && (
        <RenderPhotos
          imgPathModern={imgPathModern}
          imgPathOld={imgPathOld}
          imgOldClassName={imgOldClassName}
          description={description}
          hidden={!visibleImageBox}
        />
        )}
        <Spinner animation="border" hidden={visibleImageBox} />
      </Modal.Body>
      <Modal.Footer className="justify-content-around border-0">
        <ButtonGroup aria-label="Basic example">
          <button onClick={onClickPrev} className="control mx-3" type="button"><Image className="p-1" src={routes.imgPath('next_left.png')} width="50" alt="Left" /></button>
          <button onClick={onClicAnimation} className="control mx-3" type="button"><Image className="p-1" src={routes.imgPath(buttonName)} width="50" alt="Pause" /></button>
          <button onClick={onClickNext} className="control mx-3" type="button"><Image className="p-1" src={routes.imgPath('next_right.png')} width="50" alt="Right" /></button>
        </ButtonGroup>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalImage;
