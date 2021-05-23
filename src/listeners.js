const getNumberNewCard = (state, direction) => {
  const { currentDistrict, districtsData } = state.districts;
  const currentDistrictData = districtsData[currentDistrict];
  const oldCurrentImg = Number(state.modalImg);
  const dataKeys = Object.keys(currentDistrictData);
  switch (direction) {
    case 'prev':
      return (currentDistrictData[oldCurrentImg + 1]) ? oldCurrentImg + 1 : 0;
    case 'next':
      return (currentDistrictData[oldCurrentImg - 1]) ? oldCurrentImg - 1 : dataKeys.length - 1;
    default:
      throw new Error('no such direction');
  }
};

export default (watchedState, fields) => {
  const state = watchedState;
  const {
    body,
    buttonPrev,
    buttonPlay,
    buttonNext,
  } = fields;
  buttonPlay.addEventListener('click', (evt) => {
    evt.preventDefault();
    state.animation = !state.animation;
  });

  buttonPrev.addEventListener('click', (evt) => {
    evt.preventDefault();
    state.modalImg = getNumberNewCard(state, 'prev');
  });
  buttonNext.addEventListener('click', (evt) => {
    evt.preventDefault();
    state.modalImg = getNumberNewCard(state, 'next');
  });
  body.addEventListener('keydown', (evt) => {
    switch (evt.code) {
      case 'Space':
        console.log('space worked!');
        evt.preventDefault();
        state.animation = !state.animation;
        break;
      case 'ArrowLeft':
        state.modalImg = getNumberNewCard(state, 'prev');
        break;
      case 'ArrowRight':
        state.modalImg = getNumberNewCard(state, 'next');
        break;
      default:
        break;
    }
  });
};
