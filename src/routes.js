// @ts-check

const host = '';
const assets = 'assets';
const images = 'images';
const datafile = 'districts.xlsx';

export default {
  rootPath: () => '/',
  dataPath: () => [host, assets, datafile].join('/'),
  imgPath: (filename) => [host, images, filename].join('/'),
  imgPathSmall: (district, numFile) => [images, district, `${numFile}s.jpg`].join('/'),
  imgPathOld: (district, numFile) => [images, district, `${numFile}o.jpg`].join('/'),
  imgPathModern: (district, numFile) => [images, district, `${numFile}m.jpg`].join('/'),

};
