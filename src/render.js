const renderError = (fields) => {
  const { photoContainer } = fields;
  const message = 'Упс! Что то пошло не так, попробуйте позже';
  const div = document.createElement('div');
  div.innerHTML = '&#9785;<br>';
  const span = document.createElement('span');
  span.innerHTML = message;
  photoContainer.append(span, div);
};
const renderDistricts = (state, fields) => {
  const { nav, photoContainer } = fields;
  const { districtsData, currentDistrict } = state.districts;
  photoContainer.innerHTML = '';
  const prevActiveDistrict = nav.querySelector('.active');
  prevActiveDistrict.classList.add('text-white');
  prevActiveDistrict.classList.remove('active');
  const currentActiveDistrict = nav.querySelector(`#${currentDistrict}`);
  currentActiveDistrict.classList.remove('text-white');
  currentActiveDistrict.classList.add('active');
  const currentData = districtsData[currentDistrict];
  const keysCards = Object.keys(currentData);
  const elementsCards = keysCards.map((key) => {
    const { imgUrlSmall, altTxt } = currentData[key];
    const divPhoto = document.createElement('div');
    divPhoto.id = key;
    divPhoto.classList.add('col', 'pt-2', 'pr-2', 'pb-2', 'pl-2', 'photo');
    const link = document.createElement('a');
    link.href = '#modal';
    link.dataset.toggle = 'modal';
    link.dataset.target = '#modal';
    const img = document.createElement('img');
    img.src = `../${imgUrlSmall}`;
    img.alt = altTxt;
    img.title = altTxt;
    img.classList.add('img-preview', 'border', 'border-dark', 'rounded-lg');
    link.appendChild(img);
    divPhoto.appendChild(link);
    const divHint = document.createElement('div');
    divHint.classList.add('hint', 'text-center');
    const imgDescription = altTxt ?? '...';
    divHint.innerHTML = `<span class="comment" data-descr="${imgDescription}">&#183;&#183;&#183;</span>`;
    divPhoto.appendChild(divHint);
    return divPhoto;
  });
  photoContainer.append(...elementsCards.reverse());
};

const renderModal = (state, fields) => {
  const { cardContainer, cardDescription, imgPlay } = fields;
  const { districtsData, currentDistrict } = state.districts;
  const { modalImg } = state;
  const { imgUrlModern, imgUrlOld, altTxt } = districtsData[currentDistrict][modalImg];
  cardDescription.textContent = altTxt;
  cardContainer.innerHTML = '';
  const imgModern = document.createElement('img');
  imgModern.classList.add('img-modern', 'img-card');
  imgModern.alt = imgUrlModern;
  imgModern.src = `../${imgUrlModern}`;
  const imgOld = document.createElement('img');
  imgOld.classList.add('img-old', 'img-card', 'animation-running');
  imgOld.alt = imgUrlOld;
  imgOld.src = `../${imgUrlOld}`;
  cardContainer.append(imgModern, imgOld);
  imgPlay.src = '../images/pause.png';
};

const renderPause = (state, fields) => {
  const imgOld = document.querySelector('.img-old');
  const { imgPlay } = fields;
  if (state.animation) {
    imgOld.classList.remove('animation-paused');
    imgOld.classList.add('animation-running');
    imgPlay.src = '../images/pause.png';
  } else {
    imgOld.classList.remove('animation-running');
    imgOld.classList.add('animation-paused');
    imgPlay.src = '../images/play.png';
  }
};

export {
  renderDistricts,
  renderModal,
  renderPause,
  renderError,
};
