import XLSX from 'xlsx';
import routes from '../routes';

const getDistrictData = (workbook, district) => {
  const workSheet = workbook.Sheets[district];
  const sheet = XLSX.utils.sheet_to_json(workSheet, { raw: true });
  return sheet.reduce((acc, el) => {
    const { numFile, altTxt } = el;
    const dataCard = {
      imgPathSmall: routes.imgPathSmall(district, numFile),
      imgPathOld: routes.imgPathOld(district, numFile),
      imgPathModern: routes.imgPathModern(district, numFile),
      title: altTxt ?? '',
    };
    return [...acc, dataCard].reverse();
  }, []);
};

export default (data) => {
  const dataSheets = new Uint8Array(data);
  const workbook = XLSX.read(dataSheets, { type: 'array' });
  return workbook.SheetNames.reduce((acc, name) => (
    { ...acc, [name]: getDistrictData(workbook, name) }
  ), {});
};
