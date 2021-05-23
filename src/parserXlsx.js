import XLSX from 'xlsx';

const getDistrictData = (workbook, district) => {
  const workSheet = workbook.Sheets[district];
  const sheet = XLSX.utils.sheet_to_json(workSheet, { raw: true });
  return sheet.reduce((acc, el, index) => {
    const { numFile, altTxt } = el;
    const dataCard = {
      imgUrlSmall: `images/${district}/${numFile}s.jpg`,
      imgUrlOld: `images/${district}/${numFile}o.jpg`,
      imgUrlModern: `images/${district}/${numFile}m.jpg`,
      altTxt,
    };
    return { ...acc, [index]: dataCard };
  }, {});
};

export default (data) => {
  const dataSheets = new Uint8Array(data);
  const workbook = XLSX.read(dataSheets, { type: 'array' });
  return workbook.SheetNames.reduce((acc, name) => (
    { ...acc, [name]: getDistrictData(workbook, name) }
  ), {});
};
