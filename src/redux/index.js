/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import ls from 'store';

const isViewedCard = (viewedPhotos, path) => {
  const viewed = viewedPhotos.findIndex((photoPath) => photoPath === path);
  return viewed >= 0;
};

const isDataAge = (dataAgeLimit) => {
  const now = Date.now();
  const savedData = ls.get('fos');
  const dataAge = savedData && savedData.dataAge ? savedData.dataAge : now;
  return now - dataAge > dataAgeLimit;
};

const defaultDistrict = 'len';
const dataAgeLimit = 7700000000;
const initialState = {
  currentDistrict: defaultDistrict,
  districts: {},
  districtNames: [],
};

const streetSlice = createSlice({
  name: 'fos',
  initialState,
  reducers: {
    setData(state, action) {
      if (isDataAge(dataAgeLimit)) {
        ls.clearAll();
      }
      const savedData = ls.get('fos');
      const now = Date.now();
      const dataAge = savedData && savedData.dataAge ? savedData.dataAge : now;
      const viewedPhotos = savedData && savedData.viewedPhotos ? savedData.viewedPhotos : [];
      const currentDistrict = savedData && savedData.currentDistrict
        ? savedData.currentDistrict
        : state.currentDistrict;
      const { districtsData } = action.payload;

      const districtKeys = Object.keys(districtsData);

      const prepareDistrict = (currentData) => currentData.map((card) => ({
        dataCard: card,
        viewed: isViewedCard(viewedPhotos, card.imgPathSmall),
      }));

      const getDistricts = districtKeys.reduce((acc, district) => ({
        ...acc,
        [district]: prepareDistrict(districtsData[district]),
      }), {});

      const stateData = {
        currentDistrict,
        districts: getDistricts,
        districtNames: districtKeys,
      };
      ls.set('fos', { currentDistrict, viewedPhotos, dataAge });
      return stateData;
    },
    setViewStatus(state, action) {
      const id = action.payload;
      const { viewedPhotos, dataAge } = ls.get('fos');
      const { currentDistrict, districts } = state;
      const cardPath = districts[currentDistrict][id].dataCard.imgPathSmall;
      if (!isViewedCard(viewedPhotos, cardPath)) {
        viewedPhotos.push(cardPath);
        ls.set('fos', { currentDistrict, viewedPhotos, dataAge });
        districts[currentDistrict][id].viewed = true;
      }
    },
    setCurrentDistrict(state, action) {
      const savedData = ls.get('fos');
      savedData.currentDistrict = action.payload;
      ls.set('fos', savedData);
      state.currentDistrict = action.payload;
    },
  },
});

export const { setData, setCurrentDistrict, setViewStatus } = streetSlice.actions;
export default streetSlice.reducer;
