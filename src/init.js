import getData from './getData';
import watcher from './watcher';
import listeners from './listeners';

const getActiveCard = (watchedState) => {
  const state = watchedState;
  const photos = document.querySelectorAll('.img-preview');
  photos.forEach((photo) => {
    photo.addEventListener('click', (evt) => {
      const targetId = evt.target.closest('.photo').id;
      state.modalImg = targetId;
      state.animation = true;
    });
  });
};

export default async () => {
  const state = {
    districts: {
      districtsData: null,
      currentDistrict: null,
    },
    modalImg: null,
    animation: false,
    error: false,
  };

  const fields = {
    body: document.querySelector('body'),
    nav: document.querySelector('.nav'),
    photoContainer: document.querySelector('.photo-container'),
    cardContainer: document.querySelector('.img-container'),
    cardDescription: document.querySelector('.card-description'),
    modal: document.getElementById('modal'),
    imgPlay: document.getElementById('imgPlay'),
    buttonPlay: document.getElementById('play'),
    buttonNext: document.getElementById('next'),
    buttonPrev: document.getElementById('prev'),
  };
  const watchedState = watcher(state, fields);

  const districtDefault = 'len';
  const dataLink = '../assets/districts.xlsx';
  //const dataLink = '../__tests__/__fixtures__/districtsForTest.xlsx';
  await getData(dataLink)
    .then((districtsData) => {
      watchedState.districts = {
        districtsData,
        currentDistrict: districtDefault,
      };
    })
    .catch(() => {
      watchedState.error = true;
    });

  const tabsNav = fields.nav.querySelectorAll('.nav-link');
  tabsNav.forEach((tab) => {
    tab.addEventListener('click', (evt) => {
      evt.preventDefault();
      watchedState.districts = {
        districtsData: state.districts.districtsData,
        currentDistrict: evt.target.id,
      };
      getActiveCard(watchedState);
    });
  });
  getActiveCard(watchedState);
  listeners(watchedState, fields);
};
